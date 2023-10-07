import express from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 5000
const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get("/", (req, res) => {
    res.send("Hello from homepage")
}
)