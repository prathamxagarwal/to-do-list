const express = require("express");
const router = express.Router();
const pool = require("./db");

// Create table automatically if not exists
pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255)
    );
`).then(() => {
    console.log("Todos table ready");
}).catch(err => console.log(err));

// GET all todos
router.get("/todos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// ADD todo
router.post("/todos", async (req, res) => {
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
router.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM todos WHERE id = $1", [id]);
        res.json("Deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;