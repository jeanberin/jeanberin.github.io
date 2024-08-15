import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express() // use express

app.use(cors())
app.use(express.json()) // reads json 

app.use("/api/v1/reviews", reviews)
app.use("*", (req, res) => 
    res.status(404)).json ({error: "not found"})

export default app // to import to a different file