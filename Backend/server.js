const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const todoRoutes = require("./routes/todos");

app.use("/api", todoRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Debug route
app.get("/hello", (req, res) => {
    res.send("Hello works");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});