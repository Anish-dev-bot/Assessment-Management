Assessment Management System




Table of Contents

Overview

Features

Project Structure

Technical Implementation

Getting Started

Configuration System

Overview

The Assessment Management System is a full-stack web application designed to:
Handle user authentication with JWT-based login and signup.
Generate PDF reports from pre-existing assessment data.
Support different assessment types through a flexible, configuration-driven system without modifying code.
This system allows admins or users to generate structured reports using just a session ID from the dataset.

Features
Authentication
User registration (signup) with email & password.
Secure login using JWT tokens.
Protected endpoints for report generation.
PDF Report Generation

Generates PDF reports from existing assessment data.

Supports multiple assessment types using dynamic HTML templates.

Reports are saved locally and accessible via a link.

Flexibility & Configuration

Add new assessment types via JSON configuration.

Map data fields dynamically without code changes.

Configurable classification ranges for metrics.

Fully extendable system for future assessments.

Project Structure
Assessment-Management/
├─ backend/                 # Node.js backend
│  ├─ server.js             # Main server file
│  ├─ data.js               # Sample assessment dataset
│  ├─ package.json
│  └─ reports/              # Generated PDF reports
├─ frontend/                # React frontend
│  ├─ src/
│  │  ├─ api/
│  │  │  └─ api.js          # Axios API calls
│  │  ├─ components/
│  │  │  ├─ Signup.js
│  │  │  ├─ Login.js
│  │  │  └─ Dashboard.js
│  │  └─ App.js
│  ├─ package.json
├─ .gitignore
└─ README.md

Technical Implementation
Backend

Node.js + Express.js for server and API routing.

JWT for secure authentication.

Puppeteer for PDF generation from dynamic HTML templates.

In-memory data storage (data.js) for users and assessments.

CORS enabled to allow frontend requests.

Frontend

React.js with Tailwind CSS.

Pages include Signup, Login, and Dashboard.

Handles JWT storage in memory and attaches token to API requests.

Generates and shows downloadable PDF report links dynamically.

Getting Started
Prerequisites

Node.js v22+

npm or yarn

Installation

Clone the repo:

git clone https://github.com/<your-username>/assessment-management.git
cd assessment-management


Install dependencies:

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

Running the Project

Backend

cd backend
node server.js


Frontend

cd frontend
npm start


The frontend will run at http://localhost:3000 and communicate with the backend at http://localhost:5000.

Configuration System

The system is fully configuration-driven:

Assessment Types

Each assessment_id can have a unique HTML template defined in the configuration.

Field Mapping

Data fields from data.js are mapped dynamically using JSON paths.

Example:

{
  "assessment_id": "A101",
  "fields": {
    "accuracy": "accuracy",
    "bmi": "bodyCompositionData.BMI",
    "heartRate": "vitalsMap.vitals.heart_rate"
  }
}


Classification Ranges

Example for BMI classification:

{
  "BMI": [
    { "range": [0, 18.5], "label": "Underweight" },
    { "range": [18.5, 24.9], "label": "Normal" },
    { "range": [25, 29.9], "label": "Overweight" },
    { "range": [30, 100], "label": "Obese" }
  ]
}


Adding a new assessment type only requires updating the configuration file; no backend/frontend code changes are needed.
