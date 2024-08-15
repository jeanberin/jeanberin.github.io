import app from "./server.js"
import mongodb from "mongodb"
import REVIEWSDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env["MONGO_USERNAME"] // to access environment variable
const mongo_password = process.env["MONGO_PASSWORD"]
const uri = 








