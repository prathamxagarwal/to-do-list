const express = require("express");
const router = express.Router();
const pool = require("../db");

// create todo
router.post("/todos", async (req, res) => {

    const { title } = req.body;

    try {

        const result = await pool.query(
            "INSERT INTO todos (title) VALUES ($1) RETURNING *",
            [title]
        );

        res.json(result.rows[0]);

    } catch (err) {

        console.error(err.message);

    }

});

router.get("/todos",async(req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");

        res.json(result.rows);
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.delete("/todos/:id",async(req,res)=>{
    const { id } = req.params;
    try{
        await pool.query(
            "DELETE FROM todos WHERE id = $1",
            [id]
        );
        res.json({message:"Todo deleted"});
    } catch(err){
        console.error(err.message);

        res.status(500).send("Server error");
    }
 });

module.exports = router;