import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRoutes from "./routes/product.routes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send(
    `<h2 style="text-align:center">Hey, I'm Marcin Herman and this is my recruitment task.</h2>`
  );
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api/", productRoutes);

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
