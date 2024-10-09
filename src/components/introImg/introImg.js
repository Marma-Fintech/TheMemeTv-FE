import React from "react";
import introLogo from "../../assets/images/introLogo.png";
import "./introImg.css"; // Make sure this path is correct
import introScreen from "../../assets/images/IntroScreen.png";
// import introImg from "../../assets/images/introImage.svg";
import introImg from "../../assets/images/introLogo.svg";

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
        src={introImg}
        // className="grow-img"
        style={{ width: "300px" }}
        alt="border"
      />
    </div>
  );
};

export default IntroImg;
