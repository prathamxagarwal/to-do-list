const express = require("express");
const cors= require ("cors");

const app= express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

const todoRoutes = require("./routes/todos");

app.use("/api",todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
