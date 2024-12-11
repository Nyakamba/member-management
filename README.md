# Members Management System

## Overview

The Member Management System is a self-contained web application built using the MERN stack and Docker. It allows users to manage members and roles, featuring authentication, CRUD operations, activity logging, and responsive design. The project showcases efficient API development, frontend design with Vite, and containerization with Docker.

## Features

- **Frontend**: Built with React, TypeScript, Tailwind CSS, and ShadCN UI TanStak Query and Context API.

  - Protected routes with authentication.
  - Dynamic forms for login, registration, and member profile management.
  - Search, sort, and pagination for member lists.
  - Responsive and user-friendly UI.

- **Backend**: Built with Node.js, Express, and SQLite (Prisma ORM).

  - RESTful APIs with JWT-based authentication.
  - Role-based access control (RBAC).
  - Robust database design with relationships (Users, Roles, Members, Activity Logs).

- **Dockerized**: Complete Docker setup for running the application with ease.

## Prerequisites

To run this project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Docker](https://www.docker.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## Project Structure

```
root
├── backend
│   ├── prisma
│   ├── uploads
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   └── index.js
│   └── package.json
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── assests
│   │   ├── components
│   │   ├── context
│   │   ├── entities
│   │   ├── forms
│   │   ├── layout
│   │   ├── pages
│   │   ├── tables
│   │   └── App.tsx
│   └── package.json
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
└── README.md
```

---

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/Nyakamba/member-management.git
cd member-management
```

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup the database:
   ```bash
   npx prisma migrate dev
   ```
4. Run the server locally:
   ```bash
   npm run dev
   ```
   The backend will be available at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run start
   ```
   The frontend will be available at `http://localhost:5173`.

---

## Running with Docker

1. Ensure Docker is installed and running.
2. Navigate to the root directory of the project:
   ```bash
   cd member-management
   ```
3. Build and run the containers:
   ```bash
   docker-compose up --build
   ```
4. The application will be available at:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`
5. Ensure port 5000 is not in use before building the docker containers

---

## Technologies Used

### Frontend

- Vite
- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- TanStak Query
- Context API
- Axios

### Backend

- Node.js
- Express
- SQLite3
- Prisma ORM

### Other Tools

- Docker
- JWT Authentication

---

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login a user.
- `POST /api/auth/login`: Logout a user.

### Members

- `GET /api/members`: Fetch all members with pagination, search, and sorting.
- `POST /api/members`: Create a new member and create member activity is created as well (Admin only).
- `PUT /api/members/:id`: Update member details and upadte member activity is created as well (Admin only).
- `DELETE /api/members/:id`: Delete a member and delete member activity is created as well (Admin only).

### Roles

- `GET /api/roles`: Fetch all roles with role counts.
- `POST /api/roles`: Create a new roles (Admin only).

---

### Activity Logs

- `GET /api/activities`: Fetch all activities with activity counts.

---

## Screenshots

### Login Page

![Sign In Page](/frontend/src/assets/screenshots/login.png)

### Dashboard

![Dashboard](/frontend/src/assets/screenshots/dashboard.png)
![Dashboard](/frontend/src/assets/screenshots/dashboard-1.png)

### Members List

![Members List](/frontend/src/assets/screenshots/members.png)

---

## Contact

For any questions or inquiries, feel free to reach out:

- **Email**: omwegaenock@gmail.com
- **GitHub**: [Nyakamba](https://github.com/Nyakamba)
- **LinkedIn**: [Enock](https://linkedin.com/in/enockomwega)
