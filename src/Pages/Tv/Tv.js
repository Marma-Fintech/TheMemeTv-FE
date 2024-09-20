import React, { useEffect, useState, useRef } from "react";
import "./Tv.css";
import settings from "../../assets/images/settings.png";
import help from "../../assets/images/help.png";
import memetv from "../../assets/images/meme-logo.svg";
import engimg from "../../assets/images/energy.svg";
import useUserInfo from "../../Hooks/useUserInfo";
import ProgressBar from "react-bootstrap/ProgressBar";
import marketPlack from "../../assets/images/marketPlace.svg";
import leaderBoarder from "../../assets/images/leaderBoard.svg";
import { addWatchSeconds } from "../../apis/user";
import { UserDeatils } from "../../apis/user";
import marketPlace from "../MarketPlace/marketPlace";
import TotalPoints from "../TotalPoints/TotalPoints";
import Phase from "../PhasePage/PhasePage";
import DoandEarn from "../DoEarn/DoEarn";
import Info from "../PhaseDetails/PhaseDetails";
import Streak from "../Streak/Streak";
import tapAudio from "../../assets/audio/tapSound.mp3";
import { FaChevronRight } from "react-icons/fa";
import clock from "../../assets/images/clock.svg";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import beatAudio from "../../assets/audio/MemetvAudio.mp3";
import inviteFriends from "../../assets/images/invitetv.svg";
import ReferPage from "../ReferPage/ReferPage";
import ConnectWalletImg from "../../assets/images/ConnectWalletImg.png";
import ConnectWallet from "../ConnectWallet/ConnectWallet";

