import React from "react";
import "./List.css";
import Coin from "../../assets/images/coin.png";

const List = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "80%",
        backgroundColor: "rgba(33, 33, 33, 1)",
      }}
      className="press-start-2p-regular rounded-md pt-3 pb-3 pl-2 mb-2"
    >
      <div
        style={{
          height: "15%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="whitespace-nowrap text-sm textlist"
      >
        watch points
      </div>
      <div
        style={{
          height: "15%",
          width: "60%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderColor: "1px solid rgba(49, 50, 49, 1)",
        }}
        className="textlist border rounded-sm"
      >
        <img style={{ height: "15%", width: "15%" }} src={Coin} alt="coin" />
        <span>5000</span>
      </div>
    </div>
  );
};

export default List;
