from flask import Flask
from flask import request
from flask import render_template

app = Flask(__name__)
app.debug = True


@app.route("/form")
def helloWorld():
    return render_template("forms.html")


@app.route("/test")
def tester():
    h1 = "<h1>Shite!</h1>"
    return h1


@app.route("/receiveSubmission", methods=["POST"])
def receiveSubmission():
    t = request.get_json(force=True)
    s = str(t)
    s = s.replace("'","\"")
    print("\nThe json version is:")
    print(t)
    print("\nThe string version is:")
    print(s)
    print(t["skills"]["silk"])
    name = t["name"]

    return '{ "name": "' + name + '"}'

app.run(host='0.0.0.0',port='5000')