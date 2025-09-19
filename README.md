# Assessment Management System

A flexible, configuration-driven system to generate assessment reports in PDF format. Built with Node.js, Express, React, and Tailwind CSS.

## Features

- User authentication (signup/login)
- API endpoint to generate PDF reports based on session data
- Configurable report templates for different assessment types
- Dynamic field mapping and classification through configuration
- PDFs saved to local filesystem

## Project Structure

assessment-management/
│
├── backend/
│ ├── data.js
│ ├── config.js
│ ├── server.js
│ ├── auth/
│ │ ├── userModel.js
│ │ ├── authRoutes.js
│ ├── reports/
│ │ ├── reportService.js
│ │ ├── templates/
│ │ │ ├── baseTemplate.html
│ │ │ ├── fitnessTemplate.html
│ │ │ ├── cardiacTemplate.html
│ └── generated_reports/
│
└── frontend/


## Installation

### Backend
```bash
cd backend
npm install
node server.js

###FRONTEND
cd frontend
npm install
npm start


