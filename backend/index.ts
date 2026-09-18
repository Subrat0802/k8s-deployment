import express, { Request, Response } from "express";
import cors from "cors";
import pg from "pg";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// PostgreSQL connection
const db = new pg.Pool({
    host: "db-service",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "todoapp",
});

// Test database connection
db.query("SELECT NOW()")
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });


// CREATE TODO
app.post("/api/v1/todo", async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and Description are required",
            });
        }

        const result = await db.query(
            `INSERT INTO todos (title, description)
             VALUES ($1, $2)
             RETURNING *`,
            [title, description]
        );

        res.status(201).json({
            message: "Todo created successfully",
            data: result.rows[0],
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Server Error",
        });
    }
});


// GET ALL TODOS
app.get("/api/v1/todo", async (req: Request, res: Response) => {
    try {
        const result = await db.query(
            "SELECT * FROM todos ORDER BY id DESC"
        );

        res.status(200).json({
            message: "Todos fetched successfully",
            data: result.rows,
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Server Error",
        });
    }
});


// START SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
