import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { SourceStationReducer } from "../reducers/SourceStationReducer";
import { DestinationStationReducer } from "../reducers/DestinationStationReducer";
import { TrainDataReducer } from "../reducers/TrainDataReducer";

const combinedReducers = combineReducers({
  SourceStationReducer: SourceStationReducer,
  DestinationStationReducer: DestinationStationReducer,
  TrainDataReducer: TrainDataReducer,
});

// const middleware = applyMiddleware(thunk);
const store = configureStore({ reducer: combinedReducers });
export { store };
