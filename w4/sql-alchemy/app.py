from flask import Flask, request, url_for, redirect, render_template
from flask_modus import Modus
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

DB = "postgresql://localhost/sql_alchemy"

app = Flask(__name__)
app.config['SECRET_KEY'] = "def456"
modus = Modus(app)
toolbar = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Cheese(db.Model):
    __tablename__ = "cheeses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    origin = db.Column(db.Text)
    rating = db.Column(db.Integer)


db.create_all()


@app.route("/")
def root():
    """Reroute from root to main page"""
    return redirect(url_for("index"))


@app.route("/cheeses")
def index():
    """List all cheeses."""
    cheeses = Cheese.query.all()
    return render_template("index.html", cheeses=cheeses)


@app.route("/cheeses/new")
def new():
    """Display form to add a new cheese."""
    return render_template("new.html")


@app.route("/cheeses", methods=["POST"])
def create():
    """Submit a new cheese and return to the list of all cheeses."""
    name = request.form['name']
    origin = request.form['origin']
    rating = request.form['rating']
    new_cheese = Cheese(name=name, origin=origin, rating=rating)
    db.session.add(new_cheese)
    db.session.commit()
    return redirect(url_for("index"))


@app.route("/cheeses/<int:id>")
def show(id):
    """Display all info for selected cheese."""
    cheese = Cheese.query.filter(Cheese.id == id).one()
    return render_template("show.html", cheese=cheese)


@app.route("/cheeses/<int:id>", methods=["DELETE"])
def destroy(id):
    """Remove cheese from list."""
    cheese = Cheese.query.filter(Cheese.id == id).one()
    db.session.delete(cheese)
    db.session.commit()
    return redirect(url_for("index"))


@app.route("/cheeses/<int:id>/edit")
def edit(id):
    "Display form to edit cheese info."
    cheese = Cheese.query.filter(Cheese.id == id).one()
    return render_template("edit.html", cheese=cheese)


@app.route("/cheeses/<int:id>", methods=["PATCH"])
def update(id):
    """Submit updated information for cheese & return to that cheese's profile page."""
    cheese = Cheese.query.filter(Cheese.id == id).one()
    cheese.name = request.form['name']
    cheese.origin = request.form['origin']
    cheese.rating = request.form['rating']
    db.session.add(cheese)
    db.session.commit()
    return redirect(url_for('show', id=cheese.id))