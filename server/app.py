from flask import Flask, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource
from .  import init_admin


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///models.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)

from models import db, Doctor, Patient, Appointment
db.init_app(app)
migrate = Migrate(app, db)



if __name__ == '__main__':
    app.run(port=5555, debug=True)
