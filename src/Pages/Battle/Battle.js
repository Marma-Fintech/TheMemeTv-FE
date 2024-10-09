import React, { useEffect } from "react";
import { useState } from "react";
// import cat from "../../assets/images/cat.png";
import "./Battle.css";
import help from "../../assets/images/help.svg";
import settings from "../../assets/images/settings.svg";
// import engimg from "../../assets/images/energy.svg";
import streak from "../../assets/images/streak.svg";
// import battle from "../../assets/images/battle1.png";
// import ProgressBar from "react-bootstrap/ProgressBar";
import DashedProgressBar from "../../components/dashedprogress/Dashedprogress";
import useUserInfo from "../../Hooks/useUserInfo";
import TotalPoints from "../TotalPoints/TotalPoints";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import Info from "../PhaseDetails/PhaseDetails";
import Stake from "../PhasePage/PhasePage";
import giantsquid from "../../assets/images/Giant Squid.png";
import squid from "../../assets/images/Collosal Squid.png";
import ostrich from "../../assets/images/Ostrich 2.png";
import horse from "../../assets/images/horse.png";
import dog from "../../assets/images/Dog.png";
import cat from "../../assets/images/Cat 2.png";
import fish from "../../assets/images/Gold fish 1.png";
import ant from "../../assets/images/Ant 2.png";
import housefly from "../../assets/images/House fly 2.png";
import fruitfly from "../../assets/images/Fruitfly.png";
import {
  UserDeatils,
  addWatchSeconds,
  getUserStreaks,
  calculateStreak,
  calculateStreakOfStreak,
  loginStreakRewardClaim,
  watchStreakRewardClaim,
  referStreakRewardClaim,
  taskStreakRewardClaim,
  multiStreakRewardClaim,
  streakOfStreakRewardClaim,
} from "../../apis/user";
const Battle = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();

  const streakData = async () => {
    const getStreakData = await getUserStreaks(
      userDetails?.userDetails?.telegramId
    );
    return getStreakData;
  };

  useEffect(() => {
    const res = streakData();
    console.log(JSON.stringify(res) + "oiuytrasdfghjk");
  }, []);

  const images = [
    { src: fruitfly, name: "Fruitfly" },
    { src: ant, name: "Ant" },
    { src: housefly, name: "Housefly" },
    { src: fish, name: "Goldfish" },
    { src: cat, name: "Cat" },
    { src: dog, name: "Dog" },
    { src: horse, name: "Horse" },
    { src: ostrich, name: "Ostrich" },
    { src: giantsquid, name: "Giant Squid" },
    { src: squid, name: "Collosal Squid" },
  ];

  const level = {
    1: 500,
    2: 10000,
    3: 50000,
    4: 200000,
    5: 800000,
    6: 3000000,
    7: 10000000,
    8: 25000000,
    9: 50000000,
    10: 80000000,
  };

  const goToThePage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: userDetails.currentComponent,
      lastComponentText: userDetails.currentComponentText,
      centerCount: userDetails.centerCount + 1,
    }));
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return Math.floor(num / 100000) / 10 + "M";
    if (num >= 1000) return Math.floor(num / 100) / 10 + "k";
    return num;
  };
  console.log(
    images[userDetails?.userDetails?.level] +
      "images[userDetails?.userDetails?.level - 1]"
  );
  return (
    <div className="info-img">
      <div
        className="menupointer"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop: "50px",
          justifyContent: "start",
          flexDirection: "column",
          pointerEvents: "all",
        }}
      >
        <div style={{ maxWidth: "390px" }}>
          <div className="row header">
            <div className="col-7">
              <div className="custom-shape" style={{ position: "relative" }}>
                <div className="row">
                  <div className="cat col-2">
                    <img
                      className="levelsec"
                      src={images[userDetails?.userDetails?.level - 1].src}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-3">
                    <h3 className="level-name">Cat</h3>
                  </div>
                  <div className="col-7">
                    {/* <h5 className="level-energy"><img src={engimg} />5000/5000</h5> */}
                    <h5
                      className="level-energy"
                      onClick={() => {
                        goToThePage(LeaderBoard, "LeaderBoardPage");
                      }}
                    >
                      PHASE 1
                    </h5>
                  </div>
                </div>
                <div className="row displayflex">
                  <div className="col-6 offset-2">
                    <h5 className="level-up">
                      {formatNumber(Number(watchScreen.totalReward))}/
                      {formatNumber(level[userDetails?.userDetails?.level + 1])}
                    </h5>
                  </div>
                  <div className="col-4">
                    <div className="level-up1">
                      <h3>LV1</h3>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{ marginTop: "-11px", marginLeft: "5px" }}
                >
                  <div className="col-12">
                    <DashedProgressBar
                      progress={Number(
                        (watchScreen.totalReward /
                          level[userDetails?.userDetails?.level + 1]) *
                          100
                      ).toFixed()}
                    />{" "}
                    {/* 50% progress */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 ml15">
              <h4
                className="phase2"
                onClick={() => {
                  goToThePage(Stake, "StakePage");
                }}
              >
                Stake
              </h4>
              <div className="info-new">
                <img
                  onClick={() => {
                    goToThePage(Info, "InfoPage");
                  }}
                  src={help}
                />
                <img src={settings} />
              </div>
            </div>
            <div className="align row">
              <div className="col-2">
                <h4 className="days-streak">84</h4>
              </div>
              <div className="col-3">
                <div>
                  <h4 className="streak-days">DAYS</h4>
                </div>
                <div className="streak-2">
                  <img src={streak} />
                </div>
              </div>
              <div className="col-7">
                <div className=" streak-border">
                  <div class="contain">
                    <p class="numbers">1</p>
                    <p class="numbers">2</p>
                    <p class="numbers">3</p>
                    <p class="numbers">4</p>
                    <p class="numbers">5</p>
                    <p class="numbers">6</p>
                    <p class="numbers">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Battle;
