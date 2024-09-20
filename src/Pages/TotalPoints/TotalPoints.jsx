import React, { useEffect, useRef, useState } from "react";
import cancelIcon from "../../../src/assets/Task/cancelicon.png";
import useUserInfo from "../../Hooks/useUserInfo";
import logo from "../../assets/images/meme-logo.svg";
import Tv from "../Tv/Tv";
import "./TotalPoints.css";
import { UserDeatils } from "../../apis/user";

const TotalPoints = () => {
  const { userDetails, updatewatchScreenInfo, updateUserInfo, watchScreen } =
    useUserInfo();
  const goToThePage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: "TVPage",
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
        userDetails,
      }));

      updatewatchScreenInfo((prev) => ({
        ...prev,
        boostersList: userDetails?.boosters,
      }));
    };
    const data1 = {
      name: userDetails?.userDetails?.name,
      telegramId: String(userDetails?.userDetails?.telegramId),
    };

    getUserDetails(data1);
  }, []);

  return (
    <>
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
              <h4 className="totalPointsText">Total Rewards</h4>
              <div>
                <p className="rewardstext pb0">
                  <img src={logo} /> {watchScreen.allrewards}
                </p>
              </div>
            </div>
          </div>
          <div className="row mt10 cheap-stuff display-flex">
            <div className="col-7">
              <h4 className="textcolor">WATCH POINTS</h4>
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
              <h4 className="textcolor">REFERRAL POINTS</h4>
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
              <h4 className="textcolor">STREAK POINTS</h4>
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
              <h4 className="textcolor">GAMING POINTS</h4>
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
              <h4 className="textcolor">STAKING POINTS</h4>
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
              <h4 className="textcolor">TASK POINTS</h4>
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
        </div>
      </div>
    </>
  );
};
export default TotalPoints;
