# BLOGSTER.io

## Overview
BLOGSTER.io is a feature-rich blogging platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It enables users to create, edit, and manage blog posts seamlessly while ensuring robust security measures.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token) authentication with bcrypt encryption
- **File Uploads**: Multer for handling image uploads

## Features
- Secure user authentication with JWT and bcrypt encryption
- RESTful API for seamless communication between frontend and backend
- CRUD operations for blog management
- Image upload support using Multer
- Responsive UI for a smooth user experience

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/BLOGSTER.io.git
   cd BLOGSTER.io
   ```
2. Install dependencies for backend:
   ```sh
   cd backend
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
5. Navigate to the frontend folder and install dependencies:
   ```sh
   cd ../frontend
   npm install
   ```
6. Start the frontend:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT token

### Blog Posts
- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create a new post (requires authentication)
- `GET /api/posts/:id` - Get a specific post
- `PUT /api/posts/:id` - Update a post (requires authentication)
- `DELETE /api/posts/:id` - Delete a post (requires authentication)

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Create a pull request.

## License
This project is licensed under the MIT License.

---
Happy Coding! 🚀

