<<<<<<< HEAD
from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
=======
#!/usr/bin/env python3
import os
from flask import Flask, request, make_response, session, jsonify
>>>>>>> 1c9cefba9724d704615c9bba8f6b68fc4e011fd9
from flask_migrate import Migrate
from flask_cors import CORS
<<<<<<< HEAD
from datetime import datetime
from models import Doctor, Patient, Appointment,db
=======
from flask_restful import Api, Resource
 
from flask_bcrypt import Bcrypt

>>>>>>> 1c9cefba9724d704615c9bba8f6b68fc4e011fd9
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hospital.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact=False
app.secret_key = os.urandom(24)
bcrypt = Bcrypt(app)

<<<<<<< HEAD
app.json.compact = False

migrate = Migrate(app, db)

=======
api = Api(app)
from models import db, Doctor, Patient, Appointment, User
>>>>>>> 1c9cefba9724d704615c9bba8f6b68fc4e011fd9
db.init_app(app)
migrate = Migrate(app, db)

@app.before_request
def check_login():
    user_id = session.get('user_id')
    if user_id is None\
        and request.endpoint != 'index'\
        and request.endpoint != 'login'\
        and request.endpoint != 'logout'\
        and request.endpoint != 'register' \
        and request.endpoint != 'check_session':
        return{"error":"unauthorized access"},401
# Resources
class Login(Resource):
    def post(self):
        data = request.get_json()
        user_name = data['user_name']
        password = data['password']
        
        user = User.query.filter_by(user_name=user_name).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            welcome_message = f"Welcome {user.user_name}"
            return {
                'message': welcome_message,
                'id': user.id,
                'user_name': user.user_name,
                'role': user.role
            }, 200

        return {"error": "Invalid username or password"}, 401

class Register(Resource):
    def post(self):
        data = request.get_json()
        user_name = data['user_name']
        password = data['password']
        role = data['role']

        if not user_name or not password or not role:
            return {'message': 'Username, password, and role are required'}, 400

        if role not in ['admin', 'doctor', 'patient']:
            return {'message': 'Invalid role specified'}, 400

        if User.query.filter_by(user_name=user_name).first():
            return {'message': 'User already exists'}, 400

        new_user = User(user_name=user_name, role=role)
        new_user.set_password(password)  # Set the password using the custom method
        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User registered successfully'}, 201

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')

        if not user_id:
            return jsonify({"error": "No active session"}), 401

        user = User.query.get(user_id)

        if user:
            return jsonify(user.to_dict()), 200
        return jsonify({"error": "User not found"}), 404

class Logout(Resource):
    def post(self):
        session.pop('user_id', None)
        session.pop('role', None)
        return jsonify({"message": "Logout successful"})

<<<<<<< HEAD

# Import models after db initialization


# API setup
api = Api(app)
=======
>>>>>>> 1c9cefba9724d704615c9bba8f6b68fc4e011fd9

# Index Resource
class Index(Resource):
    def get(self):
        return {"message": "Welcome to the Patient-Doctor Appointment System!"}, 200

# Doctors Resource
class Doctors(Resource):
    def get(self):
        doctors = Doctor.query.all()
        response_dict_list = [doctor.to_dict() for doctor in doctors]
        return response_dict_list, 200

    def post(self):
        data = request.get_json()
        new_doctor = Doctor(name=data['name'], speciality=data['speciality'])
        db.session.add(new_doctor)
        db.session.commit()
        return new_doctor.to_dict(), 201

