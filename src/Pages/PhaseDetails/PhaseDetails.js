import React from "react";
import PhaseDetails from "../PhaseDetails/PhaseDetails";
import useUserInfo from "../../Hooks/useUserInfo";
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
            <p className="font-2">Start Watching</p>
            <p>
              Simply click the "Watch" button to access a TV-like interface
              filled with entertaining meme videos.
            </p>
          </div>
          <div className="phase-para1">
            <p className="font-2">Earn While You Watch</p>
            <p>
              Sit back, relax, and enjoy the videos. Embrace the 'doNothing'
              mantra to effortlessly earn $MEMETV tokens as rewards.
            </p>
            <p>
              This seamless and fun viewing experience lets you enjoy daily
              entertainment while earning $ MEMETV tokens,showcasing The Meme
              TV's innovative approach to combining fun with rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
