const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Shop = require("../models/shop");
const Event = require("../models/event");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAdmin, isAuthenticated } = require("../middlewares/auth");
const { upload } = require("../multer");
const eventRouter = express.Router();

// create event
eventRouter.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        // let images = [];

        // if (typeof req.body.images === "string") {
        //   images.push(req.body.images);
        // } else {
        //   images = req.body.images;
        // }

        // const imagesLinks = [];

        // for (let i = 0; i < images.length; i++) {
        //   const result = await cloudinary.v2.uploader.upload(images[i], {
        //     folder: "products",
        //   });

        //   imagesLinks.push({
        //     public_id: result.public_id,
        //     url: result.secure_url,
        //   });
        // }

        let imageUrls = [];

        if (req.files && req.files.length > 0) {
          imageUrls = req.files.map((file) => ({
            public_id: file.filename,
            url: file.path,
          }));
        }
        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const event = await Event.create(productData);

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events
eventRouter.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events of a shop
eventRouter.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete event of a shop
eventRouter.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }

      // for (let i = 0; 1 < product.images.length; i++) {
      //   const result = await cloudinary.v2.uploader.destroy(
      //     event.images[i].public_id
      //   );
      // }

      await event.remove();

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = eventRouter;
