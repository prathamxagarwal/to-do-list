# 📝 Full Stack To-Do List App

A full stack To-Do List application built using **React (Frontend)**, **Node.js + Express (Backend)**, and **PostgreSQL (Database)**.
This application allows users to add, view, and delete tasks using a REST API connected to a database.

---

## 🚀 Tech Stack

**Frontend**

* React
* Axios
* HTML, CSS

**Backend**

* Node.js
* Express.js
* PostgreSQL
* CORS
* dotenv

**Database**

* PostgreSQL

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── todos.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   ├── App.js
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1. Install dependencies

```
npm install express cors pg dotenv
```

### 2. Create PostgreSQL Database

Open PostgreSQL and run:

```
CREATE DATABASE todoapp;
```

### 3. Create `.env` file in backend folder

```
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

### 4. Run Backend Server

```
node server.js
```

Server will run on:

```
http://localhost:5000
```

### 5. Test API Routes

| Method | Route      |
| ------ | ---------- |
| GET    | /test      |
| GET    | /todos     |
| POST   | /todos     |
| PUT    | /todos/:id |
| DELETE | /todos/:id |

---

## 🎨 Frontend Setup

### 1. Install dependencies

```
npm install
npm install axios
```

### 2. Run React App

```
npm start
```

Frontend will run on:

```
http://localhost:3000
```

---

## 🔗 Connecting Frontend to Backend

React makes API calls to:

```
http://localhost:5000/todos
```

Example Axios request:

```
axios.get("http://localhost:5000/todos")
```

---

## ✨ Features

* Add Todo
* View Todos
* Delete Todo
* REST API Backend
* PostgreSQL Database Integration
* Full Stack Integration (React + Node + DB)

---

## 🧠 What I Learned From This Project

* Building REST APIs with Express
* Connecting Node.js with PostgreSQL
* Using React with APIs
* Axios for HTTP requests
* Full stack project structure
* Backend deployment
* Connecting frontend and backend

---

## 📌 Future Improvements

* Edit Todo
* User Authentication
* Deploy Frontend
* Add Due Dates
* Add Priority
* Dark Mode UI

---

## 🏁 Conclusion

This project demonstrates a complete full stack application with a React frontend, Node.js backend, and PostgreSQL database, implementing CRUD operations and API integration.
