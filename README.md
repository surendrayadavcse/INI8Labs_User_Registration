# Project Overview:
# User Registration System
This is a simple user registration system implemented using React for the frontend and Express with MongoDB for the backend.

## Features
- Add new users with name, email, and date of birth.
- View registered users.
- Update user information.
- Delete users.

## Technologies Used
- Frontend: React.js
- Backend: Express.js
- Database: MongoDB
- git clone <repository_url>

## Setup Instructions
### Backend Setup
- Clone this repository.
- Navigate to the backend directory.
- Install dependencies using npm install.
- Ensure MongoDB is running locally.
- Start the server using npm start or node server.js.
### Frontend Setup
- Navigate to the frontend directory.
- Install dependencies using npm install.
- Start the React development server using npm run dev.
## API Endpoints
- GET /users: Get all registered users.
- POST /users: Register a new user.
- Request Body: { "name": "string", "email": "string", "dob": "date" }
- PUT /users/:id: Update user information by ID.
- Request Body: { "name": "string", "email": "string", "dob": "date" }
- DELETE /users/:id: Delete a user by ID.
