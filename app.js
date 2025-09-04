const express = require("express");
const ErrorHandler = require("./middlewares/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["https://mv-frontend-sandy.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// import routes
const userRouter = require("./controllers/user.js");
const shopRouter = require("./controllers/shop.js");
const productRouter = require("./controllers/product.js");
const eventRouter = require("./controllers/event.js");
const couponRouter = require("./controllers/couponCode.js");
const paymentRouter = require("./controllers/payment.js");
const orderRouter = require("./controllers/order.js");
const withdrawRouter = require("./controllers/withdraw.js");
const conversationRouter = require("./controllers/conversation.js");
const messageRouter = require("./controllers/messages.js");

app.use("/api/v2/user", userRouter);
app.use("/api/v2/shop", shopRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/event", eventRouter);
app.use("/api/v2/coupon", couponRouter);
app.use("/api/v2/payment", paymentRouter);
app.use("/api/v2/order", orderRouter);
app.use("/api/v2/withdraw", withdrawRouter);
app.use("/api/v2/conversation", conversationRouter);
app.use("/api/v2/message", messageRouter);

app.use(ErrorHandler);

module.exports = app;
