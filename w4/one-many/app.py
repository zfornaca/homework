from flask import Flask, request, url_for, redirect, render_template, flash, session
from flask_modus import Modus
# from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost/one_many"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "infinitesadness"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

modus = Modus(app)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

# toolbar = DebugToolbarExtension(app)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text)
    image_url = db.Column(db.Text)
    username = db.Column(db.Text, nullable=False)
    password = db.Column(db.Text, nullable=False)
    msgs = db.relationship('Message', backref="user", cascade="all,delete")

    @classmethod
    def register(cls, username, password, first_name, last_name, image_url):
        """Register a user, hashing their password."""

        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")
        return cls(
            username=username,
            password=hashed_utf8,
            first_name=first_name,
            last_name=last_name,
            image_url=image_url)

    @classmethod
    def authenticate(cls, username, password):
        """Validate that the user exists & that their password is correct."""

        user = User.query.filter_by(username=username).first()
        if user:
            if bcrypt.check_password_hash(user.password, password):
                return user

        return False


class Message(db.Model):
    __tablename__ = "msgs"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


msg_tag = db.Table('msg_tags',
                   db.Column('msg_id', db.Integer, db.ForeignKey('msgs.id')),
                   db.Column('tag_id', db.Integer, db.ForeignKey('tags.id')))


class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    tagname = db.Column(db.Text, nullable=False)
    msgs = db.relationship(
        'Message', secondary=msg_tag, cascade="all,delete", backref="tags")
    # I don't have lazy on anything


db.create_all()


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


###############
# USER ROUTES
###############


@app.route("/")
def root():
    """Courtesy reroute to main user listing."""
    return redirect(url_for("users_index"))


@app.route("/users")
def users_index():
    """List all users."""
    users = User.query.all()
    return render_template("users/index.html", users=users)


@app.route("/register", methods=['GET', 'POST'])
def register():
    """Provides/handles form to register a new user and, if successful, redirects to a login page."""
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        image_url = request.form.get("image_url")
        user = User.register(username, password, first_name, last_name,
                             image_url)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for("login"))

    return render_template("users/register.html")


@app.route("/login", methods=['GET', 'POST'])
def login():
    """Provides/handles form to login an existing user and, if successful, redirects to MYSTERY ZONE."""

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        user = User.authenticate(username, password)
        if user:
            session['user_id'] = user.id
            return redirect(url_for("users_index"))

    return render_template("users/login.html")


@app.route("/logout")
def logout():
    """Logs out user and redirects to main index."""

    if session['user_id']:
        del session['user_id']

    return redirect(url_for("users_index"))


@app.route("/users/<int:user_id>")
def users_show(user_id):
    """Display all info for user."""
    user = User.query.get_or_404(user_id)
    return render_template("users/show.html", user=user)


@app.route("/users/<int:user_id>", methods=["DELETE"])
def users_destroy(user_id):
    """Remove user (and all their messages) from the database."""
    user = User.query.get_or_404(user_id)

    if user.id == session['user_id']:
        db.session.delete(user)
        db.session.commit()
        return redirect(url_for("users_index"))

    return redirect(url_for("users_show", user_id=user.id))


@app.route("/users/<int:user_id>/edit")
def users_edit(user_id):
    """Display form to edit selected user."""
    user = User.query.get_or_404(user_id)
    if user.id == session['user_id']:
        return render_template("users/edit.html", user=user)

    return redirect(url_for("users_show", user_id=user.id))


@app.route("/users/<int:user_id>", methods=["PATCH"])
def users_update(user_id):
    """Update selected user's data and return to that user's info page."""
    user = User.query.get(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']
    db.session.add(user)
    db.session.commit()
    return redirect(url_for("users_show", user_id=user.id))


##################
# MESSAGE ROUTES
##################


@app.route("/users/<int:user_id>/msgs")
def msgs_index(user_id):
    """Show an index of all messages for a specific user."""
    user = User.query.get_or_404(user_id)
    return render_template('msgs/index.html', user=user)


@app.route("/users/<int:user_id>/msgs/new")
def msgs_new(user_id):
    """Display form to create a new message for selected user."""
    user = User.query.get_or_404(user_id)

    if user.id == session['user_id']:
        tags = Tag.query.all()
        return render_template('msgs/new.html', user=user, tags=tags)

    return redirect(url_for("users_show", user_id=user.id))


@app.route("/users/<int:user_id>/msgs", methods=["POST"])
def msgs_create(user_id):
    """Create a new message for selected user and return to that user's message index."""
    content = request.form['content']
    new_msg = Message(content=content, user_id=user_id)
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    new_msg.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    db.session.add(new_msg)
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
    if user.id == session['user_id']:
        db.session.delete(msg)
        db.session.commit()
        return redirect(url_for('msgs_index', user_id=user.id))

    return redirect(url_for("/msgs_show", msg_id=msg.id))


@app.route("/msgs/<int:msg_id>/edit")
def msgs_edit(msg_id):
    """Display form to edit selected message."""
    msg = Message.query.get_or_404(msg_id)

    if msg.user.id == session['user_id']:
        tags = Tag.query.all()
        return render_template('msgs/edit.html', msg=msg, tags=tags)

    return redirect(url_for("/msgs_show", msg_id=msg.id))


@app.route("/msgs/<int:msg_id>", methods=["PATCH"])
def msgs_update(msg_id):
    """Update selected message and redirect to list of messages."""
    msg = Message.query.get_or_404(msg_id)
    msg.content = request.form['content']
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    msg.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    user = msg.user
    db.session.add(msg)
    db.session.commit()
    return redirect(url_for('msgs_index', user_id=user.id))


##############
# TAG ROUTES
##############


@app.route("/tags")
def tags_index():
    """Show an index of all existing tags."""
    tags = Tag.query.all()
    return render_template('tags/index.html', tags=tags)


@app.route("/tags/new")
def tags_new():
    """Display form to create a new tags."""
    msgs = Message.query.all()
    return render_template("tags/new.html", msgs=msgs)


@app.route("/tags", methods=["POST"])
def tags_create():
    """Create a new tag and return to the list of all tags."""
    new_tag = Tag(tagname=request.form['tagname'])
    msg_ids = [int(num) for num in request.form.getlist("msgs")]
    new_tag.msgs = Message.query.filter(Message.id.in_(msg_ids)).all()
    db.session.add(new_tag)
    db.session.commit()
    return redirect(url_for("tags_index"))


@app.route("/tags/<int:tag_id>")
def tags_show(tag_id):
    """Display all info for selected tag."""
    tag = Tag.query.get_or_404(tag_id)
    return render_template("tags/show.html", tag=tag)


@app.route("/tags/<int:tag_id>", methods=["DELETE"])
def tags_destroy(tag_id):
    """Remove tag from the database."""
    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()
    return redirect(url_for("tags_index"))


@app.route("/tags/<int:tag_id>/edit")
def tags_edit(tag_id):
    """Display form to edit selected tag."""
    tag = Tag.query.get_or_404(tag_id)
    msgs = Message.query.all()
    return render_template("tags/edit.html", tag=tag, msgs=msgs)


@app.route("/tags/<int:tag_id>", methods=["PATCH"])
def tags_update(tag_id):
    """Update selected tag and return to that tag's info page."""
    tag = Tag.query.get_or_404(tag_id)
    tag.tagname = request.form['tagname']
    msg_ids = [int(num) for num in request.form.getlist("msgs")]
    tag.msgs = Message.query.filter(Message.id.in_(msg_ids)).all()
    db.session.add(tag)
    db.session.commit()
    return redirect(url_for("tags_show", tag_id=tag.id))