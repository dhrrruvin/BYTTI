import { SELECT_SOURCE_STATION } from "../types/SourceStationType";

export const selectSourceStation = (data) => {
  return {
    type: SELECT_SOURCE_STATION,
    data: data,
  };
};
