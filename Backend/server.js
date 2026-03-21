require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const todoRoutes = require("./todos");

const app = express();

app.use(cors());
app.use(express.json());

// Create table
pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255)
    );
`).then(() => {
    console.log("Todos table ready");
});

// Test route
app.get("/test", (req, res) => {
    res.send("Server working");
});

// Use todo routes
app.use("/todos", todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});