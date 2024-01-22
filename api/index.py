import sqlite3
from flask import Flask, g, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

DATABASE = 'database/pitches.db'

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
@app.route("/")
def hello_world():
    return "Pitches Database"

@app.route("/api/tables")
def list_tables():
    try:
        db = get_db()
        cursor = db.cursor()
        query = "SELECT name FROM sqlite_master WHERE type='table';"
        cursor.execute(query)
        tables = cursor.fetchall()
        if not tables:
            print("No tables found in database.")
            return "No tables found in database."
        table_names = [table[0] for table in tables]
        return jsonify(table_names)
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return f"Database error: {e}"
    except Exception as e:
        print(f"General error: {e}")
        return f"General error: {e}"

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        try:
            db = g._database = sqlite3.connect(DATABASE)
            logging.info(f"Connected to database at {DATABASE}")
        except sqlite3.Error as e:
            logging.error(f"Database connection error: {e}")
            raise e
    return db




@players_bp.route("/players")
def get_players():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM players")  # Adjust table name as needed
    players = cursor.fetchall()
    return jsonify({"players": players})

if __name__ == "__main__":
    app.run()
