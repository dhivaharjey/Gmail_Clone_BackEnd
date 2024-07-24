import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import routes from "./routes/route.js";

dotenv.config();
const app = express();
app.use(cors());
// app.use(express.urlencoded());
app.use(express.json({ extended: true }));

connectDB();

app.use("/", routes);
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hi welcome" });
// });
app.listen(process.env.PORT, () => {
  console.log("App is running in the PORT =", process.env.PORT);
});
