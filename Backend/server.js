const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Direct test route
app.get("/todos", (req, res) => {
    res.send("Todos route working");
});

// Import routes AFTER test
const todoRoutes = require("./routes/todos");
app.use("/", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});