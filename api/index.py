import sqlite3
from flask import Flask

app = Flask(__name__)

DATABASE = '../pitches.db'


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
