const express = require("express"),
  bodyParser = require("body-parser"),
  restful = require("node-restful"),
  mongoose = restful.mongoose;
const app = express();
const cors = require("cors");
const path = require("path");

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

app.post("/api/addTile", async (req, res) => {
  const sheets = await sheetModel.find({});
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    sheet.tiles.push(req.body.tile);
    await sheet.save();
  }
  res.json({ message: "hopefully added tiles" });
});

app.delete("/api/addTile", async (req, res) => {
  const sheets = await sheetModel.find({});
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    if (sheet) {
      sheet.tiles = sheet.tiles.filter(t => t.boss_name !== req.body.boss_name);
      await sheet.save();
    }
  }
  res.json({ message: "hopefully removed tiles" });
});

app.post("/api/addSubmission", async (req, res) => {
  const sheet = await sheetModel.findById(req.body.id);
  const tileIndex = sheet.tiles.findIndex(
    t => t.boss_name.toLowerCase() === req.body.boss_name.toLowerCase()
  );

  if (tileIndex !== -1) {
    sheet.tiles[tileIndex].submission = req.body.submission;
    sheet.tiles[tileIndex].submission.date = new Date().getTime();
  }

  await sheet.save();
  res.json({ message: "Submitted" });
});

app.use("/", express.static(path.resolve(__dirname + "/build")));
app.use("*", express.static(path.resolve(__dirname + "/build/index.html")))
app.listen(80);
