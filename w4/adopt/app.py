# check if form.validate_on_submit(): (lines 86-89) in Joel's solution
# pf_info refactor: pf_info = {"name": name, "age": age}

from flask import Flask, request, url_for, redirect, render_template, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import InputRequired, AnyOf, Optional, URL, NumberRange
import requests
import webconfig

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost/adopt"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = "infinitesadness"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True

db = SQLAlchemy(app)
toolbar = DebugToolbarExtension(app)

api_key = webconfig.PETFINDER_KEY


class Pet(db.Model):
    """Class for pets at Adoption Agency."""
    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, default=True)


class AddPetForm(FlaskForm):
    """Form for adding pets."""

    name = StringField("Pet Name", validators=[InputRequired()])
    species = StringField(
        "Species",
        validators=[
            InputRequired(),
            AnyOf(
                ['cat', 'dog', 'porcupine'],
                message='Must be one of %(values)s')
        ],
        description=
        "While we love all animals, our platform currently only accepts accept cats, dogs, and porcupines."
    )
    photo = StringField("Photo URL", validators=[Optional(), URL()])
    # photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    age = IntegerField(
        "Age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField("Notes")


class EditPetForm(FlaskForm):
    """Form for editing pet details."""

    # photo = StringField("Photo URL", validators=[Optional(), URL()])
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    notes = TextAreaField("Notes")
    available = BooleanField("Available")


db.create_all()


def get_petfinder_info():
    """Grab data for a random pet from Petfinder API & return as Python dict."""

    while True:
        r = requests.get('http://api.petfinder.com/pet.getRandom', {
            'key': api_key,
            'format': 'json',
            'output': 'basic'
        })

        pf_info = r.json()['petfinder']['pet']
        pf_name = pf_info['name']['$t']
        pf_email = pf_info['contact']['email']['$t']
        if pf_info['media']['photos']['photo'][2]:
            pf_photo = pf_info['media']['photos']['photo'][2]['$t']
            break

    return {'name': pf_name, 'email': pf_email, 'photo': pf_photo}


@app.route("/")
def pets_index():
    """Show overview of all pets."""
    pets = Pet.query.all()

    pf_pet = get_petfinder_info()

    return render_template(
        "index.html",
        pets=pets,
        pf_name=pf_pet['name'],
        pf_photo=pf_pet['photo'],
        pf_email=pf_pet['email'])


@app.route("/add", methods=["POST", "GET"])
def pets_add():
    """Show form to add a new pet."""
    form = AddPetForm()

    if form.validate_on_submit():
        name = form.data['name']
        species = form.data['species']
        photo_url = form.data['photo']
        age = form.data['age']
        notes = form.data['notes']
        new_pet = Pet(
            name=name,
            species=species,
            photo_url=photo_url,
            age=age,
            notes=notes)
        db.session.add(new_pet)
        db.session.commit()
        flash(f"{name} added!")
        return redirect(url_for("pets_index"))

    else:
        return render_template('add.html', form=form)


@app.route("/<int:pet_id>", methods=["POST", "GET"])
def show(pet_id):
    """Show details about selected pet, and allow editing."""
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.data['photo_url']
        pet.notes = form.data['notes']
        pet.available = form.data['available']
        db.session.commit()
        flash(f"{pet.name} edited!")
        return redirect("/")
    else:
        return render_template("show.html", pet=pet, form=form)


@app.route("/api/<int:pet_id>")
def api_get_pet(pet_id):
    """API call to fetch details on selected pet & return a JSONified string."""

    pet = Pet.query.get_or_404(pet_id)
    info = {
        'name': pet.name,
        'species': pet.species,
        'photo_url': pet.photo_url,
        'age': pet.age,
        'notes': pet.notes,
        'available': pet.available
    }

    return jsonify(info)
