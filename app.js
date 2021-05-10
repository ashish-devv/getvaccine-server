require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect(
  process.env.DBURL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("Connected To Db Successfully ✅");
    }
  }
);

const detailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  pincode: { type: Number, required: true },
  state: { type: Number, required: true },
  district: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

const detailModel = new mongoose.model("detail", detailsSchema);

app.get("/", (req, res) => {
  res.json({
    welcome: "Hey All ! welcome to GetVaccine Server",
    Developer: "Ashish (githubid 👉 ashish-devv)",
  });
});

app.get("/linkforcron-job", (req, res) => {
  res.json({
    Date: new Date(),
  });
});

app.get("/getDetail", (req, res) => {
  if (Object.keys(req.query).length === 0) {
    res.json({ code: 3, error: "Unknown Error" });
  } else {
    if (req.query) {
      //console.log(req.query);
      detailModel.findOne({ email: req.query.email }, (err, rs) => {
        if (err) {
          console.log(err);
          res.json({ code: 3, error: "Unknown Error" }); //  code 3 for unknown error
        } else {
          if (rs) {
            res.json({ code: 2 }); //code 2 for already data (email exist)
          } else {
            const newdetail = new detailModel(req.query);
            newdetail.save((err, result) => {
              if (err) {
                console.log(err);
                res.json({ code: 3 });
              } else {
                console.log(result);
                res.json({ code: 1 }); //code 1 for success
              }
            });
          }
        }
      });
    }
  }
});

app.get("/deletemefromlist", (req, res) => {
  if (Object.keys(req.query).length === 0) {
    res.json({ code: 3, error: "Unknown Error" });
  } else {
    detailModel.deleteOne({ email: req.query.email }, (err, rs) => {
      if (err) {
        res.json({ code: 3, error: "Unknown Error" });
      } else {
        res.send(
          "<strong>Your Name Has been Removed From our App ! you Will no Longer Recieve Any Email From Us !</strong>"
        );
      }
    });
  }
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server Started At ${port}`);
});