const Tv = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const [secs, setSecs] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(
    userDetails.userDetails?.level
  );
  const watchScreenRef = useRef(watchScreen);
  const currentLevelRef = useRef(userDetails.userDetails?.level);

  const secsRef = useRef(secs);
  const secsOnlyRef = useRef(secs);

  const [tapPoints, setTapPoints] = useState(0);
  const tapPointsRef = useRef(tapPoints);
  const energy = useRef(5000);
  const [energyy, SetEnergy] = useState(5000);
  const [boosterPoints, setBoosterPoints] = useState(0);
  const boosterPointsRef = useRef(boosterPoints);
  const tapSound = new Audio(tapAudio);

  const audioRef = useRef(new Audio(beatAudio));

  useEffect(() => {
    // Set the volume low
    audioRef.current.loop = true;
    audioRef.current.volume = 0.1;
    // Function to control audio based on visibility
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    };
    // Play audio when the component mounts
    audioRef.current.play();
    // Event listeners for tab changes and window close
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", () => audioRef.current.pause());
    return () => {
      // Cleanup listeners and pause audio when the component unmounts
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", () =>
        audioRef.current.pause()
      );
      audioRef.current.pause();
    };
  }, []);
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

  const intervalRef = useRef(null);
  const [tapAnimations, setTapAnimations] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("energyDetails");
    const storedData1 = localStorage.getItem("watchStreak");
    const parsedData1 = storedData1 ? JSON.parse(storedData1) : 0;

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const storedDate = new Date(parsedData.date);
        const currentDate = new Date();
        const timeDifferenceInSeconds = Math.floor(
          (currentDate - storedDate) / 1000
        );
        const energyIncrement = timeDifferenceInSeconds;
        const newEnergy = parsedData.energy + energyIncrement;
        if (newEnergy > 5000) {
          SetEnergy(5000);
          energy.current = 5000;
        } else {
          SetEnergy(newEnergy.toFixed());
          energy.current = newEnergy.toFixed();
        }
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }

    intervalRef.current = setInterval(() => {
      localStorage.setItem(
        "pointDetails",
        JSON.stringify({
          // totalReward: totalRewardPoints,
          tapPoints: tapPointsRef.current,
          watchSec: secsOnlyRef.current,
          boosterPoints: boosterPointsRef.current,
          booster: [watchScreenRef.current.boosterDetails.name],
        })
      );

      localStorage.setItem(
        "watchStreak",
        JSON.stringify({
          // totalReward: totalRewardPoints,
          watchSec:
            parsedData1 && parsedData1 !== 0
              ? parsedData1?.watchSec + secsOnlyRef.current
              : secsOnlyRef.current,
        })
      );

      secsOnlyRef.current = secsOnlyRef.current + 1;
      if (energy.current < 5000) {
        SetEnergy((prev) => {
          return Number(prev) + 1;
        });
        energy.current = Number(energy.current) + 1;
      }
      const values = {
        levelUp: currentLevelRef.current + 1,
        "2x": currentLevelRef.current * 2,
        "3x": currentLevelRef.current * 3,
        "5x": currentLevelRef.current * 5,
      };
      if (
        watchScreenRef.current?.boosterDetails?.name === "levelUp" ||
        watchScreenRef.current?.boosterDetails?.name === "2x" ||
        watchScreenRef.current?.boosterDetails?.name === "3x" ||
        watchScreenRef.current?.boosterDetails?.name === "5x"
      ) {
        setBoosterPoints(
          (prevBoosterPoints) =>
            prevBoosterPoints +
            values[watchScreenRef.current?.boosterDetails?.name]
        );
        boosterPointsRef.current +=
          values[watchScreenRef.current?.boosterDetails?.name];
      } else {
        setSecs((prevSecs) => {
          const newSecs = prevSecs + currentLevelRef.current;
          secsRef.current = newSecs;
          return newSecs;
        });
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
      localStorage.setItem(
        "energyDetails",
        JSON.stringify({
          energy: energy.current,
          date: new Date(),
        })
      );
      addTotalPoints();
    };
  }, []);

  const goToTheRefererPage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: userDetails.userDetails.currentComponent,
      lastComponentText: userDetails.userDetails.currentComponentText,
      refererCount: userDetails.userDetails.refererCount + 1,
    }));
  };

  const addTotalPoints = () => {
    const totalRewardPoints =
      Number(watchScreen.totalReward) +
      Number(secsRef.current) +
      Number(tapPointsRef.current) +
      Number(boosterPointsRef.current);

    updatewatchScreenInfo((prev) => ({
      ...prev,
      totalReward: totalRewardPoints,
      tapPoints: watchScreen.tapPoints + tapPointsRef.current,
      watchSec: watchScreen.watchSec + secsOnlyRef.current,
      boosterPoints: watchScreen.boosterPoints + boosterPointsRef.current,
    }));
  };

  const addWatchSecapi = async (data) => {
    const res = await addWatchSeconds(data);
    localStorage.setItem(
      "pointDetails",
      JSON.stringify({
        // totalReward: totalRewardPoints,
        tapPoints: 0,
        watchSec: 0,
        boosterPoints: 0,
        booster: [0],
      })
    );
    updatewatchScreenInfo((prev) => ({
      ...prev,
      totalReward: res.totalRewards,
      tapPoints: 0,
      booster: false,
      boosterSec: 0,
      boosterPoints: 0,
      boosterDetails: {},
      watchSec: 0,
      updatedWatchPoints: res?.watchRewards,
    }));
  };

  const addWatchSecapiMarket = async (data) => {
    const res = await addWatchSeconds(data);
    localStorage.setItem(
      "pointDetails",
      JSON.stringify({
        tapPoints: 0,
        watchSec: 0,
        boosterPoints: 0,
        booster: [0],
      })
    );
    updatewatchScreenInfo((prev) => ({
      ...prev,
      totalReward: res.totalRewards,
      tapPoints: 0,
      booster: false,
      boosterSec: 0,
      boosterPoints: 0,
      boosterDetails: {},
      watchSec: 0,
      updatedWatchPoints: res?.watchRewards,
    }));
    if (res) {
      goToThePage(marketPlace, "marketPlace");
    }
  };

  const addWatchSecapiTotal = async (data) => {
    clearInterval(intervalRef.current);
    const res = await addWatchSeconds(data);
    localStorage.setItem(
      "pointDetails",
      JSON.stringify({
        tapPoints: 0,
        watchSec: 0,
        boosterPoints: 0,
        booster: [0],
      })
    );
    updatewatchScreenInfo((prev) => ({
      ...prev,
      // totalReward: res.totalRewards,
      tapPoints: 0,
      booster: false,
      boosterSec: 0,
      boosterPoints: 0,
      boosterDetails: {},
      watchSec: 0,
      updatedWatchPoints: res?.watchRewards,
      allrewards: res.totalRewards,
    }));
    if (res) {
      setTimeout(() => {
        goToThePage(TotalPoints, "TotalPoints");
      }, 500);
    }
  };

  const addWatchSecapiStake = async (data) => {
    const res = await addWatchSeconds(data);

    localStorage.setItem(
      "pointDetails",
      JSON.stringify({
        tapPoints: 0,
        watchSec: 0,
        boosterPoints: 0,
        booster: [0],
      })
    );
    updatewatchScreenInfo((prev) => ({
      ...prev,
      totalReward: res?.totalRewards ? res?.totalRewards : 0,
      tapPoints: 0,
      booster: false,
      boosterSec: 0,
      boosterPoints: 0,
      boosterDetails: {},
      watchSec: 0,
      updatedWatchPoints: res?.watchRewards ? res?.watchRewards : 0,
    }));
    if (res) {
      goToThePage(Phase, "Phase");
    }
  };

  useEffect(() => {
    Object.keys(level).forEach((lvl) => {
      if (
        Number(watchScreen?.totalReward + secs + tapPoints + boosterPoints) >=
        Number(level[lvl])
      ) {
        setCurrentLevel(Number(lvl));
        currentLevelRef.current = Number(lvl);
      }
    });
  }, [tapPoints, secs]);

  useEffect(() => {
    watchScreenRef.current = watchScreen;

    if (watchScreen.booster && watchScreen.boosterSec === 0) {
      var data = {};
      if (watchScreen.booster) {
        data = {
          telegramId: userDetails.userDetails?.telegramId,
          userWatchSeconds: watchScreen.watchSec + secsRef.current,
          boosterPoints: String(
            watchScreen.tapPoints +
              tapPointsRef.current +
              watchScreen.boosterPoints +
              boosterPointsRef.current
          ),
          boosters: [watchScreen.boosterDetails.name],
        };
      } else {
        data = {
          telegramId: userDetails.userDetails?.telegramId,
          userWatchSeconds: watchScreen.watchSec + secsRef.current,
          boosterPoints: String(
            watchScreen.tapPoints +
              tapPointsRef.current +
              watchScreen.boosterPoints +
              boosterPointsRef.current
          ),
        };
      }

      addWatchSecapi(data);
    }
  }, [watchScreen, secs]);

  const formatNumber = (num) => {
    if (num >= 1000000) return Math.floor(num / 100000) / 10 + "M";
    if (num >= 1000) return Math.floor(num / 100) / 10 + "k";
    return num;
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
  const [lastInputWasTouch, setLastInputWasTouch] = useState(false);

  const handleTap = (e) => {
    if (energy.current > 5) {
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
      // Determine if the event is from a touch or mouse
      const isTouchEvent = e.type === "touchstart";
      // If it's a touch event, mark it as touch
      if (isTouchEvent) {
        setLastInputWasTouch(true);
      } else if (lastInputWasTouch && !isTouchEvent) {
        // If the last input was a touch and now it's a click, ignore it
        return;
      }
      tapSound.play();
      const touches = e.touches
        ? Array.from(e.touches)
        : [{ clientX: e.clientX, clientY: e.clientY }];
      let num = 5;
      if (watchScreen?.boosterDetails?.name === "tap" && watchScreen?.booster) {
        num = 10;
        setBoosterPoints((prevBoosterPoints) => {
          const newBoosterPoints = prevBoosterPoints + num * touches.length;
          boosterPointsRef.current = newBoosterPoints;
          return newBoosterPoints;
        });
      } else {
        if (energyy > 0) {
          const totalPoints = Math.min(energyy, num * touches.length);
          setTapPoints((prevTapPoints) => {
            const newTapPoints = prevTapPoints + totalPoints;
            tapPointsRef.current = newTapPoints;
            return newTapPoints;
          });
          SetEnergy((prev) => {
            const newEnergy = prev - totalPoints;
            energy.current = newEnergy;
            return newEnergy;
          });
        }
      }
      const newAnimations = touches.map((touch) => ({
        id: Date.now() + Math.random(),
        x: touch.clientX,
        y: touch.clientY,
      }));
      setTapAnimations((prev) => [...prev, ...newAnimations]);
      setTimeout(() => {
        setTapAnimations((prev) =>
          prev.filter((animation) => !newAnimations.includes(animation))
        );
      }, 1000);
    }
  };

  return (
    <div
      className="tvContainer menupointer"
      style={{ height: "100%", width: "100%" }}
    >
      <div className="line arrow"></div>
      <div className="row level-div text-center">
        <div className="col-6">
          <div className="level-h2">
            <h2
              onClick={() => {
                goToThePage(LeaderBoard, "LeaderBoard");
              }}
              className="level"
            >
              Level {currentLevel} &nbsp;
              {formatNumber(
                Number(watchScreen.totalReward) +
                  Number(secs) +
                  Number(tapPoints) +
                  Number(boosterPoints)
              )}
              /{formatNumber(level[currentLevel + 1])}
            </h2>

            <div style={{ height: "10px", marginBottom: "10px" }}>
              <ProgressBar style={{ height: "10px" }}>
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
              </ProgressBar>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="level-h2">
            <h2 className="energy">
              <img src={engimg} style={{ paddingRight: "3px" }} />
              Energy {energy.current}/5000
            </h2>
            <div style={{ height: "10px", marginBottom: "10px" }}>
              <ProgressBar style={{ height: "10px" }}>
                <ProgressBar now={(energy.current / 5000) * 100} key={1} />
              </ProgressBar>
            </div>
          </div>
        </div>
        <div className="row streak-center">
          <div
            onClick={() => {
              if (!watchScreen.booster) {
                goToThePage(Info, "Info");
              }
            }}
            className="col-2 text-center"
          >
            <img src={help} alt="Help" />
          </div>
          <div className="col-8 streak-border">
            <div className="row text-center phase1">
              <div className="col-5">
                <h2
                  onClick={() => {
                    if (!watchScreen.booster) {
                      goToThePage(Streak, "Streak");
                    }
                  }}
                  className="streak"
                >
                  {" "}
                  STREAK <FaChevronRight style={{ fontSize: "12px" }} />
                </h2>
              </div>
              <div className="col-2 phase-p">
                P{userDetails?.userDetails?.currentPhase}
              </div>
              <div
                className="col-5"
                onClick={() => {
                  if (!watchScreen.booster) {
                    var data = {
                      telegramId: userDetails.userDetails.telegramId,
                      userWatchSeconds: secsRef.current,
                      boosterPoints: String(
                        tapPointsRef.current + boosterPointsRef.current
                      ),
                    };
                    addWatchSecapiStake(data);
                  }
                }}
              >
                <h2 className="streak">
                  {" "}
                  STAKE <FaChevronRight style={{ fontSize: "12px" }} />{" "}
                </h2>
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              if (!watchScreen.booster) {
                goToThePage(ConnectWallet, "ConnectWallet");
              }
            }}
            className="col-2 text-center"
          >
            <img
              src={ConnectWalletImg}
              alt="ConnectWallet"
              className="wallet-image"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <div className="token-div">
              <p className="token-mint">Token Mint</p>
              <p className="earn-p">
                {watchScreen?.boosterDetails?.name === "levelUp"
                  ? currentLevel + 1
                  : watchScreen?.boosterDetails?.name === "2x"
                  ? currentLevel * 2
                  : watchScreen?.boosterDetails?.name === "3x"
                  ? currentLevel * 3
                  : watchScreen?.boosterDetails?.name === "5x"
                  ? currentLevel * 5
                  : currentLevel}
                /Sec
              </p>
            </div>
          </div>
          <div
            className="col-8 points"
            onClick={() => {
              if (!watchScreen.booster) {
                var data = {
                  telegramId: userDetails.userDetails.telegramId,
                  userWatchSeconds: secsRef.current,
                  boosterPoints: String(
                    tapPointsRef.current + boosterPointsRef.current
                  ),
                };
                addWatchSecapiTotal(data);
              }
            }}
          >
            <h2>
              <img src={memetv} alt="Meme TV" />
              <span className="txt-color ml-10">
                {watchScreen.totalReward +
                  secsRef.current +
                  tapPoints +
                  boosterPoints}
              </span>
            </h2>
          </div>
          <div className="col-2">
            <div className="token-div">
              <p className="token-mint1">Earn / tap</p>
              <p className="earn-p">
                {watchScreen.boosterDetails.name === "tap" ? 10 : 5}
              </p>
            </div>
          </div>
        </div>
        <div className="row streak-center" style={{ marginTop: "5px" }}>
          <div
            className="col-2 text-center"
            onClick={() => {
              if (!watchScreen.booster) {
                goToTheRefererPage(ReferPage, "ReferPage");
              }
            }}
          >
            <img src={inviteFriends} alt="Settings" />
          </div>

          <div className="col-8 text-c">
            <div className="">
              <div className="col-9">
                {watchScreen.booster ? (
                  <>
                    <h2
                      className="streak booster"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={clock}
                        style={{ paddingRight: "5px", width: "20px" }}
                      />
                      {watchScreen.boosterSec}
                    </h2>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className="col-2 text-center"
            onClick={() => {
              if (!watchScreen.booster) {
                goToThePage(DoandEarn, "DoandEarn");
              }
            }}
          >
            <img src={leaderBoarder} alt="Help" />
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{ height: "500px" }}
        onTouchStart={handleTap}
        onMouseDown={handleTap}
      >
        <div className="col-12">
          <div className="floor"></div>
          <img
            src="https://i.imgur.com/pXALzSc.gif"
            className="woot-dance"
            width="328"
            height="272"
            alt="8-bit dancing Karateka guy"
          />
          {tapAnimations.map((animation) => (
            <div
              key={animation.id}
              className="tap-points txt-color"
              style={{ left: animation.x, top: animation.y }}
            >
              +{watchScreen.boosterDetails.name === "tap" ? 10 : 5}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tv;
