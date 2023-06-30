const { model, Schema, mongoose } = require("mongoose");

const TrainSchema = Schema(
  {
    train_number: {
      type: String,
      required: true,
    },
    train_name: String,
    route: [
      {
        station: {
          type: mongoose.Types.ObjectId,
          ref: "stations",
        },
        distance_traveled: Number,
        arrival_time: String,
        departure_time: String,
        sequence: { type: Number },
      },
    ],
  },
  { collection: "train1" }
);

module.exports = model("Train1", TrainSchema);
