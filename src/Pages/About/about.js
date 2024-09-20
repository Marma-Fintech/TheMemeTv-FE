import React from "react";
import LogoImg from "../../components/logoImg/logoImg";
import "./about.css"; // Make sure this path is correct
const about = () => {
  return (
    <div
      className="menupointer"
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
      <div style={{ height: "80%" }}>
        <LogoImg />
        <div id="glitch-background" className="center-content">
          <div className="about-trasition-1">
            <div className="aboutIntro gradient-text1">
              <p>What is The Meme TV?</p>
            </div>
            <div className="aboutIntro gradient-text2">
              It is a not stop stream of delightful Meme videos
            </div>
            <div className="aboutIntro gradient-text3">
              How do I get TheMemeTV(TheTV) tokens?
            </div>
            <div className="aboutIntro gradient-text4">
              Connect your wallet and start watching TheMemeTV. You will be
              rewarded with TheTV tokens for every second you watch. At some
              point, we are sure you may also find the tokens on some exchanges
              or get airdrops.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
