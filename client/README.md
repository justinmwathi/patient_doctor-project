# Doctor-Patient Appointment System

This project is a Doctor-Patient Appointment System built with React and Flask. It enables patients to schedule appointments with doctors, and doctors to manage their appointments and view assigned patients.

## Features

- **User Authentication**: Secure login for doctors and patients.
- **Role-based Access**: Different functionalities for doctors and patients.
- **Appointment Scheduling**: Patients can schedule appointments with doctors.
- **Doctor Dashboard**: Doctors can view and manage their appointments and assigned patients.
- **Patient Dashboard**: Patients can view their appointments and doctor details.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Database**: SQLAlchemy (ORM for SQL databases)
- **Authentication**: Flask-JWT-Extended

## Project Structure

project_root/
│
├── client/ # React frontend
│ ├── public/ # Public files (index.html, favicon, etc.)
│ ├── src/ # Source files
│ ├── components/ # React components
│ ├── contexts/ # Contexts for global state management
│ ├── styles/ # CSS styles
│ ├── App.js # Main App component
│ ├── index.js # Entry point for React
│ └── ... # Other files and folders
│
├── server/ # Flask backend
│ ├── app.py # Main Flask application
│ ├── models.py # Database models
│ ├── routes.py # API routes
│ └── ... # Other files and folders
│
├── .gitignore # Git ignore file
├── README.md # Project README file
├── requirements.txt # Python dependencies
└── package.json # Node.js dependencies


## Installation

### Prerequisites

- Node.js and npm
- Python 3.x
- pip

### Backend Setup

1. **Clone the repository**:

    ```sh
    git clone https://github.com/justinmwathi/patient_doctor-project.git
    cd patient_doctor-project
    ```

2. **Set up a virtual environment**:

    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install backend dependencies**:

    ```sh
    pip install -r requirements.txt
    ```

4. **Set up the database**:

    ```sh
    flask db init
    flask db migrate
    flask db upgrade
    ```

5. **Run the backend server**:

    ```sh
    flask run
    ```

### Frontend Setup

1. **Navigate to the client directory**:

    ```sh
    cd client
    ```

2. **Install frontend dependencies**:

    ```sh
    npm install
    ```

3. **Run the frontend server**:

    ```sh
    npm start
    ```

## Usage

### API Endpoints

#### Authentication

- **Login**: `POST /login`
- **Logout**: `POST /logout`

#### Doctor Endpoints

- **View Doctor Details**: `GET /doctors/<int:doctor_id>`
- **Update Doctor Details**: `PUT /doctors/<int:doctor_id>`
- **Delete Doctor**: `DELETE /doctors/<int:doctor_id>`

#### Patient Endpoints

- **View Patients**: `GET /patients`
- **View Patient Details**: `GET /patients/<int:patient_id>`

### React Components

#### Doctor Dashboard

- **DoctorDashboard**: Displays doctor details and patients list.
- **DoctorDetails**: Allows updating and deleting doctor details.
- **PatientsList**: Lists patients assigned to the doctor.

#### Patient Dashboard

- **PatientDetails**: Displays patient details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.


