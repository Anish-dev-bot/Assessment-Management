Assessment Management System

A flexible, configuration-driven system to generate assessment reports in PDF format. Built with Node.js, Express, React, and Tailwind CSS.

Features

User authentication (signup/login)

API endpoint to generate PDF reports based on session data

Configurable report templates for different assessment types

Dynamic field mapping and classification through configuration

PDFs saved to local filesystem

assessment-management/
│
├── backend/
│   ├── data.js                # Sample assessment data
│   ├── config.js              # Config-driven mapping for assessment types
│   ├── server.js              # Express server
│   ├── auth/
│   │   ├── userModel.js       # User store
│   │   ├── authRoutes.js      # Signup & login APIs
│   ├── reports/
│   │   ├── reportService.js   # Generate PDF reports
│   │   ├── templates/
│   │   │   ├── baseTemplate.html
│   │   │   ├── fitnessTemplate.html
│   │   │   ├── cardiacTemplate.html
│   └── generated_reports/     # Saved PDFs
│
└── frontend/                   # React + Tailwind UI

Installation
Backend
cd backend
npm install
node server.js

Frontend
cd frontend
npm install
npm start

API Endpoint
Generate Report
POST /generate-report
Parameters: session_id
Response: Success/failure

Configuration

Add new assessment types: Update config.js

Map fields dynamically: Define JSON paths in configuration

Set value ranges or classifications: Configurable in config.js

PDF Generation

Uses Puppeteer to convert HTML templates into PDFs

Saved automatically in backend/generated_reports/

Notes

Currently uses file-based storage (data.js) instead of a database

MongoDB or other DB integration can be added later

Frontend provides optional interface to test report generation


