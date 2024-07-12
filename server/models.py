from flask import Flask
from flask_sqlalchemy import SQLAlchemy
<<<<<<< HEAD
from datetime import datetime
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
=======
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from app import bcrypt
>>>>>>> 1c9cefba9724d704615c9bba8f6b68fc4e011fd9

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///hospital.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

<<<<<<< HEAD
db=SQLAlchemy(app)

serialize_rules = ('-appointments', '-password')

class User(db.Model,SerializerMixin):
    __tablename__='users'

    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(80),unique=True,nullable=False)
    password=db.Column(db.String(120),nullable=False)
    role=db.Column(db.String(50),nullable=False) #Admin,Doctor,Patient
    serialize_rules = serialize_rules

    def __repr__(self):
        return f'<User {self.id},{self.username}>'

class Doctor (db.Model,SerializerMixin):
    __tablename__='doctors'

    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),nullable=False)
    speciality=db.Column(db.String(100))
    appointments_relationship=db.relationship('Appointment',back_populates='doctor',cascade='all,delete-orphan')
    appointments=association_proxy('appointments_relationship','appointment_date')
    serialize_rules = serialize_rules

    def __repr__(self):
        return f'<Doctor {self.id},{self.name},{self.speciality}>'

class Patient(db.Model):
    __tablename__='patients'

    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),nullable=False)
    age=db.Column(db.Integer)
    gender=db.Column(db.String(10))
    appointments_relationship = db.relationship('Appointment', back_populates='patient', cascade='all, delete-orphan')
    appointments = association_proxy('appointments_relationship', 'appointment_date')
    serialize_rules = serialize_rules

    def __repr__(self):
        return f'<Patient {self.id},{self.name},{self.age},{self.gender}>'



class Appointment(db.Model,SerializerMixin):
    __tablename__='appointments'
    
    id=db.Column(db.Integer,primary_key=True)
    doctor_id=db.Column(db.Integer,db.ForeignKey('doctors.id'))
    patient_id=db.Column(db.Integer,db.ForeignKey('patients.id'))
    appointment_date=db.Column(db.DateTime,nullable=False,default=datetime.utcnow)
    status=db.Column(db.String(20),nullable=False)
    serialize_rules = serialize_rules

    doctor = db.relationship('Doctor', back_populates='appointments_relationship')
    patient = db.relationship('Patient', back_populates='appointments_relationship')


    def __repr__(self):
        return f'<Appointment {self.id},{self.appointment},{self.status}>'

=======
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(64), nullable=False, unique=True)
    _password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(10), nullable=False)  # 'admin', 'doctor', 'patient'

    doctor = db.relationship('Doctor', uselist=False, back_populates='user')
    patient = db.relationship('Patient', uselist=False, back_populates='user')
    admin = db.relationship('Admin', uselist=False, back_populates='user')

    serialize_rules = ('-doctor.user', '-patient.user', '-admin.user')

    def __repr__(self):
        return f'User {self.user_name}'

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    @validates('user_name')
    def validate_user_name(self, key, user_name):
        if not user_name:
            raise ValueError("User name cannot be empty")
        return user_name

    @validates('_password_hash')
    def validate_password_hash(self, key, password_hash):
        if not password_hash:
            raise ValueError("Password hash cannot be empty")
        return password_hash

    @validates('role')
    def validate_role(self, key, role):
        if role not in ['admin', 'doctor', 'patient']:
            raise ValueError("Role must be one of 'admin', 'doctor', or 'patient'")
        return role

    def set_password(self, password):
        self.password_hash = password

    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'role': self.role
        }


class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='doctor')
    appointments = db.relationship('Appointment', back_populates='doctor', cascade='all, delete-orphan')

    serialize_rules = ('-appointments.doctor', '-user')

    def __repr__(self):
        return f'<Doctor {self.id}, {self.name}, {self.specialization}>'

class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='patient')
    appointments = db.relationship('Appointment', back_populates='patient', cascade='all, delete-orphan')

    serialize_rules = ('-appointments.patient', '-user')

    def __repr__(self):
        return f'<Patient {self.id}, {self.name}, {self.age}, {self.gender}>'

class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)

    doctor = db.relationship('Doctor', back_populates='appointments')
    patient = db.relationship('Patient', back_populates='appointments')

    serialize_rules = ('-doctor.appointments', '-patient.appointments')

    def __repr__(self):
        return f'<Appointment {self.id}, {self.date}>'

class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='admin')

    serialize_rules = ('-user',)

    def __repr__(self):
        return f'<Admin {self.id}>'
>>>>>>> 1c9cefba9724d704615c9bba8f6b68fc4e011fd9
