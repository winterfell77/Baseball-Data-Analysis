import sqlite3
from flask import Flask, g, jsonify
from flask_cors import CORS
import logging
import pandas as pd

app = Flask(__name__)
CORS(app)

DATABASE = 'database/pitches.db'

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

@app.route("/api/players")
def get_players():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM players")
    rows = cursor.fetchall()
    column_names = [column[0] for column in cursor.description]
    players = [dict(zip(column_names, row)) for row in rows]
    return jsonify({"players": players})

@app.route("/api/players/<int:player_id>")
def get_player_by_id(player_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM players WHERE player_id = ?", (player_id,))
    player = cursor.fetchone()
    if player:
        column_names = [column[0] for column in cursor.description]
        player_data = dict(zip(column_names, player))
        return jsonify(player_data)
    else:
        return jsonify({"error": "Player not found"}), 404

def calculate_aggregated_stats(df):
    result = df.groupby('pitch_type').apply(lambda x: pd.Series({
        'number_of_pitches': x.shape[0],
        'pitch_usage_percentage': (x.shape[0] / df.shape[0]) * 100,
        'average_speed': x['release_speed'].mean(),
        'average_horizontal_break': x['horizontal_break'].mean(),
        'average_vertical_break': x['induced_vertical_break'].mean(),
        'average_spin_rate': x['spin_rate'].mean(),
        'average_exit_speed': x['hit_exit_speed'].mean(),
        'average_launch_angle': x['hit_launch_angle'].mean()
    })).reset_index()

    return result.fillna(0).to_dict(orient='records')

@app.route('/api/pitches/<int:pitcher_id>')
def get_pitches_by_pitcher(pitcher_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT pitch_type, spin_rate, horizontal_break, release_speed, induced_vertical_break, hit_exit_speed, hit_launch_angle FROM pitches WHERE pitcher_id = ?", (pitcher_id,))
    pitches = cursor.fetchall()


    df = pd.DataFrame(pitches, columns=['pitch_type', 'spin_rate', 'horizontal_break', 'release_speed', 'induced_vertical_break', 'hit_exit_speed', 'hit_launch_angle'])
    df['pitch_type'] = df['pitch_type'].fillna('Undetermined')

    aggregated_stats = calculate_aggregated_stats(df)
    return jsonify(aggregated_stats)

if __name__ == "__main__":
    app.run()
