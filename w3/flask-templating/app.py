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


# refactor calc
# /calculate route
# build a form with 2 number imputs (num1, num2)
# and select field for + - * /
# form submit should make a request to route /math