import express from "express";
import dotenv from "dotenv";
import router1 from "./routes/authroute.js";
import router2 from "./routes/resumeroutes.js";
import router3 from "./routes/interviewQroutes.js";
import router4 from "./routes/profileroutes.js"
import router5 from "./routes/dashboardroutes.js";
import cors from "cors";


dotenv.config();

const port = process.env.PORT || 3000;

const app=express();

app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,
    })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth", router1);
app.use("/api/resume",router2);
app.use("/api/interview",router3);
app.use("/api/users",router4);
app.use("/api",router5);

app.get("/",(req,res)=>{
    res.send("hii");
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})