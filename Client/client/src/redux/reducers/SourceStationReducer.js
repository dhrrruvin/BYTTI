import { SELECT_SOURCE_STATION } from "../types/SourceStationType";

const initialState = {
  source_station: "",
};

export const SourceStationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SOURCE_STATION:
      return { ...state, source_station: action.data };
    default:
      return state;
  }
};
