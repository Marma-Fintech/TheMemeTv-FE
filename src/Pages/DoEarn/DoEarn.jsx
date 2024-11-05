import React, { useEffect, useState } from "react";
import "./DoEarn.css";
import earn from "../../assets/images/earn-txt.png";
import twitter from "../../assets/images/twitter.svg";
import logo from "../../assets/images/meme-logo.svg";
import youtube from "../../assets/images/youtube.svg";
import telegram from "../../assets/images/telegram.svg";
import dobottom from "../../assets/images/stuff.gif";
import { cheapStuff } from "../../apis/user";
import useUserInfo from "../../Hooks/useUserInfo";
import cancelIcon from "../../assets/Task/cancelicon.png";
import Tv from "../Tv/Tv";

const DoEarn = () => {
  const { userDetails, updateUserInfo } = useUserInfo();

  const [xchannel, setXchannel] = useState(localStorage.getItem("xchannel"));
  const [xchannelvalid, setXchannelValid] = useState(false);
  const [ychannel, setYchannel] = useState(localStorage.getItem("ychannel"));
  const [ychannelvalid, setYchannelValid] = useState(false);
  const [tchannel, setTchannel] = useState(localStorage.getItem("tchannel"));
  const [tchannelvalid, setTchannelValid] = useState(false);

  const joinXChannel = () => {
    localStorage.setItem("xchannel", new Date());
    setXchannel(new Date());
    window.open("https://x.com/CoinDiaryApp", "_blank");
  };

  const joinYChannel = () => {
    localStorage.setItem("ychannel", new Date());
    setYchannel(new Date());
    window.open("https://www.instagram.com/thememe.tv_/", "_blank");
  };

  const joinTChannel = () => {
    localStorage.setItem("tchannel", new Date());
    setTchannel(new Date());
    window.open("https://t.me/thememetvcommunity", "_blank");
  };

  const claimRewards = async (channel) => {
    const data = {
      telegramId: userDetails?.userDetails?.telegramId,
      taskPoints: String(5000),
      channel: channel,
    };
    const res = await cheapStuff(data).then((res) => {
      if (channel === "twitter") {
        setXchannelValid("claimed");
      }
      if (channel === "youtube") {
        setYchannelValid("claimed");
      }
      if (channel === "telegram") {
        setTchannelValid("claimed");
      }
    });
  };

  useEffect(() => {
    if (xchannel) {
      const storedDate = new Date(xchannel); // Directly convert the date string to Date object
      const currentDate = new Date();

      // Calculate the difference in minutes
      const timeDifferenceInMinutes = Math.floor(
        (currentDate - storedDate) / (1000 * 60)
      );

      // If more than 30 minutes have passed, update the state
      if (timeDifferenceInMinutes > 30) {
        setXchannelValid(true);
      } else {
        setXchannelValid(false); // Optional: Reset if within 30 minutes
      }
    }
    if (ychannel) {
      const storedDate = new Date(ychannel); // Directly convert the date string to Date object
      const currentDate = new Date();

      // Calculate the difference in minutes
      const timeDifferenceInMinutes = Math.floor(
        (currentDate - storedDate) / (1000 * 60)
      );

      // If more than 30 minutes have passed, update the state
      if (timeDifferenceInMinutes > 30) {
        setYchannelValid(true);
      } else {
        setYchannelValid(false); // Optional: Reset if within 30 minutes
      }
    }
    if (tchannel) {
      const storedDate = new Date(tchannel); // Directly convert the date string to Date object
      const currentDate = new Date();

      // Calculate the difference in minutes
      const timeDifferenceInMinutes = Math.floor(
        (currentDate - storedDate) / (1000 * 60)
      );

      // If more than 30 minutes have passed, update the state
      if (timeDifferenceInMinutes > 30) {
        setTchannelValid(true);
      } else {
        setTchannelValid(false); // Optional: Reset if within 30 minutes
      }
    }

    if (userDetails?.userDetails.taskRewards.twitter) {
      setXchannelValid("claimed");
    }
    if (userDetails?.userDetails.taskRewards.telegram) {
      setTchannelValid("claimed");
    }
    if (userDetails?.userDetails.taskRewards.youtube) {
      setYchannelValid("claimed");
    }
  }, []);

  const toogleMenu = () => {
    updateUserInfo((prev) => ({
      ...prev,
      isPlay: false,
      currentComponent: Tv,
      currentComponentText: "TVPage",
      lastComponent: userDetails?.userDetails.currentComponent,
      lastComponentText: userDetails?.userDetails.currentComponentText,
      isMenu: false,
      menuCount: userDetails?.userDetails?.menuCount + 1,
    }));
  };

  return (
    <div className="info-img">
      <img
        onClick={() => {
          toogleMenu();
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer", pointerEvents: "all" }}
      />
      <div
        className="menupointer stuff-body"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop: "15%",
          flexDirection: "column",
          pointerEvents: "all",
        }}
      >
        <div>
          <div className="row">
            <div className="col-12">
              <div className="doearn-img">
                <img className="stuff-gif" src={dobottom} />
                <div className="earn-img">
                  <img src={earn} />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt20 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img src={twitter} style={{ width: "100%" }} />
            </div>
            <div className="col-7 stuff-text">
              <h4>FOLLOW US ON X</h4>
              <p className="stuff-p">
                <img src={logo} /> +5,000{" "}
              </p>
            </div>
            <div className="col-3">
              {!xchannel ? (
                <button
                  onClick={() => {
                    if (!xchannel) joinXChannel();
                  }}
                  className="stuff-go"
                  type="button"
                >
                  GO
                </button>
              ) : null}
              {xchannel && xchannelvalid && xchannelvalid !== "claimed" && (
                <button
                  onClick={() => {
                    claimRewards("twitter");
                  }}
                  className="stuff-claim"
                  type="button"
                >
                  CLAIM
                </button>
              )}
              {xchannel && xchannelvalid && xchannelvalid === "claimed" && (
                <button className="validate" type="button">
                  CLAIMED
                </button>
              )}
              {xchannel && !xchannelvalid && (
                <button className="validate" type="button">
                  Validating
                </button>
              )}
            </div>
          </div>

          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img src={youtube} style={{ width: "100%" }} />
            </div>
            <div className="col-7 stuff-text">
              <h4>FOLLOW US ON INSTAGRAM</h4>
              <p className="stuff-p">
                <img src={logo} /> +5,000{" "}
              </p>
            </div>
            <div className="col-3">
              {!ychannel ? (
                <button
                  onClick={() => {
                    if (!ychannel) joinYChannel();
                  }}
                  className="stuff-go"
                  type="button"
                >
                  GO
                </button>
              ) : null}
              {ychannel && ychannelvalid && ychannelvalid !== "claimed" && (
                <button
                  onClick={() => {
                    claimRewards("youtube");
                  }}
                  className="stuff-claim"
                  type="button"
                >
                  CLAIM
                </button>
              )}
              {ychannel && ychannelvalid && ychannelvalid === "claimed" && (
                <button className="validate" type="button">
                  CLAIMED
                </button>
              )}
              {ychannel && !ychannelvalid && (
                <button className="validate" type="button">
                  Validating
                </button>
              )}
            </div>
          </div>

          <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
            <div className="col-2">
              <img src={telegram} style={{ width: "100%" }} />
            </div>
            <div className="col-7 stuff-text">
              <h4>JOIN OUR TELEGRAM CHANNEL</h4>
              <p className="stuff-p">
                <img src={logo} /> +5,000{" "}
              </p>
            </div>
            <div className="col-3">
              {!tchannel ? (
                <button
                  onClick={() => {
                    if (!tchannel) joinTChannel();
                  }}
                  className="stuff-go"
                  type="button"
                >
                  GO
                </button>
              ) : null}
              {tchannel && tchannelvalid && tchannelvalid !== "claimed" && (
                <button
                  onClick={() => {
                    claimRewards("telegram");
                  }}
                  className="stuff-claim"
                  type="button"
                >
                  CLAIM
                </button>
              )}
              {tchannel && tchannelvalid && tchannelvalid === "claimed" && (
                <button className="validate" type="button">
                  CLAIMED
                </button>
              )}
              {tchannel && !tchannelvalid && (
                <button className="validate" type="button">
                  Validating
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoEarn;
