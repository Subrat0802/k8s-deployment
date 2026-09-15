import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/v1/todo", async(req, res) => {
    try{
        const {title, description} = req.body;
        if(!title || !description){
            return res.status(400).json({
                message:"Title and Description are required",
            })
        }

        const response = {title, description};

        res.status(200).json({
            message:"Todo created successfully",
            data: response
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server Error",
        })
    }
})

app.get("/api/v1/todo", async(req, res) => {
    try{
        const todos = [
            {id:1, title:"Todo 1", description:"Description 1"},
            {id:2, title:"Todo 2", description:"Description 2"},
            {id:3, title:"Todo 3", description:"Description 3"},
        ];

        res.status(200).json({
            message:"Todos fetched successfully",
            data: todos
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server Error",
        })
    }
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
})