import React from "react";
import "./Social.css";
import LogoImg from "../../components/logoImg/logoImg";
import img from "../../assets/images/introLogo.png";
import twitter from "../../assets/images/twitter.png";
import youtube from "../../assets/images/yt.png";
import telegram from "../../assets/images/telegram.png";

const Social = () => {
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
        <div id="glitch-background" className="centerSocial">
          <div className="Socialintro">
            <p>Tune into CMemeTv and doNothing</p>
          </div>
          <div className="namastay">
            <p>Namastay</p>
          </div>
          <div
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            <div className="socialIcon">
              <img
                src={twitter}
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="socialIcon">
              <img
                src={youtube}
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="socialIcon">
              <img
                src={telegram}
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
          <div>
            <p className="socialPara socialPadding">
              Meme.Tv is a meme coin with no intrinsic value or expectation of
              financial return. There is no formal team or roadmap. the coin is
              completely useless and for
              <span className="socialInstyle">
                <span></span> entertainment purposes only.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
