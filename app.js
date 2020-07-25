var express = require("express");
var app = express();
//var bodyParser = require("body-parser");
const bodyParser = require("body-parser");
var https = require("https");
const fs = require("fs");
var cors = require("cors");
const { Timestamp } = require("mongodb");
require("./models/User");
var mongo = require("mongodb").MongoClient;

const mongoose = require("mongoose");
var url = "mongodb://siya:siya@localhost:27017/randwater-site-inspection";
const { mogoUrl } = require("./middleware/keys");

const requireToken = require("./middleware/requireToken");
const authRoutes = require("./middleware/routes/authRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

mongoose.connect(mogoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeahh");
});

mongoose.connection.on("error", (err) => {
  console.log("this is error", err);
});

mongo.connect(mogoUrl, (err) => {
  console.log("Database Connected");
});

app.get("/data3", (req, res) => {
  mongo.connect(mogoUrl, (err, db) => {
    var collection = db.collection("WaterTreatmentSamplesWP1");
    collection.find({}).toArray((x, results) => {
      res.send(results);
    });
  });
});

app.post("/data", (req, res) => {
  mongo.connect(mogoUrl, (err, db) => {
    var collection = db.collection("pHAlkalinityPPAnalysisWP1");
    var pHAlkalinityPP = {
      FpH2: req.body.FpH2,
      FPP2: req.body.FPP2,
      HpH2: req.body.HpH2,
      HPP2: req.body.HPP2,
      FpH2: req.body.FpH2,
      KpH3: req.body.KpH3,
      KPP3: req.body.KPP3,
      MpH3: req.body.MpH3,
      MPP3: req.body.MPP3,
      pH40: req.body.pH40,
      InspectedAt: new Date(),
      Times: new Timestamp(),
    };
    collection.insert(pHAlkalinityPP, (x, results) => {
      res.send(results);
    });
  });
});

app.post("/data2", (req, res) => {
  mongo.connect(mogoUrl, (err, db) => {
    var collection = db.collection("pHafterCarbonationbays");
    var pHafterC = {
      FX: req.body.FX,
      HX: req.body.HX,
      KX: req.body.KX,
      MX: req.body.MX,
      Flume: req.body.Flume,
      OX: req.body.OX,
      QX: req.body.QX,

      InspectedAt: new Date(),
      Times: new Timestamp(),
    };
    collection.insert(pHafterC, (x, results) => {
      res.send(results);
    });
  });
});

app.post("/data3", (req, res) => {
  mongo.connect(mogoUrl, (err, db) => {
    var collection = db.collection("WaterTreatmentSamplesWP1");
    var WaterTreat = {
      F: req.body.F,
      H: req.body.H,
      K: req.body.K,
      M: req.body.M,
      O: req.body.O,
      Q: req.body.Q,
      G: req.body.G,
      J: req.body.J,
      L: req.body.L,
      N: req.body.N,
      P: req.body.P,
      R: req.body.R,

      InspectedAt: new Date(),
      Times: new Timestamp(),
    };
    collection.insert(WaterTreat, (x, results) => {
      res.send(results);
    });
  });
});

app.post("/users", (req, res) => {
  mongo.connect(mogoUrl, (err, db) => {
    var collection = db.collection("users");
    var user = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
      CreatedAt: new Date(),
      Times: new Timestamp(),
    };
    collection.insert(user, (x, results) => {
      res.send(results);
    });
  });
});

app.get("/", requireToken, (req, res) => {
  console.log(requireToken);
  res.send({ email: req.user.email });
});

app.listen(3210, () => {
  console.log("Server aktif @port 3210!");
});
