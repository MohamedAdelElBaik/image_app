const express = require("express");
const mongoose = require("mongoose");
const imageModel = require("./models/Image");
const multerConfig = require("./multer");
const cloud = require("./cloudinaryConfig");
const fs = require("fs");

// fire app new express app
const app = express();

mongoose
  .connect(
    "mongodb+srv://mohamedAdel:qf-TDjnckD8M9CY@cluster0.evxfmf1.mongodb.net/main-data?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("mongodb connected");
  });

// serve images in directory named images
app.use("/images", express.static("images"));

app.post("/myImages", multerConfig, async (req, res) => {
  const result = await cloud.uploads(req.files[0].path);

  console.log("result ------------- : ", req.body.type);

  const { eventId, arriveAt } = req.body;

  const imageDetails = {
    imageName: req.files[0].originalname,
    url: result.url,
    eventId,
    arriveAt,
  };
  const image = new imageModel(imageDetails);
  image.save();

  // delete image local
  fs.unlinkSync(req.files[0].path);

  res.json({
    msg: "DONE",
    image: image,
  });
});

app.get("/myImages", async (req, res) => {
  const images = await imageModel.find();
  res.json(images);
});

app.get("/myImages/:id", async (req, res) => {
  const images = await imageModel.find(req.params.id);
  //   res.json(images);
  console.log("req.params: ", req.params);
  res.status(200).json({
    status: "success",
    images,
  });
});

app.listen(8080, () => {
  console.log("server started successfully");
});
