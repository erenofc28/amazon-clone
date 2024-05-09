const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const user = require("./user");
// const UserModel = require('UserModel')
// const async = require('async_hooks')
const port = 3024;
const app = express();
app.use(cors());
const router = express.router();

mongoose
  .connect("mongodb://localhost:27017/node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log(err));

let db = mongoose.connection;
db.once("once", () => console.log("connected to database"));
db.on("error", console.error.bind(console, "mongo DB Connection error"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/getdata", (req, res) => {
  user.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/updateData", (req, res) => {
  const { id } = req.body;
  user.findByIdAndUpdate(id, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  user.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/putData", (req, res) => {
  let user = new user();
  const { id, message } = req.body;
  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "invalid",
    });
  }
  user.message = message;
  user.id = id;
  user.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
