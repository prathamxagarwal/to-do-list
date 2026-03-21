const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
    res.send("Server working");
});

// Todo routes
const todoRoutes = require("./todos");
app.use("/todos", todoRoutes);

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});