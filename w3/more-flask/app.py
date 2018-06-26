from flask import Flask, request, url_for, redirect, render_template
from flask_modus import Modus
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

DB = "postgresql://localhost/teams_practice"

app = Flask(__name__)
app.config['SECRET_KEY'] = "abc123"
modus = Modus(app)
toolbar = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Team(db.Model):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    city = db.Column(db.Text, nullable=False)
    sport = db.Column(db.Text, nullable=False)


db.create_all()


@app.route("/")
def root():
    """Reroute from root to main page"""
    return redirect(url_for("index"))


@app.route("/teams")
def index():
    """List all teams."""
    teams = Team.query.all()
    return render_template("index.html", teams=teams)


@app.route("/teams/new")
def new():
    """Show form to add a new team."""
    return render_template("new.html")


@app.route("/teams", methods=["POST"])
def create():
    """Submit a new team & redirect to list of all teams."""
    name = request.form['name']
    city = request.form['city']
    sport = request.form['sport']
    new_team = Team(name=name, city=city, sport=sport)
    db.session.add(new_team)
    db.session.commit()
    return redirect(url_for("index"))


@app.route("/teams/<int:id>")
def show(id):
    """Display all info for selected team."""
    team = Team.query.filter(Team.id == id).one()
    return render_template("show.html", team=team)


@app.route("/teams/<int:id>", methods=["DELETE"])
def destroy(id):
    """Remove team from database."""
    team = Team.query.filter(Team.id == id).one()
    db.session.delete(team)
    db.session.commit()
    return redirect(url_for("index"))


@app.route("/teams/<int:id>/edit")
def edit(id):
    """Show form to edit team information."""
    team = Team.query.filter(Team.id == id).one()
    return render_template("edit.html", team=team)


@app.route("/teams/<int:id>", methods=["PATCH"])
def update(id):
    """Submit updated information for team & redirect to that team's details page."""
    team = Team.query.filter(Team.id == id).one()
    team.name = request.form['name']
    team.city = request.form['city']
    team.sport = request.form['sport']
    db.session.add(team)
    db.session.commit()
    return redirect(url_for('show', id=team.id))
