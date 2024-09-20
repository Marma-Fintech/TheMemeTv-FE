import React from "react";
import introLogo from "../../assets/images/introLogo.png";
import "./introImg.css"; // Make sure this path is correct
import introScreen from "../../assets/images/IntroScreen.png";

const IntroImg = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={introScreen}
        // className="grow-img"
        style={{ width: "300px" }}
        alt="border"
      />
    </div>
  );
};

export default IntroImg;
