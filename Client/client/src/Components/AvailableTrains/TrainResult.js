import React, { useEffect, useState } from "react";
import "./TrainResult.css";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { readTrainData } from "../../redux/actions/TrainDataActions";

const TrainResult = ({ details, stations }) => {
  const [availableSeats, setAvailableSeats] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = axios.get(
          "/seats?" +
            new URLSearchParams({
              src: stations.src_station_code,
              dest: stations.dest_station_code,
              train_number: details[0].train_number,
            })
        );

        response.then((resp) => {
          setAvailableSeats(resp.data);
        });
      } catch (error) {
        console.log("error in calling an api in TrainResult.js");
        console.log(error);
      }
    };
    fetchSeats();
    setTimeout(() => {
      fetchSeats();
    }, 30000);
  }, []);

  const bookTicket = async (e) => {
    e.preventDefault();

    const data = {
      train_number: details[0].train_number,
      source: stations.src_station_code,
      destionation: stations.dest_station_code,
    };

    try {
      const response = await axios.post("/book", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const storeTrainInfo = () => {
    const data = {
      train_number: details[0].train_number,
      train_name: details[0].train_name,
      source_station_name: stations.src_station_name,
      destination_station_name: stations.dest_station_name,
      source_station_code: stations.src_station_code,
      destination_station_code: stations.dest_station_code,
      source_arrival_time: details[0].route[0].arrival_time.slice(0, -3),
      destination_arrival_time: details[1].route[0].arrival_time.slice(0, -3),
      source_departure_time: details[0].route[0].departure_time.slice(0, -3),
    };

    dispatch(readTrainData(data));
  };

  return (
    <>
      <div className="train-result-div">
        <div className="train-result-header-div">
          <div className="train-name">
            <h3>{`${details[0].train_name} (${details[0].train_number})`}</h3>
          </div>
          <div className="train-schedule">
            <a href="/valid">Train Schedule</a>
          </div>
        </div>
        <div className="main-content">
          <div className="train-info">
            <div className="left">
              <h2 className="time-text">
                {`${details[0].route[0].departure_time.slice(0, -3)}`} |{" "}
              </h2>
              <p>{`${stations.src_station_name}`}</p>
            </div>
            <div className="center">
              <p>02:19</p>
            </div>
            <div className="right">
              <h2 className="time-text">
                {`${details[1].route[0].arrival_time.slice(0, -3)}`} |{" "}
              </h2>
              <p>{`${stations.dest_station_name}`}</p>
            </div>
          </div>
          <div className="ticket-show-div">
            <div className="ticket-status-div">
              <h3>Sleeper (SL)</h3>
              <p>₹ 4100</p>
              <p>CURR_AVBL-{availableSeats}</p>
            </div>
            <div className="ticket-status-div">
              <h3>Sleeper (SL)</h3>
              <p>₹ 4100</p>
              <p>CURR_AVBL-{availableSeats}</p>
            </div>
            <div className="ticket-status-div">
              <h3>Sleeper (SL)</h3>
              <p>₹ 4100</p>
              <p>CURR_AVBL-{availableSeats}</p>
            </div>
          </div>
          <div className="book-btn-div">
            <Link to="/psnginput">
              <button className="book-btn" onClick={() => storeTrainInfo()}>
                Book
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainResult;
