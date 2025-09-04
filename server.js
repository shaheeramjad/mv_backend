const cloudinary = require("cloudinary");

//Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err);
  console.log("Shutting down the server due to Uncaught Exception");
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

const app = require("./app");
const connectDatabase = require("./db/Database");

//db server
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  console.log("Shutting down the server due to Unhandled Rejection");

  server.close(() => {
    process.exit(1);
  });
});
