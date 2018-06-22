# How to get textarea (for notes), small note under species ("please not we only accept cats, etc.")
# (intersection of Bootstrap and WTForms)
# I guess my placeholder image should depend on the species, huh?

from flask import Flask, request, url_for, redirect, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import InputRequired, AnyOf, Optional, URL, NumberRange

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost/adopt"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = "infinitesadness"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True

db = SQLAlchemy(app)
toolbar = DebugToolbarExtension(app)


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
        ])
    photo = StringField("Photo URL", validators=[Optional(), URL()])
    # photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    age = IntegerField(
        "Age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = StringField("Notes")


class EditPetForm(FlaskForm):
    """Form for editing pet details."""

    # photo = StringField("Photo URL", validators=[Optional(), URL()])
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    notes = StringField("Notes")
    available = BooleanField("Available")


db.create_all()


@app.route("/")
def pets_index():
    """Show overview of all pets."""
    pets = Pet.query.all()
    return render_template("index.html", pets=pets)


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
