from flask import Flask, request, url_for, render_template, redirect
from flask_modus import Modus

app = Flask(__name__)
modus = Modus(app)


class Snack:

    count = 0

    def __init__(self, name, kind):
        self.name = name
        self.kind = kind
        self.id = Snack.count
        Snack.count += 1


apple = Snack("apple", "fruit")
banana = Snack("banana", "fruit")
yogurt = Snack("yogurt", "dairy")

snacks = [apple, banana, yogurt]

# GET       /snacks             page about all of our snacks ("display all the snacks")
# PUT       /snacks             add a new snack ("allow a user to create snacks")
# GET       /snacks/apple       page about apple
# DELETE    /snacks/apple       delete apple from system ("allow a user to delete a snack")
# PATCH     /snacks/apple       change/edit/update apple ("allow a user to delete a snack")


@app.route('/')
def root():
    return redirect(url_for('list_snacks'))


@app.route('/snacks', methods=["GET"])
def list_snacks():
    return render_template('index.html', snacks=snacks)


@app.route('/snacks/<id>', methods=["GET"])
def display_snack(id):
    # snack_idx = next(
    #     idx for (idx, dic) in enumerate(snacks) if dic["id"] == id)
    # name = snacks[snack_idx]["name"]
    # kind = snacks[snack_idx]["kind"]
    # return render_template('editsnack.html', name, kind, id)
    return render_template('editsnack.html')


@app.route('/snacks', methods=["POST"])
def update_snack_list():
    name = request.values.get('name')
    kind = request.values.get('kind')
    new_snack = Snack(name, kind)
    snacks.append(new_snack)
    return redirect(url_for('list_snacks'))


@app.route('/snacks/<id>', methods=["POST"])
def revise_snack(id):
    remove = request.values.get('remove')
    if (remove == 'yes'):
        # do the delete
        snacks = [snack for snack in snacks if snack['id'] != id]
        return redirect(url_for('list_snacks'))
    else:
        # do the revise
        new_name = request.values.get('name')
        new_kind = request.values.get('kind')
        snack_idx = next(
            idx for (idx, dic) in enumerate(snacks)
            if dic["id"] == id)  # found online; don't really get
        snacks[snack_idx]["name"] = new_name  # don't understand this error
        snacks[snack_idx]["kind"] = new_kind
        return redirect(url_for('list_snacks'))


@app.route('/snacks/new')
def add_snack():
    return render_template('new.html')
