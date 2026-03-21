const express = require("express");
const router = express.Router();
const pool = require("./db");

// create table
pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255)
    );
`);

// GET all todos
router.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(result.rows);
});

// ADD todo
router.post("/", async (req, res) => {
    const { text } = req.body;
    const newTodo = await pool.query(
        "INSERT INTO todos (text) VALUES ($1) RETURNING *",
        [text]
    );
    res.json(newTodo.rows[0]);
});

// DELETE todo
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.json("Deleted");
});

module.exports = router;