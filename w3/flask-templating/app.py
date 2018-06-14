from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/person/<name>/<age>")
def name_and_age(name, age):
    html = render_template("welcome.html", name=name, age=age)
    return html


@app.route("/calculate")
def calculator():
    html = render_template("calc.html")
    return html


@app.route("/math")
def math_operations():
    num1 = int(request.args.get('num1'))
    num2 = int(request.args.get('num2'))
    oper = request.args.get('oper')
    if oper == "add":
        return render_template("math.html", answer=str(num1 + num2))
    elif oper == "sub":
        return render_template("math.html", answer=str(num1 - num2))
    elif oper == "mult":
        return render_template("math.html", answer=str(num1 * num2))
    elif oper == "div":
        return render_template("math.html", answer=str(num1 / num2))
    else:
        return render_template(
            "math.html", answer="no answer at all, for that was not math")


# stretch goal:
# build a mad libs game to practice route/form/template behaviors


@app.route("/madlib")
def madlib():
    html = render_template("madlib.html")
    return html


@app.route("/story")
def story():
    name1 = request.args.get('name1')
    name2 = request.args.get('name2')
    noun1 = request.args.get('noun1')
    noun2 = request.args.get('noun2')
    plural_noun = request.args.get('plural_noun')
    animal = request.args.get("animal")
    job = request.args.get("job")
    verb1 = request.args.get('verb1')
    verb2 = request.args.get('verb2')
    adj1 = request.args.get('adj1')
    adj2 = request.args.get('adj2')
    adj3 = request.args.get('adj3')
    adj4 = request.args.get('adj4')
    adj5 = request.args.get('adj5')
    adj6 = request.args.get('adj6')
    return render_template(
        "story.html",
        name1=name1,
        name2=name2,
        noun1=noun1,
        noun2=noun2,
        plural_noun=plural_noun,
        animal=animal,
        job=job,
        verb1=verb1,
        verb2=verb2,
        adj1=adj1,
        adj2=adj2,
        adj3=adj3,
        adj4=adj4,
        adj5=adj5,
        adj6=adj6)


# name1
# name2
# noun1
# noun2
# plural_noun
# animal
# job
# verb1
# verb2
# adj1
# adj2
# adj3
# adj4
# adj5
# adj6
