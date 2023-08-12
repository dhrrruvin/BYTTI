import { SELECT_DESTINATION_STATION } from "../types/DestinationStationType";

const initialState = {
  destination_station: "",
};

export const DestinationStationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_DESTINATION_STATION:
      return { ...state, destination_station: action.data };
    default:
      return state;
  }
};
