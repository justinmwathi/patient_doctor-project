#from app import app, db
#from models import Doctor, Patient, Appointment
#from datetime import datetime
#
#with app.app_context():
#    # drop existing tables
#    db.drop_all()
#    # create tables
#    db.create_all()
#
#    # clear session
#    db.session.remove()
#
#    # Create some doctors
#    doctor1 = Doctor(name='Dr. Smith', specialization='Cardiology')
#    doctor2 = Doctor(name='Dr. Johnson', specialization='Neurology')
#
#    # Create some patients
#    patient1 = Patient(name='Alice Johnson', age=29, gender='Female')
#    patient2 = Patient(name='Bob Smith', age=45, gender='Male')
#
#    # Create some appointments
#    appointment1 = Appointment(date=datetime(2023, 7, 9, 10, 0), doctor=doctor1, patient=patient1)
#    appointment2 = Appointment(date=datetime(2023, 7, 10, 11, 0), doctor=doctor2, patient=patient2)
#
#    # Add the records to the session and commit them to the database
#    db.session.add_all([doctor1, doctor2, patient1, patient2, appointment1, appointment2])
#    db.session.commit()
#
#    print("Database seeded!")
#

from app import app, db
<<<<<<< HEAD
from models import Doctor, Patient, Appointment,User
from datetime import datetime

# Ensure app context is active
with app.app_context():
    # Drop existing tables (if any)
    db.drop_all()

    # Create tables based on defined models
    db.create_all()

    # Clear existing session
    db.session.remove()


      # Seed Users
    admin_user = User(username='admin', password='admin123', role='Admin')
    doctor_user = User(username='doctor1', password='doctor123', role='Doctor')
    patient_user = User(username='patient1', password='patient123', role='Patient')

    # Add users to session and commit
    # Create Doctors
    doctor1 = Doctor(name='Dr. Smith', speciality='Cardiology')
    doctor2 = Doctor(name='Dr. Johnson', speciality='Neurology')

    # Create Patients
    patient1 = Patient(name='Alice Johnson', age=29, gender='Female')
    patient2 = Patient(name='Bob Smith', age=45, gender='Male')
=======
from models import User, Admin, Doctor, Patient, Appointment
from datetime import datetime


with app.app_context():
    # Drop existing tables
    db.drop_all()
    # Create tables
    db.create_all()

    # Clear session
    db.session.remove()

    # Create some users
    
    # Create some users with dummy passwords
    user1 = User(user_name='alice', role='patient')
    user1.password_hash = "admin" 
    user2 = User(user_name='bob', role='doctor')
    user2.password_hash = "admin123"

    # Create some admins
    admin1 = Admin(user=user1)
    admin2 = Admin(user=user2)

    # Create some doctors
    doctor1 = Doctor(name='Dr. Smith', specialization='Cardiology', user=user2)
    doctor2 = Doctor(name='Dr. Johnson', specialization='Neurology', user=user2)

    # Create some patients
    patient1 = Patient(name='Alice Johnson', age=29, gender='Female', user=user1)
    patient2 = Patient(name='Bob Smith', age=45, gender='Male', user=user1)
>>>>>>> 1c9cefba9724d704615c9bba8f6b68fc4e011fd9

    # Create Appointments
    appointment1 = Appointment(doctor=doctor1, patient=patient1, appointment_date=datetime(2023, 7, 9, 10, 0), status='Scheduled')
    appointment2 = Appointment(doctor=doctor2, patient=patient2, appointment_date=datetime(2023, 7, 10, 11, 0), status='Scheduled')

<<<<<<< HEAD
    # Add records to session and commit
    db.session.add_all([doctor1, doctor2, patient1, patient2, appointment1, appointment2,admin_user, doctor_user, patient_user])
=======
    # Add the records to the session and commit them to the database
    db.session.add_all([user1, user2, admin1, admin2, doctor1, doctor2, patient1, patient2, appointment1, appointment2])
>>>>>>> 1c9cefba9724d704615c9bba8f6b68fc4e011fd9
    db.session.commit()

    print("Database seeded!")
