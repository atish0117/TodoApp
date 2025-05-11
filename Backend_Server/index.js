const express = require("express")
const DBconnect = require("./database/db")
const router = require("./Router/Router")
const cors = require("cors")
const app = express()
app.use(cors({
    origin:"*",
    credentials:true,
})); // Allow frontend to access backend
app.use(express.json())

const dotenv =require("dotenv")
dotenv.config()
const port =process.env.PORT || 6000;

app.get("/",(req, res)=>{
    res.send("our Project is Working");
})

DBconnect();

// Use the Todo routes
app.use("/api/v1", router);

app.listen(port,()=>{
    console.log("server is running on port ",port);
})