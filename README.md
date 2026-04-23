# Todo List - Fullstack App

## Tech Stack
- Frontend: React.js, Axios
- Backend: Node.js, Express.js
- Database: MongoDB Atlas

## features -
- Add tasks
- Edit tasks
- Delete tastk
- Mark complete
- Search task

##  Environment Setup -

### backend `.env` file
MONGO_URI=your_mongodb_connection_string_here
PORT=5000

### Backend
cd backend
npm install
node server.js

Expected output:
-Server is running on port 5000
-MongoDB connected successfully

### Frontend
cd frontend
npm install
npm start

### frontend `.env`file
REACT_APP_API_URL=http://localhost:5000

Expected output:
-app open at http://localhost:3000


## API Endpoints
- GET /api/tasks - All tasks fetch karo
- POST /api/tasks - Naya task add karo
- DELETE /api/tasks/:id - Task delete karo
- GET  /api/tasks/Search?q=
- PUT /api/tasks/status/:id
- PUT /api/tasks/:id


