import { READ_TRAIN_DATA } from "../types/TrainDataType";

const initialState = {
  train_number: "",
  train_name: "",
  source_arrival_time: "",
  destination_arrival_time: "",
  source_station_name: "",
  destination_station_name: "",
  source_station_code: "",
  destination_station_code: "",
  source_departure_time: "",
};

export const TrainDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_TRAIN_DATA:
      return action.data;
    default:
      return state;
  }
};
