Dreamer

Overview

This project is a web-based platform built using Laravel, React, and MySQL. It allows users to submit and receive reviews about their performance on different projects, manage teams, and oversee various administrative functionalities. The platform supports role-based authentication for Executives, Managers, and Users.

Features

Authentication & Authorization: Secure login/logout using Laravel Sanctum.

Role-Based Access: Different functionalities for Executives, Managers, and Users.

User Management: Executives can create, update, and delete users.

Project & Team Management: Executives can manage teams and projects.

Review System: Users can give and receive reviews on performance.

Profile Management: Users can update their profiles and change passwords.

Technologies Used

Backend:

Laravel 11.30.0 (PHP framework for backend logic)

Laravel Sanctum (Authentication)

MySQL (Database for storing user and project data)

Frontend:

React 18 (Frontend UI)

Redux Toolkit (State management)

React Router (Navigation)

Tailwind CSS (Styling)

Lucide React (Icons)

React Hot Toast (Notifications)

Installation & Setup

Prerequisites

Ensure you have the following installed:

PHP (>= 8.1)

Composer

Node.js (>= 16)

MySQL

Backend Setup

Clone the repository:

git clone https://github.com/zmey-dev/Dreamer.git
cd project/DreamerBackend

Install dependencies:

composer install

Configure environment variables:

Set up database credentials in .env

Run database migrations and seeders:

php artisan migrate:fresh --seed

This will create tables and insert an initial admin account:

Email: admin@gmail.com

Password: password

Start the server:

php artisan serve --host=0.0.0.0 --port=8000

Frontend Setup

Navigate to the frontend directory:

cd ../DreamerFrontend

Install dependencies:

npm install

Run the development server:

npm run dev

The frontend will now be available at http://localhost:5173.

API Endpoints

Authentication

POST /register – User registration

POST /login – Login

POST /logout – Logout (Requires authentication)

User Management

GET /users – Get all users (Executive only)

GET /users/{id} – Get user by ID

PUT /myprofile – Update authenticated user's profile

PUT /password – Change password

Reviews

POST /reviews/users/{userId} – Submit a review for a user

GET /reviews/given – Get reviews given by the authenticated user

GET /reviews/received – Get reviews received by the authenticated user

GET /reviews/{id} – View a review (Executive only)

DELETE /reviews/{id} – Delete a review (Executive or review author)

Team & Project Management (Executive only)

GET /teams – Get all teams

POST /teams – Create a team

PUT /teams/{id} – Update a team

DELETE /teams/{id} – Delete a team

GET /projects – Get all projects

POST /projects – Create a project

PUT /projects/{id} – Update a project

DELETE /projects/{id} – Delete a project

Role-Based Permissions

Executives can manage users, teams, projects, and reviews.

Managers can view teams and projects but have limited modification rights.

Users can receive and give reviews but cannot manage other users.
