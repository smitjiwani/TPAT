import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import teacherRoutes from "./routes/teachers";
import studentRoutes from "./routes/students";
import classRoutes from "./routes/classes";

dotenv.config();

const PORT = process.env.PORT || 5000
const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/teachers", teacherRoutes);
app.use("/students", studentRoutes);
app.use("/classes", classRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get("/", (req, res) => {
    res.send("Hello from homepage")
}
)