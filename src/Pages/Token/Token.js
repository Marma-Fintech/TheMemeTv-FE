import React from "react";
import "./Token.css";
import LogoImg from "../../components/logoImg/logoImg";

const Token = () => {
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
          <div
            className="Tokenintro"
            style={{ width: "100%", paddingLeft: "10px" }}
          >
            <p style={{ textAlign: "start", fontSize: "15px" }}>Token supply</p>
            <p className="tokenstyle" style={{ textAlign: "start" }}>
              999,999,999,999,999 HPTV
            </p>
          </div>
          {/* <div className="Tokenpara1 TokenPadding">
            5%- Build (We can’t jus’ doNothing. Memes need to win) */}
          <div className="tokenpara1 tokengradient1 TokenPadding">
            5%- Build (We can’t jus’
          </div>

          <div className="tokenpara1 tokengradient2 TokenPadding2">
            doNothing. Memes need to win)
          </div>

          <div className="tokenpara1 tokengradient2 TokenPadding">
            5%- Team(We need to win. We
          </div>
          <div className="tokenpara1 tokengradient1 TokenPadding2">
            want to donothing
          </div>

          <div className="tokenpara1 tokengradient2 TokenPadding">
            Rest- you decide while you
          </div>
          <div className="tokenpara1 tokengradient1 TokenPadding2">
            donothing
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
