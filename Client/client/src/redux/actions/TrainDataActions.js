import { READ_TRAIN_DATA } from "../types/TrainDataType";

export const readTrainData = (data) => {
  return {
    type: READ_TRAIN_DATA,
    data: data,
  };
};
