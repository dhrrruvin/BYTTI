import React from "react";
import "./JourneyDetail.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

const JourneyDetail = () => {
  const trainData = useSelector((state) => state.TrainDataReducer);

  return (
    <div className="journey-details">
      <div className="journey-train-header-div">
        <div className="train-name-journey-div">
          <h3>{trainData.train_name + " (" + trainData.train_number + ")"}</h3>
        </div>
      </div>
      <div className="main-details-journey-div">
        <div className="train-info-journey-div">
          <div className="left-journry-div">
            <h3>
              {trainData.source_arrival_time +
                " | " +
                trainData.source_station_name}
            </h3>
          </div>
          <div className="middle-journry-div">21:53</div>
          <div className="right-journry-div">
            <h3>
              {trainData.destination_arrival_time +
                " | " +
                trainData.destination_station_name}
            </h3>
          </div>
        </div>
        <div className="boarding-station-info-journey-div">
          <div className="container-boarding-station-info-journey-div">
            Boarding Station | {trainData.source_station_name} | Arrival:{" "}
            {trainData.source_arrival_time} | Departure:{" "}
            {trainData.source_departure_time}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyDetail;
