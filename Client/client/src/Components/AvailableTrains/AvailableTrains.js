import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TrainResult from "./TrainResult";
import "./AvailableTrains.css";
import axios from "../../api/axios";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AvailableTrains = () => {
  const [data, setData] = useState([]);

  const sourceStationData = useSelector((state) => state.SourceStationReducer);
  const destinationStationData = useSelector(
    (state) => state.DestinationStationReducer
  );

  const source = sourceStationData.source_station.split(" - ");
  const destination = destinationStationData.destination_station.split(" - ");

  const src_station_code = source[0];
  const dest_station_code = destination[0];
  const src_station_name = source[1];
  const dest_station_name = destination[1];

  const stations = {
    src_station_name,
    dest_station_name,
    src_station_code,
    dest_station_code,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/find_trains?" +
            new URLSearchParams({
              src: src_station_code,
              dest: dest_station_code,
            })
        );
        console.log(response.data.trains.length);
        setData(response.data.trains);
      } catch (err) {
        console.log("error calling the api in availableTrains.js");
        console.log(err);
      }
    };
    fetchData();
  }, [sourceStationData, destinationStationData]);

  return (
    <>
      <Navbar />
      <div className="results">
        {data.map((item, id) => (
          <TrainResult key={id} details={item} stations={stations} />
        ))}
      </div>
    </>
  );
};

export default AvailableTrains;
