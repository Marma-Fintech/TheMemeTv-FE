import React from "react";
import PhaseDetails from "../PhaseDetails/PhaseDetails";
import useUserInfo from "../../Hooks/useUserInfo";
import "../PhaseDetails/PhaseDetails.css";
const Info = () => {
  return (
    <div className="info-img">
      <div
        className="menupointer "
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          pointerEvents: "all",
        }}
      >
        <div style={{ maxWidth: "380px" }}>
          <div className="phase-details">
            <h3>Here’s how it works</h3>
          </div>
          <div className="phase-para1">
            <p className="font-2">
              doNothing, <br />
              YOU GET POINTS
            </p>
            <p className="font-2">
              TAP, <br />
              YOU GET POINTS
            </p>
            <p className="font-2">
              PLAY GAMES, <br />
              YOU GET POINTS
            </p>
            <p className="font-2">
              MAINTAIN STREAK, <br />
              YOU GET POINTS
            </p>
            <p className="font-2">
              STAKE, <br />
              YOU GET POINTS
            </p>
            <h3 className="fonth3">ITS THAT SIMPLE !</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Info;
