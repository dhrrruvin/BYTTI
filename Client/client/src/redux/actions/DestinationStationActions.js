import { SELECT_DESTINATION_STATION } from "../types/DestinationStationType";

export const selectDestionationStation = (data) => {
  return {
    type: SELECT_DESTINATION_STATION,
    data: data,
  };
};
