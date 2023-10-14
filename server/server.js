import express from "express";
import morgan from "morgan";
import teacherRoutes from "./teachers/routes.js"
import studentRoutes from "./students/routes.js"


const PORT = process.env.PORT || 5000
const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

// app.use("/api/todos", todoRoutes)
app.use("/api/teachers", teacherRoutes)
app.use("/api/students", studentRoutes)

app.get("/", (req, res) => {
    res.send("Hello from homepage")
}
)