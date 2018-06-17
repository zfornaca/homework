from flask import Flask, request, url_for, redirect, render_template
from flask_modus import Modus

app = Flask(__name__)
Modus(app)


class Team:
    count = 1

    def __init__(self, name, city, sport):
        self.name = name
        self.city = city
        self.sport = sport
        self.id = Team.count
        Team.count += 1


athletics = Team("Athletics", "Oakland", "baseball")
wyverns = Team("Wyverns", "Nagoya", "baseball")
salads = Team("Fourteen Dollar Salads", "San Francisco", "lunch")
teams = [athletics, wyverns, salads]


@app.route("/")
def root():
    return redirect(url_for("index"))


@app.route("/teams")
def index():
    return render_template("index.html", teams=teams)


@app.route("/teams/new")
def new():
    return render_template("new.html")


@app.route("/teams", methods=["POST"])
def create():
    new_team = Team(request.form['name'], request.form['city'],
                    request.form['sport'])
    teams.append(new_team)
    return redirect(url_for("index"))


@app.route("/teams/<int:id>")
def show(id):
    found_team = [team for team in teams if team.id == id][0]
    return render_template("show.html", team=found_team)


@app.route("/teams/<int:id>", methods=["DELETE"])
def destroy(id):
    found_team = [team for team in teams if team.id == id][0]
    teams.remove(found_team)
    return redirect(url_for("index"))


@app.route("/teams/<int:id>/edit")
def edit(id):
    found_team = [team for team in teams if team.id == id][0]
    return render_template("edit.html", team=found_team)


@app.route("/teams/<int:id>", methods=["PATCH"])
def update(id):
    found_team = [team for team in teams if team.id == id][0]
    found_team.name = request.form['name']
    found_team.city = request.form['city']
    found_team.sport = request.form['sport']
    return redirect(url_for('show', id=found_team.id))
