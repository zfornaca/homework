from flask import Flask, request, url_for, redirect, render_template
from flask_modus import Modus
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost/one_many"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "infinitesadness"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

modus = Modus(app)
db = SQLAlchemy(app)
toolbar = DebugToolbarExtension(app)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text)
    image_url = db.Column(db.Text)
    msgs = db.relationship('Message', backref="user", cascade="all,delete")


class Message(db.Model):
    __tablename__ = "msgs"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


db.create_all()


@app.route("/")
def root():
    """Courtesy reroute to main user listing."""
    return redirect(url_for("users_index"))


@app.route("/users")
def users_index():
    """List all users."""
    users = User.query.all()
    return render_template("users/index.html", users=users)


@app.route("/users/new")
def users_new():
    """Display form to create a new user."""
    return render_template("users/new.html")


@app.route("/users", methods=["POST"])
def users_create():
    """Create a new user and return to the list of all users."""
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']
    # add user_img attribute here
    new_user = User(
        first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for("users_index"))


# wasn't there something weird about the id placeholder in 1:M?
@app.route("/users/<int:user_id>")
def users_show(user_id):
    """Display all info for user."""
    user = User.query.get_or_404(user_id)
    return render_template("users/show.html", user=user)


@app.route("/users/<int:user_id>", methods=["DELETE"])
def users_destroy(user_id):
    """Remove user (and all their messages) from the database."""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect(url_for("users_index"))


@app.route("/users/<int:user_id>/edit")
def users_edit(user_id):
    """Display form to edit selected user."""
    user = User.query.get_or_404(user_id)
    return render_template("users/edit.html", user=user)


@app.route("/users/<int:user_id>", methods=["PATCH"])
def users_update(user_id):
    """Update seledted user's data and return to that user's info page."""
    user = User.query.get(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    db.session.add(user)
    db.session.commit()
    return redirect(url_for("users_show", user_id=user.id))


######################
######################
######################


@app.route("/users/<int:user_id>/msgs")
def msgs_index(user_id):
    """Show an index of all messages for a specific user."""
    user = User.query.get(user_id)
    return render_template('msgs/index.html', user=user)


@app.route("/users/<int:user_id>/msgs/new")
def msgs_new(user_id):
    """Display form to create a new message for selected user."""
    user = User.query.get(user_id)
    return render_template('msgs/new.html', user=user)


@app.route("/users/<int:user_id>/msgs", methods=["POST"])
def msgs_create(user_id):
    """Create a new message for selected user and return to that user's message index."""
    content = request.form['content']
    new_message = Message(content=content, user_id=user_id)
    db.session.add(new_message)
    db.session.commit()
    return redirect(url_for('msgs_index', user_id=user_id))


@app.route("/msgs/<int:msg_id>")
def msgs_show(msg_id):
    """Display a spefic message for the selected user."""
    msg = Message.query.get_or_404(msg_id)
    return render_template('msgs/show.html', msg=msg)


@app.route("/msgs/<int:msg_id>", methods=["DELETE"])
def msgs_destroy(msg_id):
    """Delete selected message and return to list of messages."""
    msg = Message.query.get_or_404(msg_id)
    user = msg.user
    db.session.delete(msg)
    db.session.commit()
    return redirect(url_for('msg_index', user_id=user.id))


@app.route("/msgs/<int:msg_id>/edit")
def msgs_edit(msg_id):
    """Display form to edit selected message."""
    msg = Message.query.get_or_404(msg_id)
    return render_template('msgs/edit.html', msg=msg)


@app.route("/msgs/<int:msg_id>", methods=["PATCH"])
def msgs_update(msg_id):
    """Update selected message and redirect to lsit of messages."""
    msg = Message.query.get_or_404(msg_id)
    msg.content = request.form['content']
    user = msg.user
    db.session.add(msg)
    db.session.commit()
    return redirect(url_for('msg_index', user_id=user.id))


# how do I set up link from user page to their messages?
# more broadly, need to create 4 new HTML files


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
