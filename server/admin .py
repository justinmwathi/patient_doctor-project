from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_login import LoginManager, UserMixin, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Doctor, Patient, Appointment

# Assuming you have a User model, if not, you'll need to create one
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Create admin views
class SecureModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated

class DoctorAdminView(SecureModelView):
    column_list = ('name', 'specialization', 'contact')

class PatientAdminView(SecureModelView):
    column_list = ('name', 'age', 'gender', 'contact')

class AppointmentAdminView(SecureModelView):
    column_list = ('doctor', 'patient', 'date', 'time')

# Initialize Flask-Login
login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def init_admin(app):
    # Initialize Flask-Admin
    admin = Admin(app, name='Hospital Management', template_mode='bootstrap3')

    # Add model views
    #SecureModelView ensures only authenticated users can access the admin pages
#Each view specifies which columns should be displayed
    admin.add_view(DoctorAdminView(Doctor, db.session))
    admin.add_view(PatientAdminView(Patient, db.session))
    admin.add_view(AppointmentAdminView(Appointment, db.session))

    # Initialize Flask-Login
    login_manager.init_app(app)

    # Create a test user (you should remove this in production)
    @app.before_first_request
    def create_user():
        if not User.query.filter_by(username='admin').first():
            user = User(username='admin')
            user.set_password('password')
            db.session.add(user)
            db.session.commit()

    return admin