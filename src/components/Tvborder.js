import React from "react";
import border1 from "../assets/images/Frame 21.png";
import border2 from "../assets/images/doNothingimg.png";
import useUserInfo from "../Hooks/useUserInfo";

function Tvborder() {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      {/* <div
        style={{
          position: "absolute",
          height: "90px",
          width: "100%",
        }}
      >
      </div> */}

      <img
        src={watchScreen.booster ? border2 : border1}
        alt="border"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

export default Tvborder;
