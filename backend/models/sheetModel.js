const restful = require("node-restful");
const mongoose = restful.mongoose;

//Schema
const sheetSchema = new mongoose.Schema({
  team_name: String,
  team_members: [{ type: String }],
  tiles: [
    {
      boss_name: String,
      boss_image: String,
      tile_challenge: String,
      submission: {
        playername: String,
        date: Number,
        url: String
      }
    }
  ]
});

//Return model
module.exports = restful.model("Sheets", sheetSchema);
