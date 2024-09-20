import React from "react";
import introLogo from "../../assets/images/introLogo.png";

const logoImg = () => {
  return (
    <div
      style={{
        // height: "100%",
        // width: "100%",
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
        // backgroundColor: "red",
      }}
    >
      <img
        src={introLogo}
        // className="grow-img"
        style={{ width: "110px" }}
        alt="border"
      />
    </div>
  );
};

export default logoImg;
