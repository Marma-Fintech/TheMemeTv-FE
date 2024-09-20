import React from "react";
import "./ExplainPage.css";
import LogoImg from "../../assets/images/introLogo.png";

const ExplainPage = () => {
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
      <div style={{ height: "70%", textAlign:"center" }}>
        <img src ={LogoImg} style={{width:"120px;"}}/>
        <div id="glitch-background" className="centerSocial">
      <div className="explain-page">
        <p className="text-head">
          The Meme TV is a Telegram bot that lets you earn $MEMETV tokens as
          rewards by using its features. Once connected, you can earn $MEMETV
          tokens in three ways: inviting friends to join (Refer and Earn),
          watching meme videos (Watch and Earn), and completing fun tasks and
          challenges (Do and Earn). It's an easy and enjoyable way to get
          rewards just by interacting with entertaining content and sharing it
          with others.
        </p>
      </div>
      </div>
      </div>
      </div>

  );
};

export default ExplainPage;
