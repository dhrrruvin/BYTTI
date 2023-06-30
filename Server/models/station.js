const { Schema, model } = require("mongoose");

const StationSchema = new Schema({
  station_code: {
    type: String,
    unique: true,
    required: true,
  },
  station_name: {
    type: String,
    required: true,
  },
});

module.exports = model("Stations", StationSchema);
