import React from "react";
import "./List.css";

const List = ({ stations, handleItemClick }) => {
  const onItemClick = (text) => {
    handleItemClick(text);
  };

  return (
    <div className="autocom-box">
      {stations.length > 0 &&
        stations.map((element, index) => (
          <li key={index} onMouseDown={(e) => onItemClick(e.target.outerText)}>
            {element.item.station_code + " - " + element.item.station_name}
          </li>
        ))}
    </div>
  );
};

export default List;
