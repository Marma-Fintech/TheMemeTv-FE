import React from "react";
import "./IntroPage.css";
import twitter from "../../assets/images/twitter.png";
import youtube from "../../assets/images/yt.png";
import telegram from "../../assets/images/telegram.png";
const IntroPage = () => {
  return (
    <div className="intro-head">
      <div className="intro-section">
        <div className="intro-content">
          <p className="text-head">
            Where you can earn rewards by simply watching meme videos.
          </p>
          <h2 className="join-content">Ready to join the fun?</h2>
          <div className="social">
            <div
              style={{
                display: "flex",
                width: "35%",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <div className="socialIcon">
                <img
                  src={twitter}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="socialIcon">
                <img
                  src={youtube}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="socialIcon">
                <img
                  src={telegram}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
