import express from "express"
import dotenv from "dotenv"
dotenv.config();
import {clerkMiddleware} from "@clerk/express"
import path from "path"
import cors from "cors"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"
import { connectDB } from "./lib/db.js";
import fileUpload from "express-fileupload";

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());//to parse the json data
app.use(clerkMiddleware());//this will add auth to req obj => req.auth.userId
app.use(
    cors({
      origin: "http://localhost:3000", // Allow requests from this origin
      credentials: true, // Allow cookies and authorization headers
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all necessary HTTP methods
      allowedHeaders: "Content-Type,Authorization", // Allow necessary headers
    })
  );
  app.options("*", cors());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits:{
        fileSize: 10*1024*1024, //10MB max file size
    }
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);


//error handler
app.use((error, req, res, next)=>{
    res.status(500).json({message:process.env.NODE_ENV ==="production"?"Internal Server Error": error.message})
})



app.listen(PORT, () =>{
    console.log(`Server is running on Port: ${PORT}`);
})
connectDB();


//todo: socketIO
