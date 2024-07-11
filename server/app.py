from flask import Flask, session, redirect, url_for, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///models.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'  # Ensure you have a secret key for sessions

api = Api(app)

from models import db, Doctor, Patient, Appointment
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login'))  # Redirect to login page or any other page

if __name__ == '__main__':
    app.run(port=5555, debug=True)