class DoctorByID(Resource):
    def get(self, doctor_id):
        doctor = Doctor.query.get(doctor_id)
        if doctor:
            return doctor.to_dict(), 200
        else:
            return {"error": "Doctor not found"}, 404

    def put(self, doctor_id):
        doctor = Doctor.query.get(doctor_id)
        if doctor:
            data = request.get_json()
            doctor.name = data.get('name', doctor.name)
            doctor.speciality = data.get('speciality', doctor.speciality)
            db.session.commit()
            return doctor.to_dict(), 200
        else:
            return {"error": "Doctor not found"}, 404

    def delete(self, doctor_id):
        doctor = Doctor.query.get(doctor_id)
        if doctor:
            db.session.delete(doctor)
            db.session.commit()
            return {"message": "Doctor deleted successfully"}, 200
        else:
            return {"error": "Doctor not found"}, 404

# Patients Resource
class Patients(Resource):
    def get(self):
        patients = Patient.query.all()
        response_dict_list = [patient.to_dict() for patient in patients]
        return response_dict_list, 200

    def post(self):
        data = request.get_json()
        new_patient = Patient(name=data['name'], age=data['age'], gender=data['gender'])
        db.session.add(new_patient)
        db.session.commit()
        return new_patient.to_dict(), 201

class PatientByID(Resource):
    def get(self, patient_id):
        patient = Patient.query.get(patient_id)
        if patient:
            return patient.to_dict(), 200
        else:
            return {"error": "Patient not found"}, 404

    def put(self, patient_id):
        patient = Patient.query.get(patient_id)
        if patient:
            data = request.get_json()
            patient.name = data.get('name', patient.name)
            patient.age = data.get('age', patient.age)
            patient.gender = data.get('gender', patient.gender)
            db.session.commit()
            return patient.to_dict(), 200
        else:
            return {"error": "Patient not found"}, 404

    def delete(self, patient_id):
        patient = Patient.query.get(patient_id)
        if patient:
            db.session.delete(patient)
            db.session.commit()
            return {"message": "Patient deleted successfully"}, 200
        else:
            return {"error": "Patient not found"}, 404

# Appointments Resource
class Appointments(Resource):
    def get(self):
        appointments = Appointment.query.all()
        response_dict_list = [appointment.to_dict() for appointment in appointments]
        return response_dict_list, 200

    def post(self):
        data = request.get_json()
        new_appointment = Appointment(
            doctor_id=data['doctor_id'],
            patient_id=data['patient_id'],
            appointment_date=datetime.utcnow(),
            status=data.get('status', 'Scheduled')
        )
        db.session.add(new_appointment)
        db.session.commit()
        return new_appointment.to_dict(), 201

class AppointmentByID(Resource):
    def get(self, appointment_id):
        appointment = Appointment.query.get(appointment_id)
        if appointment:
            return appointment.to_dict(), 200
        else:
            return {"error": "Appointment not found"}, 404

    def put(self, appointment_id):
        appointment = Appointment.query.get(appointment_id)
        if appointment:
            data = request.get_json()
            appointment.doctor_id = data.get('doctor_id', appointment.doctor_id)
            appointment.patient_id = data.get('patient_id', appointment.patient_id)
            appointment.appointment_date = data.get('appointment_date', appointment.appointment_date)
            appointment.status = data.get('status', appointment.status)
            db.session.commit()
            return appointment.to_dict(), 200
        else:
            return {"error": "Appointment not found"}, 404

    def delete(self, appointment_id):
        appointment = Appointment.query.get(appointment_id)
        if appointment:
            db.session.delete(appointment)
            db.session.commit()
            return {"message": "Appointment deleted successfully"}, 200
        else:
            return {"error": "Appointment not found"}, 404

# Add resources to API
api.add_resource(Register, '/register', endpoint='register')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check-session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Index, '/', endpoint='index')
api.add_resource(Doctors, '/doctors', endpoint='doctors')
api.add_resource(DoctorByID, '/doctors/<int:doctor_id>')
api.add_resource(Patients, '/patients', endpoint='patients')
api.add_resource(PatientByID, '/patients/<int:patient_id>')
api.add_resource(Appointments, '/appointments', endpoint='appointments')
api.add_resource(AppointmentByID, '/appointments/<int:appointment_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

