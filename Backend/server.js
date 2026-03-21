const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Create table automatically
pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255)
    );
`).then(() => {
    console.log("Todos table ready");
}).catch(err => console.log(err));

// Root route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// GET todos
app.get("/todos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// ADD todo
app.post("/todos", async (req, res) => {
    try {
        const { text } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todos (text) VALUES ($1) RETURNING *",
            [text]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM todos WHERE id = $1", [id]);
        res.json("Deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});