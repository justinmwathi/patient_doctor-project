from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///hospital.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

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

