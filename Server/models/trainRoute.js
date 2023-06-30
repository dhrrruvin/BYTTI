const { Schema, model } = require("mongoose");

const TrainRouteSchema = new Schema(
  {
    train_number: {
      type: String,
      unique: true,
      required: true,
    },
    stations: Array,
  },
  { collection: "trainRoute" }
);

module.exports = model("TrainRoute", TrainRouteSchema);
