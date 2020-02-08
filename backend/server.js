const express = require("express"),
  bodyParser = require("body-parser"),
  restful = require("node-restful"),
  mongoose = restful.mongoose;
const app = express();
const cors =require("cors");

const sheetModel = require("./models/sheetModel");

app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/VTGSheets", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use("/api", require("./routes/api"));
app.post("/api/addTile", (req, res) => {
  sheetModel.findOneAndUpdate(
    { _id: req.body.id },
    { $push: { tiles: req.body.tile } },
    { new: true },
    (err, resp) => {
      if (err) {
        return res.send(err);
      }
      res.send("Added Successfully");
    }
  );
});

app.post("/api/addSubmission", async (req, res) => {
  const sheet = await sheetModel.findById(req.body.id);
  const tileIndex = sheet.tiles.findIndex(
    t => t.boss_name.toLowerCase() === req.body.boss_name.toLowerCase()
  );

  if (tileIndex !== -1) {
    sheet.tiles[tileIndex].submission = req.body.submission;
    sheet.tiles[tileIndex].submission.date = new Date().getTime() 
  }

  await sheet.save();

  res.send("Submitted");
});

app.listen(5000);
