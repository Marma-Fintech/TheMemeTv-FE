import React from "react";
import "./button.css";

const Playbutton = (props) => {
  return (
    <div
      onClick={() => {
        props?.clickFun();
      }}
      className="play-box"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{ width: props.width ? props.width : "30%", objectFit: "cover" }}
        src={props?.img}
      />
    </div>
  );
};

export default Playbutton;
