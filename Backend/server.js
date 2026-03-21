const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todos");

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Todo routes
app.use("/", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});