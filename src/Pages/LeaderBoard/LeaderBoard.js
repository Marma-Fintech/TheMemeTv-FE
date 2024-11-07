import React, { useEffect, useRef, useState } from "react";
import "./LeaderBoard.css";
import giantsquid from "../../assets/images/Giant Squid.svg";
import squid from "../../assets/images/Collosal Squid.svg";
import ostrich from "../../assets/images/Ostrich 3.svg";
import horse from "../../assets/images/Horse 1.svg";
import dog from "../../assets/images/Dog.svg";
import cat from "../../assets/images/Cat 3.svg";
import fish from "../../assets/images/Gold fish 2.svg";
import ant from "../../assets/images/Ant 3.svg";
import housefly from "../../assets/images/House fly 3.svg";
import fruitfly from "../../assets/images/House fly 4.svg";
import leftArrow from "../../assets/images/leftarrowBoard.png";
import rightArrow from "../../assets/images/rightarrowBoard.png";
import useUserInfo from "../../Hooks/useUserInfo";
import ProgressBar from "react-bootstrap/esm/ProgressBar";
import youtube from "../../assets/images/youtube.svg";
import logo from "../../assets/images/meme-logo.svg";
import cancelIcon from "../../../src/assets/Task/cancelicon.png";
import { getPopularUser } from "../../apis/user";
import Tv from "../Tv/Tv";
import axios from "axios";
import DashedProgressBar from "../../components/dashedprogress/Dashedprogress";

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
const LeaderBoard = ({ telegramId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const [currentLevel, setCurrentLevel] = useState(
    userDetails.userDetails?.level
  );
  const [secs, setSecs] = useState(0);
  const [tapPoints, setTapPoints] = useState(0);
  const tapPointsRef = useRef(tapPoints);
  const [boosterPoints, setBoosterPoints] = useState(0);
  const boosterPointsRef = useRef(boosterPoints);
  const currentLevelRef = useRef(userDetails.userDetails?.level);
  const [topUsers, setTopUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  useEffect(() => {
    // Function to fetch the leaderboard data
    const fetchLeaderboardData = async () => {
      try {
        // Replace the URL with your actual backend endpoint
        const response = await getPopularUser(
          userDetails.userDetails.telegramId
        );
        // Update the state with the data
        setTopUsers(response.topUsers);
        setUserDetail(response.yourDetail);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };
    fetchLeaderboardData();
  }, [telegramId]);
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
      currentComponentText: "TVPage",
      lastComponent: userDetails.currentComponent,
      lastComponentText: userDetails.currentComponentText,
      centerCount: userDetails.centerCount + 1,
      isMenu: false,
    }));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setCurrentLevel(currentLevel + 1);
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    setCurrentLevel(currentLevel - 1);
  };
  const formatNumber = (num) => {
    if (num >= 1000000) return Math.floor(num / 100000) / 10 + "M";
    if (num >= 1000) return Math.floor(num / 100) / 10 + "k";
    return num;
  };
  return (
    <div className="carousel-container">
      <img
        onClick={() => {
          goToThePage(Tv, "Tv");
        }}
        src={cancelIcon}
        className="cancel-imgleaderboard"
        style={{ cursor: "pointer" }}
      />
      <div>
        <button
          className="carousel-button prev"
          onClick={() => {
            if (currentLevel !== 1) {
              handlePrev();
            }
          }}
        >
          <img src={leftArrow} alt="Previous" />
        </button>
        <div className="carousel-content">
          <div className="carousel-image">
            <img src={images[currentLevel - 1]?.src} alt="carousel" />
          </div>
          <div className="carousel-captions">
            {images[currentLevel - 1]?.name}
          </div>
        </div>
        <button
          className="carousel-button next"
          onClick={() => {
            if (currentLevel !== 10) {
              handleNext();
            }
          }}
        >
          <img src={rightArrow} alt="Next" />
        </button>
        <div className="col-12">
          <div className="level-h2 text-center">
            {currentLevel === 10 ? null : (
              <h2 className="level">
                Level {currentLevel} &nbsp;
                {formatNumber(
                  Number(watchScreen.totalReward) +
                    Number(secs) +
                    Number(tapPoints) +
                    Number(boosterPoints)
                )}
                /{formatNumber(level[currentLevel + 1])}
              </h2>
            )}
            <div style={{ height: "10px", marginBottom: "10px" }}>
              {/* <ProgressBar style={{ height: "10px" }}>
                <ProgressBar
                  variant="warning"
                  now={Number(
                    ((watchScreen.totalReward +
                      secs +
                      tapPoints +
                      Number(boosterPoints)) /
                      level[currentLevel + 1]) *
                      100
                  ).toFixed()}
                  key={1}
                />
              </ProgressBar> */}

              <DashedProgressBar
                dashcolor={"lightgreen"}
                lengthColor={"lightgreen"}
                progress={Number(
                  ((watchScreen.totalReward +
                    secs +
                    tapPoints +
                    Number(boosterPoints)) /
                    level[currentLevel + 1]) *
                    100
                ).toFixed()}
              />
            </div>
            <h3 className="leaderboard-text">LEADERBOARD</h3>
          </div>
          <div className="cheap-stuff-container">
            <div className="row mt0 cheap-stuff1" style={{ width: "100%" }}>
              <div className="col-9 stuff-text1 leader-color">
                <h4>{userDetail?.name}</h4>
                <p className="stuff-p">
                  <img src={logo} className="w20" />
                  <span>{userDetail?.totalRewards}</span>
                </p>
              </div>
              <div className="col-3">
                <div className="rankbg">
                  <h3>{userDetail?.rank}</h3>
                </div>
              </div>
            </div>
            {topUsers.map((item, index) => {
              return (
                userDetail.rank !== item.rank && (
                  <div className="row cheap-stuff1" style={{ width: "100%" }}>
                    <div className="col-9 stuff-text1 leader-color">
                      <h4>{item?.name}</h4>
                      <p className="stuff-p">
                        <img src={logo} className="w20" />{" "}
                        <span>{item?.totalRewards} </span>
                      </p>
                    </div>
                    <div className="col-3 rankbg">
                      <h3>{item?.rank}</h3>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeaderBoard;
