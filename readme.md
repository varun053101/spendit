# SpendIt

SpendIt is a simple **Expense Tracking application** that helps users track, manage and analyze their daily expenses. The goal of this project is to build a clean and understandable fullstack application with a focus on learning real-world development practices.


## Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB
- Frontend: React.js
- Authentication: JWT (JSON Web Tokens)
- Styling: Basic CSS and Tailwind

## Features

- User authentication: login and registration
- Forms with validation (client + server side)
- Protected routes (login required for dashboard)
- Error handling, rate-limiting & validation
- Password hashing - bcrypt
- Profile fetching/updating
- CRUD operations

## Getting Started

1. Clone the repository from gitHub
2. Navigate to the backend folder
3. Install all dependencies
4. Configure environment variables(refer `.env.example`)
5. Start the backend server `node server.js`
6. similar process for frontend `npm run dev`

## Usage

- Register
- Log in
- Add expenses from the dashboard
- View all expenses in real time
- See the total expense amount update dynamically
- Delete expenses when no longer needed
- Edit expenses if there is a mistake
- View your profile details
- Reset password if needed
- Logout when finished

## Key mentions

- Use node verion `v22.13.1` or higher
- React version used `v19.2.0`
- API Documentaion is inside backend folder (`apiDoc.md`)
- Refer .env.example for using environment variables
- Take a look into `screenshots` folder