// Dependencies
let express = require("express");
let router = express.Router();

// Models
let sheet = require("../models/sheetModel");

// Routes
sheet.methods(["get", "put", "post", "delete"]);
sheet.register(router, "/sheets");

// Return router
module.exports = router;
