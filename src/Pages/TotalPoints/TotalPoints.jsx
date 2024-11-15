import React, { useEffect, useRef, useState } from "react";
import cancelIcon from "../../../src/assets/Task/cancelicon.png";
import useUserInfo from "../../Hooks/useUserInfo";
import logo from "../../assets/images/meme-logo.svg";
import Tv from "../Tv/Tv";
import "./TotalPoints.css";
import { UserDeatils } from "../../apis/user";
import questionMarkIcon from "../../assets/Task/ReferImg.png";
import Info from "../PhaseDetails/PhaseDetails";

const TotalPoints = () => {
  const { userDetails, updatewatchScreenInfo, updateUserInfo, watchScreen } =
    useUserInfo();
  const goToThePage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: name,
          lastComponent: userDetails.currentComponent,
          lastComponentText: userDetails.currentComponentText,
          centerCount: userDetails.centerCount + 1,
        },
      };
    });
  };

  useEffect(() => {
    const getUserDetails = async (data) => {
      const userDetails = await UserDeatils(data);

      updateUserInfo((prev) => ({
        ...prev,
        userDetails: userDetails?.user,
      }));

      updatewatchScreenInfo((prev) => ({
        ...prev,
        boostersList: userDetails?.user?.boosters,
      }));
    };
    const data1 = {
      name: userDetails?.userDetails?.name,
      telegramId: String(userDetails?.userDetails?.telegramId),
    };

    getUserDetails(data1);
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
    <>
      <img
        onClick={() => {
          toogleMenu();
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer", pointerEvents: "all" }}
      />
      <img
        onMouseEnter={() => {
          goToThePage(Info, "InfoPage");
        }}
        src={questionMarkIcon}
        alt="Question Mark Icon"
        className="cancel-imgpoints1"
        style={{ marginLeft: "5px", pointerEvents: "all" }}
      />
      <div className="info-img scroll">
        <div
          className="menupointer stuff-body"
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
          <div className="totalpoints-scrtoll">
            <div className="streakContainer">
              {/* <img
              onClick={() => {
                goToThePage(Tv, "Tv");
              }}
              src={cancelIcon}
              className="cancel-imgpoints"
              style={{ cursor: "pointer" }}
            /> */}
              <div className="row mt10 cheap-stuff" style={{ width: "100%" }}>
                <h4 className="totalPointsText">TOTAL TOKENS</h4>
                <div>
                  <p className="rewardstext pb0">
                    <img src={logo} /> {watchScreen.allrewards}
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt10 cheap-stuff display-flex">
              <div className="col-7">
                <h4 className="textcolor">WATCH TOKENS</h4>
              </div>
              <div className="col-5">
                <div className="btn-bg">
                  <button className="button-points">
                    <img className="logo-points" src={logo} />
                    {userDetails?.userDetails?.watchRewards}
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt10 cheap-stuff display-flex">
              <div className="col-7">
                <h4 className="textcolor">REFERRAL TOKENS</h4>
              </div>
              <div className="col-5">
                <div className="btn-bg">
                  <button className="button-points">
                    <img className="logo-points" src={logo} />
                    {userDetails?.userDetails?.referRewards}
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt10 cheap-stuff display-flex">
              <div className="col-7">
                <h4 className="textcolor">STREAK TOKENS</h4>
              </div>
              <div className="col-5">
                <div className="btn-bg">
                  <button className="button-points">
                    <img className="logo-points" src={logo} />
                    {userDetails?.userDetails?.streakRewards}
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt10 cheap-stuff display-flex">
              <div className="col-7">
                <h4 className="textcolor">GAMING TOKENS</h4>
              </div>
              <div className="col-5">
                <div className="btn-bg">
                  <button className="button-points">
                    <img className="logo-points" src={logo} />
                    {userDetails?.userDetails?.gameRewards?.gamePoints}
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt10 cheap-stuff display-flex">
              <div className="col-7">
                <h4 className="textcolor">STAKING TOKENS</h4>
              </div>
              <div className="col-5">
                <div className="btn-bg">
                  <button className="button-points">
                    <img className="logo-points" src={logo} />
                    {userDetails?.userDetails?.stakingRewards}
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt10 cheap-stuff display-flex">
              <div className="col-7">
                <h4 className="textcolor">TASK TOKENS</h4>
              </div>
              <div className="col-5">
                <div className="btn-bg">
                  <button className="button-points">
                    <img className="logo-points" src={logo} />
                    {userDetails?.userDetails?.taskRewards?.taskPoints}
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt10 cheap-stuff display-flex">
              <div className="col-7">
                <h4 className="textcolor">Levelup TOKENS</h4>
              </div>
              <div className="col-5">
                <div className="btn-bg">
                  <button className="button-points">
                    <img className="logo-points" src={logo} />
                    {userDetails?.userDetails?.levelUpRewards}
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt10 cheap-stuff display-flex">
              <div className="col-7">
                <h4 className="textcolor">SPENDING TOKENS</h4>
              </div>
              <div className="col-5">
                <div className="btn-bg">
                  <button className="button-points">
                    <img className="logo-points" src={logo} />
                    {userDetails?.userDetails?.spendingRewards}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TotalPoints;
