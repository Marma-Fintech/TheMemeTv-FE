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
import karathe from "../../assets/images/karath.webp";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import beatAudio from "../../assets/audio/MemetvAudio.mp3";
import inviteFriends from "../../assets/images/invitetv.svg";
import ReferPage from "../ReferPage/ReferPage";
import ConnectWalletImg from "../../assets/images/ConnectWalletImg.png";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import animepic from "../../assets/images/animepic.svg";
import cancelIcon from "../../assets/Task/cancelicon.png";
// import weekRewards from "../../apis/user/weekRewards";
import { debounce } from "lodash";
import wallet from "../../assets/images/wallet.svg";
import DashedProgressBar from "../../components/dashedprogress/Dashedprogress";
import twox from "../../assets/images/2X.png";
import mask from "../../assets/images/mask.webp";

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

  // const audioRef = useRef(new Audio(beatAudio));
  const [isLoading, setIsLoading] = useState(false);
  const [isTutorial, setIsTutorial] = useState(false);
  const [showInstructions, setShowInstructions] = useState("");

  const handleClick = () => {
    if (watchScreen.booster) {
      // Show instructions when booster is true
      setShowInstructions(true);

      // Automatically hide instructions after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setShowInstructions(false);
      }, 3000);
    }
  };

  useEffect(() => {
    console.log(JSON.stringify(watchScreen.booster) + "watchScreenwatchScreen");
    // Function to start the counter
    // const startCounter = () => {
    //   if (!intervalRef.current) {
    //     console.log("App is in the foreground, starting counter...");
    //     intervalRef.current = setInterval(() => {
    //       setCount((prevCount) => prevCount + 1);
    //     }, 1000); // Increment the counter every second
    //   }
    // };

    // Function to pause the counter
    // const pauseCounter = () => {
    //   if (intervalRef.current) {
    //     console.log("App went to the background, pausing counter...");
    //     clearInterval(intervalRef.current); // Clear the interval to pause counting
    //     intervalRef.current = null; // Reset the ref
    //   }
    // };

    // Add event listeners for window focus and blur
    // window.addEventListener("focus", startCounter);
    // window.addEventListener("blur", pauseCounter);

    // // Start the counter when the app first loads
    // startCounter();

    // Cleanup event listeners and stop the counter when the component unmounts
    return () => {
      // window.removeEventListener("focus", startCounter);
      // window.removeEventListener("blur", pauseCounter);
      // pauseCounter(); // Clear the interval when the component is unmounted
    };
  }, [watchScreen]);

  useEffect(() => {
    // Function to start the counter
    const startCounter = () => {
      // if (!intervalRef.current) {
      //   intervalRef.current = setInterval(() => {
      //     setCount((prevCount) => prevCount + 1);
      //   }, 1000); // Increment the counter every second
      // }
    };

    // Function to pause the counter
    const pauseCounter = () => {
      // if (intervalRef.current) {
      console.log("App went to the background, pausing counter...");
      //   clearInterval(intervalRef.current); // Clear the interval to pause counting
      //   intervalRef.current = null; // Reset the ref
      // }
    };

    // Add event listeners for window focus and blur
    window.addEventListener("focus", startCounter);
    window.addEventListener("blur", pauseCounter);

    // // Start the counter when the app first loads
    startCounter();
    // Cleanup event listeners and stop the counter when the component unmounts
    return () => {
      window.removeEventListener("focus", startCounter);
      window.removeEventListener("blur", pauseCounter);
      pauseCounter(); // Clear the interval when the component is unmounted
    };
  }, []);

  useEffect(() => {
    // audioRef.current.loop = true;
    // audioRef.current.volume = 0.1;
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        console.log("hidden");
        clearInterval(intervalRef.current);
        // audioRef.current.pause();
      } else {
        console.log("visible");
        console.log("App is in the foreground, starting counter...");
        const storedData1 = localStorage.getItem("watchStreak");
        const parsedData1 = JSON.parse(storedData1);
        const storedData = localStorage.getItem("energyDetails");

        const parsedData = JSON.parse(storedData);
        const storedDate = new Date(parsedData.date);

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
                parsedData1 &&
                parsedData1.date ===
                  new Date(userDetails?.userDetails?.lastLogin).getDate()
                  ? parsedData1?.watchSec + secsOnlyRef.current
                  : secsOnlyRef.current,
              // date: new Date(userDetails?.userDetails?.lastLogin).getDate(),
              // date: new Date().getDate(),
              date: new Date(userDetails?.userDetails?.lastLogin).getDate(),
              updated: parsedData1?.updated ? parsedData1?.updated : false,
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
        // audioRef.current.play();
      }
    };
    // audioRef.current.play();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    // window.addEventListener("beforeunload", () => audioRef.current.pause());

    const storedData = localStorage.getItem("tutorial");
    const data = JSON.parse(storedData);
    if (data && data.watched) {
      updateUserInfo((prev) => ({
        ...prev,
        isTutorial: false,
      }));
    }

    return () => {
      // Cleanup listeners and pause audio when the component unmounts
      // document.removeEventListener("visibilitychange", handleVisibilityChange);
      // audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    const storedData1 = localStorage.getItem("watchStreak");
    const parsedData1 = JSON.parse(storedData1);
    const storedData = localStorage.getItem("energyDetails");

    const parsedData = JSON.parse(storedData);

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
            parsedData1 &&
            parsedData1.date ===
              new Date(userDetails?.userDetails?.lastLogin).getDate()
              ? parsedData1?.watchSec + secsOnlyRef.current
              : secsOnlyRef.current,
          // date: new Date(userDetails?.userDetails?.lastLogin).getDate(),
          // date: new Date().getDate(),
          date: new Date(userDetails?.userDetails?.lastLogin).getDate(),
          updated: parsedData1?.updated ? parsedData1?.updated : false,
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
    const parsedData1 = JSON.parse(storedData1);

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

    // intervalRef.current = setInterval(() => {
    //   localStorage.setItem(
    //     "pointDetails",
    //     JSON.stringify({
    //       // totalReward: totalRewardPoints,
    //       tapPoints: tapPointsRef.current,
    //       watchSec: secsOnlyRef.current,
    //       boosterPoints: boosterPointsRef.current,
    //       booster: [watchScreenRef.current.boosterDetails.name],
    //     })
    //   );

    //   localStorage.setItem(
    //     "watchStreak",

    //     JSON.stringify({
    //       // totalReward: totalRewardPoints,

    //       watchSec:
    //         parsedData1 &&
    //         parsedData1.date ===
    //           new Date(userDetails?.userDetails?.lastLogin).getDate()
    //           ? parsedData1?.watchSec + secsOnlyRef.current
    //           : secsOnlyRef.current,
    //       // date: new Date(userDetails?.userDetails?.lastLogin).getDate(),
    //       // date: new Date().getDate(),
    //       date: new Date(userDetails?.userDetails?.lastLogin).getDate(),
    //       updated: parsedData1?.updated ? parsedData1?.updated : false,
    //     })
    //   );

    //   secsOnlyRef.current = secsOnlyRef.current + 1;
    //   if (energy.current < 5000) {
    //     SetEnergy((prev) => {
    //       return Number(prev) + 1;
    //     });
    //     energy.current = Number(energy.current) + 1;
    //   }
    //   const values = {
    //     levelUp: currentLevelRef.current + 1,
    //     "2x": currentLevelRef.current * 2,
    //     "3x": currentLevelRef.current * 3,
    //     "5x": currentLevelRef.current * 5,
    //   };
    //   if (
    //     watchScreenRef.current?.boosterDetails?.name === "levelUp" ||
    //     watchScreenRef.current?.boosterDetails?.name === "2x" ||
    //     watchScreenRef.current?.boosterDetails?.name === "3x" ||
    //     watchScreenRef.current?.boosterDetails?.name === "5x"
    //   ) {
    //     setBoosterPoints(
    //       (prevBoosterPoints) =>
    //         prevBoosterPoints +
    //         values[watchScreenRef.current?.boosterDetails?.name]
    //     );
    //     boosterPointsRef.current +=
    //       values[watchScreenRef.current?.boosterDetails?.name];
    //   } else {
    //     setSecs((prevSecs) => {
    //       const newSecs = prevSecs + currentLevelRef.current;
    //       secsRef.current = newSecs;
    //       return newSecs;
    //     });
    //   }
    // }, 1000);

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
    setIsLoading(true);
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
    setIsLoading(true);
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

  const addWatchSecapiStreak = async (data) => {
    setIsLoading(true);
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
        goToThePage(Streak, "Streak");
      }, 500);
    }
  };

  const addWatchSecapihelp = async (data) => {
    // setIsLoading(true);
    // clearInterval(intervalRef.current);
    // const res = await addWatchSeconds(data);
    // localStorage.setItem(
    //   "pointDetails",
    //   JSON.stringify({
    //     tapPoints: 0,
    //     watchSec: 0,
    //     boosterPoints: 0,
    //     booster: [0],
    //   })
    // );
    // updatewatchScreenInfo((prev) => ({
    //   ...prev,
    //   // totalReward: res.totalRewards,
    //   tapPoints: 0,
    //   booster: false,
    //   boosterSec: 0,
    //   boosterPoints: 0,
    //   boosterDetails: {},
    //   watchSec: 0,
    //   updatedWatchPoints: res?.watchRewards,
    //   allrewards: res.totalRewards,
    // }));
    // if (res) {
    //   setTimeout(() => {
    //     // goToThePage(Streak, "Streak");
    //     goToThePage(Info, "Info");
    //   }, 500);
    // }

    updateUserInfo((prev) => ({
      ...prev,
      // currentComponent: component,
      // currentComponentText: name,
      // lastComponent: userDetails.currentComponent,
      // lastComponentText: userDetails.currentComponentText,
      // centerCount: userDetails.centerCount + 1,
      isTutorial: true,
    }));

    // setIsTutorial(true);
  };

  useEffect(() => {
    const data = localStorage.getItem("tutorial");
    const parsedData = JSON.parse(data);
    if (parsedData?.watched) {
      setIsTutorial(false);
    } else {
      setIsTutorial(true);
    }
  }, []);

  const addWatchSecapiwallet = async (data) => {
    setIsLoading(true);
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
        goToThePage(ConnectWallet, "ConnectWallet");
      }, 500);
    }
  };

  const addWatchSecapirefer = async (data) => {
    setIsLoading(true);
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
        goToTheRefererPage(ReferPage, "ReferPage");
      }, 500);
    }
  };

  const addWatchSecapicheap = async (data) => {
    setIsLoading(true);
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
        goToThePage(DoandEarn, "DoandEarn");
      }, 500);
    }
  };

  const addWatchSecapiStake = async (data) => {
    setIsLoading(true);
    const res = await addWatchSeconds(data);
    // const res1 = await weekRewards(data);

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
      // stakeDetails: res1,
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

  // const handleTap = (e) => {
  //   if (energy.current > 5) {
  //     // if (navigator.vibrate) {
  //     //   navigator.vibrate(100);
  //     // }
  //     // Determine if the event is from a touch or mouse
  //     // const isTouchEvent = e.type === "touchstart";
  //     // If it's a touch event, mark it as touch
  //     // if (isTouchEvent) {
  //     //   setLastInputWasTouch(true);
  //     // } else if (lastInputWasTouch && !isTouchEvent) {
  //     //   // If the last input was a touch and now it's a click, ignore it
  //     //   return;
  //     // }
  //     tapSound.play();
  //     const touches = e.touches
  //       ? Array.from(e.touches)
  //       : [{ clientX: e.clientX, clientY: e.clientY }];
  //     let num = 5;
  //     if (watchScreen?.boosterDetails?.name === "tap" && watchScreen?.booster) {
  //       num = 10;
  //       setBoosterPoints((prevBoosterPoints) => {
  //         const newBoosterPoints = prevBoosterPoints + num * touches.length;
  //         boosterPointsRef.current = newBoosterPoints;
  //         return newBoosterPoints;
  //       });
  //     } else {
  //       if (energyy > 0) {
  //         const totalPoints = Math.min(energyy, num * touches.length);
  //         setTapPoints((prevTapPoints) => {
  //           const newTapPoints = prevTapPoints + totalPoints;
  //           tapPointsRef.current = newTapPoints;
  //           return newTapPoints;
  //         });
  //         SetEnergy((prev) => {
  //           const newEnergy = prev - totalPoints;
  //           energy.current = newEnergy;
  //           localStorage.setItem(
  //             "energyDetails",
  //             JSON.stringify({
  //               energy: newEnergy,
  //               date: new Date(),
  //             })
  //           );
  //           return newEnergy;
  //         });
  //       }
  //     }
  //     // const newAnimations = touches.map((touch) => ({
  //     //   id: Date.now() + Math.random(),
  //     //   x: touch.clientX,
  //     //   y: touch.clientY,
  //     // }));
  //     // setTapAnimations((prev) => [...prev, ...newAnimations]);
  //     // setTimeout(() => {
  //     //   setTapAnimations((prev) =>
  //     //     prev.filter((animation) => !newAnimations.includes(animation))
  //     //   );
  //     // }, 1000);
  //   }
  // };

  const handleTap = (e) => {
    if (energy.current <= 5) return;
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    // tapSound.play();

    // Extract touch points or use mouse event coordinates
    const touches = e.touches
      ? Array.from(e.touches)
      : [{ clientX: e.clientX, clientY: e.clientY }];

    // Define the base points per tap
    const basePoints =
      watchScreen?.boosterDetails?.name === "tap" && watchScreen?.booster
        ? 10
        : 5;

    // Calculate tap points based on energy left
    if (energyy > 0) {
      const totalPoints = Math.min(energyy, basePoints * touches.length);

      // Update tap points
      setTapPoints((prevTapPoints) => {
        const newTapPoints = prevTapPoints + totalPoints;
        tapPointsRef.current = newTapPoints;
        return newTapPoints;
      });

      // Update energy
      SetEnergy((prevEnergy) => {
        const newEnergy = prevEnergy - totalPoints;
        energy.current = newEnergy;
        localStorage.setItem(
          "energyDetails",
          JSON.stringify({ energy: newEnergy, date: new Date() })
        );
        return newEnergy;
      });
    }

    // Apply booster points if booster is active
    if (basePoints === 10) {
      setBoosterPoints((prevBoosterPoints) => {
        const newBoosterPoints =
          prevBoosterPoints + basePoints * touches.length;
        boosterPointsRef.current = newBoosterPoints;
        return newBoosterPoints;
      });
    }

    // Optional animation handling (uncomment if needed)
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
  };

  // const handleTap = debounce((e) => {
  //   if (energy.current > 5) {
  //     if (navigator.vibrate) {
  //       navigator.vibrate(100);
  //     }

  //     const isTouchEvent = e.type === "touchstart";
  //     if (isTouchEvent) {
  //       setLastInputWasTouch(true);
  //     } else if (lastInputWasTouch && !isTouchEvent) {
  //       return; // Ignore mouse event if the last input was touch
  //     }

  //     tapSound.play();

  //     const touches = e.touches
  //       ? Array.from(e.touches)
  //       : [{ clientX: e.clientX, clientY: e.clientY }];
  //     // let num = 5;

  //     // if (watchScreen?.boosterDetails?.name === "tap" && watchScreen?.booster) {
  //     //   num = 10;
  //     //   setBoosterPoints((prevBoosterPoints) => {
  //     //     const newBoosterPoints = prevBoosterPoints + num * touches.length;
  //     //     boosterPointsRef.current = newBoosterPoints;
  //     //     return newBoosterPoints;
  //     //   });
  //     // } else {
  //     //   if (energyy > 0) {
  //     //     const totalPoints = Math.min(energyy, num * touches.length);
  //     //     setTapPoints((prevTapPoints) => {
  //     //       const newTapPoints = prevTapPoints + totalPoints;
  //     //       tapPointsRef.current = newTapPoints;
  //     //       return newTapPoints;
  //     //     });
  //     //     SetEnergy((prev) => {
  //     //       const newEnergy = prev - totalPoints;
  //     //       energy.current = newEnergy;
  //     //       return newEnergy;
  //     //     });
  //     //   }
  //     // }

  //     const newAnimations = touches.map((touch) => ({
  //       id: Date.now() + Math.random(),
  //       x: touch.clientX,
  //       y: touch.clientY,
  //     }));

  //     setTapAnimations((prev) => [...prev, ...newAnimations]);

  //     setTimeout(() => {
  //       setTapAnimations((prev) =>
  //         prev.filter((animation) => !newAnimations.includes(animation))
  //       );
  //     }, 1000);
  //   }
  // });

  return (
    <div
      className="tvContainer menupointer"
      style={{ height: "100%", width: "100%" }}
    >
      {userDetails.isTutorial ? (
        <div
          className="tutorial"
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 0,
            backgroundColor: "transparent",
          }}
        >
          <div
            className="row level-div text-center"
            style={{
              margin: "55px 35px",
            }}
          >
            <div className="col-6">
              <div className="level-h2" style={{ position: "relative" }}>
                <h2 className="level" style={{ visibility: "hidden" }}>
                  Level {currentLevel} &nbsp;
                  {formatNumber(
                    Number(watchScreen.totalReward) +
                      Number(secs) +
                      Number(tapPoints) +
                      Number(boosterPoints)
                  )}
                  /{formatNumber(level[currentLevel + 1])}
                </h2>
                <h2
                  className="level"
                  style={{
                    position: "absolute",
                    top: -30,
                    left: 0,
                    opacity: 1,
                    zIndex: 1000000,
                  }}
                >
                  <div
                    className="loader"
                    onClick={() => {
                      updateUserInfo((prev) => ({
                        ...prev,
                        tutorialText:
                          "TRACK YOUR CURRENT LEVEL AND LEADERBOARD",
                      }));
                    }}
                  >
                    <div className="dot"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </h2>
                <div
                  style={{
                    height: "10px",
                    marginBottom: "10px",
                    visibility: "hidden",
                  }}
                >
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

                  {/* <DashedProgressBar
                    progress={Number(
                      ((watchScreen.totalReward +
                        secs +
                        tapPoints +
                        Number(boosterPoints)) /
                        level[currentLevel + 1]) *
                        100
                    ).toFixed()}
                  /> */}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="level-h2">
                <h2
                  className="level"
                  style={{
                    position: "absolute",
                    top: 30,
                    opacity: 1,
                    zIndex: 1000000,
                  }}
                >
                  <div
                    className="loader"
                    onClick={() => {
                      updateUserInfo((prev) => ({
                        ...prev,
                        tutorialText: "TRACK ENERGY BAR DROP PER TAP",
                      }));
                    }}
                  >
                    <div className="dot"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </h2>
                <h2 className="energy" style={{ visibility: "hidden" }}>
                  <img src={engimg} style={{ paddingRight: "3px" }} />
                  Energy {energy.current}/5000
                </h2>
                <div
                  style={{
                    height: "10px",
                    marginBottom: "10px",
                    visibility: "hidden",
                  }}
                >
                  <ProgressBar style={{ height: "10px" }}>
                    <ProgressBar now={(energy.current / 5000) * 100} key={1} />
                  </ProgressBar>
                </div>
              </div>
            </div>

            <div className="row streak-center">
              <div
                onClick={() => {}}
                className="col-2 text-center"
                style={{ position: "relative" }}
              >
                <img src={help} alt="Help" style={{ visibility: "hidden" }} />
                <div
                  className="loader"
                  onClick={() => {
                    updateUserInfo((prev) => ({
                      ...prev,
                      tutorialText: "ABOUT THEMEMETV - HOW IT WORKS",
                    }));
                  }}
                  style={{ position: "absolute", top: -25, left: -10 }}
                >
                  <div className="dot"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>

              <div className="col-8 ">
                <div className="row text-center phase1">
                  <div className="col-5" style={{ position: "relative" }}>
                    <h2 className="streak" style={{ visibility: "hidden" }}>
                      STREAK <FaChevronRight style={{ fontSize: "12px" }} />
                    </h2>
                    <div
                      className="loader"
                      onClick={() => {
                        updateUserInfo((prev) => ({
                          ...prev,
                          tutorialText:
                            "MONITOR TASKS CONTRIBUTING TO YOUR STREAK",
                        }));
                      }}
                      style={{ position: "absolute", top: -30 }}
                    >
                      <div className="dot"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </div>
                  </div>
                  <div
                    className="col-2 phase-p"
                    style={{ position: "relative", visibility: "hidden" }}
                  >
                    <h6>p</h6>
                    <div
                      className="loader"
                      onClick={() => {
                        updateUserInfo((prev) => ({
                          ...prev,
                          tutorialText: "YOUR CURRENT PHASE",
                        }));
                      }}
                      style={{
                        position: "absolute",
                        top: -25,
                        left: -20,
                        visibility: "visible",
                      }}
                    >
                      <div className="dot"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </div>
                  </div>

                  <div className="col-5" style={{ position: "relative" }}>
                    <h2 className="streak" style={{ visibility: "hidden" }}>
                      {" "}
                      STAKE <FaChevronRight style={{ fontSize: "12px" }} />{" "}
                    </h2>
                    <div
                      className="loader"
                      onClick={() => {
                        updateUserInfo((prev) => ({
                          ...prev,
                          tutorialText:
                            "STAKE YOUR TOKENS TO DOUBLE YOUR REWARDS",
                        }));
                      }}
                      style={{
                        position: "absolute",
                        top: -30,
                        visibility: "visible",
                      }}
                    >
                      <div className="dot"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-2 text-center"
                style={{ position: "relative" }}
              >
                <img
                  src={ConnectWalletImg}
                  alt="ConnectWallet"
                  className="wallet-image"
                  style={{ visibility: "hidden" }}
                />
                <div
                  className="loader"
                  onClick={() => {
                    updateUserInfo((prev) => ({
                      ...prev,
                      tutorialText: "CONNECT WALLET AND AIRDROP TASKS",
                    }));
                  }}
                  style={{ position: "absolute", top: -30, left: -10 }}
                >
                  <div className="dot"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2" style={{ position: "relative" }}>
                <div className="token-div" style={{ visibility: "hidden" }}>
                  <p className="token-mint">POINT MINTING</p>
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
                <div
                  className="loader"
                  onClick={() => {
                    updateUserInfo((prev) => ({
                      ...prev,
                      tutorialText: "TOKENS EARNED PER SECOND",
                    }));
                  }}
                  style={{ position: "absolute", top: -10, left: -10 }}
                >
                  <div className="dot"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>
              <div className="col-8 " style={{ position: "relative" }}>
                <h2 style={{ visibility: "hidden" }}>
                  <img src={memetv} alt="Meme TV" />
                  <span className="txt-color ml-10">
                    {watchScreen.totalReward +
                      secsRef.current +
                      tapPoints +
                      boosterPoints}
                  </span>
                </h2>

                <div
                  className="loader"
                  onClick={() => {
                    updateUserInfo((prev) => ({
                      ...prev,
                      tutorialText: "CHECK YOUR TOTAL EARNED TOKENS",
                    }));
                  }}
                  style={{ position: "absolute", top: -10, left: 65 }}
                >
                  <div className="dot"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>
              <div className="col-2" style={{ position: "relative" }}>
                <div className="token-div" style={{ visibility: "hidden" }}>
                  <p className="token-mint1">Earn / tap</p>
                  <p className="earn-p">
                    {watchScreen.boosterDetails.name === "tap" ? 10 : 5}
                  </p>
                </div>
                <div
                  className="loader"
                  onClick={() => {
                    updateUserInfo((prev) => ({
                      ...prev,
                      tutorialText: "TOKENS EARNED PER TAP",
                    }));
                  }}
                  style={{ position: "absolute", top: -20, left: -10 }}
                >
                  <div className="dot"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>
            </div>
            <div className="row streak-center" style={{ marginTop: "5px" }}>
              <div
                className="col-2 text-center"
                style={{ position: "relative" }}
              >
                <img
                  src={inviteFriends}
                  alt="Settings"
                  style={{ visibility: "hidden" }}
                />
                <div
                  className="loader"
                  onClick={() => {
                    updateUserInfo((prev) => ({
                      ...prev,
                      tutorialText:
                        "REFER AND EARN - VIEW YOUR REFERRALS AND REFERRAL MILESTONES",
                    }));
                  }}
                  style={{ position: "absolute", top: -20, left: -10 }}
                >
                  <div className="dot"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
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
                            visibility: "hidden",
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
                style={{ position: "relative" }}
              >
                <img
                  src={leaderBoarder}
                  alt="Help"
                  style={{ visibility: "hidden" }}
                />
                <div
                  className="loader"
                  onClick={() => {
                    updateUserInfo((prev) => ({
                      ...prev,
                      tutorialText: "DO TASKS AND EARN TOKENS",
                    }));
                  }}
                  style={{ position: "absolute", top: -20, left: -10 }}
                >
                  <div className="dot"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>
            </div>
            <p style={{ color: "white" }}>
              {userDetails?.tutorialText ? userDetails?.tutorialText : null}
            </p>
          </div>

          <img
            src={cancelIcon}
            // className="cancel-img"
            onClick={() => {
              // closePopUp();
              // setIsTutorial(false);

              // setIsTutorial(false);
              updateUserInfo((prev) => ({
                ...prev,
                isTutorial: false,
              }));

              localStorage.setItem(
                "tutorial",
                JSON.stringify({
                  watched: true,
                })
              );
            }}
            style={{
              position: "absolute",
              width: "10%",
              left: "45%",
              top: "80%",
            }}
          />
          {/* <div
            className="row"
            style={{ height: "500px" }}
            onTouchStart={handleTap}
            onMouseDown={handleTap}
          >
            <div
              className="col-12"
              style={{
                zIndex: "-1",
              }}
            >
              <div className="floor"></div>
              <img
                src={karathe}
                className="woot-dance"
                width="328"
                height="272"
                alt="8-bit dancing Karateka guy"
              />
              {tapAnimations.map((animation) => (
                <div
                  key={animation.id}
                  className="tap-points txt-color"
                  style={{
                    left: animation.x,
                    top: animation.y,
                    visibility: "none",
                  }}
                >
                  +{watchScreen.boosterDetails.name === "tap" ? 10 : 5}
                </div>
              ))}
            </div>
          </div> */}
        </div>
      ) : null}
      {isLoading && (
        <div className="loaderstyle">
          <div className="spinner"></div>
        </div>
      )}
      <div className="line arrow"></div>
      <div
        className="row level-div text-center"
        style={{
          margin: "55px 35px",
        }}
      >
        <div className="col-6">
          <div className="level-h2">
            <h2
              onClick={() => {
                if (!watchScreen.booster) {
                  goToThePage(LeaderBoard, "LeaderBoard");
                } else {
                  handleClick();
                }
              }}
              className="level"
            >
              LEVEL {currentLevel} &nbsp;
              {formatNumber(
                Number(watchScreen.totalReward) +
                  Number(secs) +
                  Number(tapPoints) +
                  Number(boosterPoints)
              )}
              /{formatNumber(level[currentLevel + 1])}
            </h2>

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
                dashcolor={"#E1CA00"}
                lengthColor={"#E1CA00"}
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
          </div>
        </div>
        <div className="col-6">
          <div className="level-h2">
            <h2 className="energy">
              <img src={engimg} style={{ paddingRight: "3px" }} />
              ENERGY {energy.current}/5000
            </h2>
            <div style={{ height: "10px", marginBottom: "10px" }}>
              {/* <ProgressBar style={{ height: "10px" }}>
                <ProgressBar now={(energy.current / 5000) * 100} key={1} />
              </ProgressBar> */}

              <DashedProgressBar
                dashcolor={"#00AEEF"}
                lengthColor={"#33c6f6"}
                progress={(energy.current / 5000) * 100}
              />
            </div>
          </div>
        </div>
        <div className="row streak-center">
          <div
            onClick={() => {
              if (!watchScreen.booster) {
                var data = {
                  telegramId: userDetails.userDetails.telegramId,
                  userWatchSeconds: secsRef.current,
                  boosterPoints: String(
                    tapPointsRef.current + boosterPointsRef.current
                  ),
                };
                addWatchSecapihelp(data);
              } else {
                handleClick();
              }
            }}
            className="col-2 text-center"
            style={watchScreen.booster ? { opacity: 0.5 } : { opacity: 1 }}
          >
            <img src={help} alt="Help" />
          </div>
          <div className="col-8 streak-border">
            <div className="row text-center phase1">
              <div className="col-5">
                <h2
                  onClick={() => {
                    if (!watchScreen.booster) {
                      // updateUserInfo((prev) => ({
                      //   ...prev,
                      //   isLoading: true,
                      // }));
                      var data = {
                        telegramId: userDetails.userDetails.telegramId,
                        userWatchSeconds: secsRef.current,
                        boosterPoints: String(
                          tapPointsRef.current + boosterPointsRef.current
                        ),
                      };
                      addWatchSecapiStreak(data);
                    } else {
                      handleClick();
                    }
                  }}
                  className="streak"
                  style={
                    watchScreen.booster ? { opacity: 0.5 } : { opacity: 1 }
                  }
                >
                  {" "}
                  STREAK <FaChevronRight style={{ fontSize: "12px" }} />
                </h2>
              </div>
              <div className="col-2 phase-p">P{userDetails?.currentPhase}</div>
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
                  } else {
                    handleClick();
                  }
                }}
              >
                <h2
                  className="streak"
                  style={
                    watchScreen.booster ? { opacity: 0.5 } : { opacity: 1 }
                  }
                >
                  {" "}
                  STAKE <FaChevronRight style={{ fontSize: "12px" }} />{" "}
                </h2>
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              if (!watchScreen.booster) {
                var data = {
                  telegramId: userDetails.userDetails.telegramId,
                  userWatchSeconds: secsRef.current,
                  boosterPoints: String(
                    tapPointsRef.current + boosterPointsRef.current
                  ),
                };
                addWatchSecapiwallet(data);
              } else {
                handleClick();
              }
            }}
            className="col-2 text-center"
            style={watchScreen.booster ? { opacity: 0.5 } : { opacity: 1 }}
          >
            <img src={wallet} alt="ConnectWallet" className="wallet-image" />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <div className="token-div">
              <p className="token-mint">TOKEN MINT</p>
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
              } else {
                handleClick();
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
              <p className="token-mint1">EARN / TAP</p>
              <p className="earn-p">
                {watchScreen.boosterDetails.name === "tap" ? 10 : 5}
              </p>
            </div>
          </div>
        </div>
        <div className="row streak-center" style={{ marginTop: "5px" }}>
          <div
            className="col-2 text-center"
            style={watchScreen.booster ? { opacity: 0.5 } : { opacity: 1 }}
            onClick={() => {
              if (!watchScreen.booster) {
                var data = {
                  telegramId: userDetails.userDetails.telegramId,
                  userWatchSeconds: secsRef.current,
                  boosterPoints: String(
                    tapPointsRef.current + boosterPointsRef.current
                  ),
                };
                addWatchSecapirefer(data);
              } else {
                handleClick();
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
                var data = {
                  telegramId: userDetails.userDetails.telegramId,
                  userWatchSeconds: secsRef.current,
                  boosterPoints: String(
                    tapPointsRef.current + boosterPointsRef.current
                  ),
                };
                addWatchSecapicheap(data);
              } else {
                handleClick();
              }
            }}
            style={watchScreen.booster ? { opacity: 0.5 } : { opacity: 1 }}
          >
            <img src={leaderBoarder} alt="Help" />
          </div>
        </div>
        {showInstructions && (
          <div
            className="instructions"
            style={{ marginTop: "10px", color: "white" }}
          >
            Tap/doNothing <br></br>Booster activated!
          </div>
        )}
      </div>
      <div
        className="row"
        style={{ height: "500px" }}
        onTouchStart={handleTap}
        // onMouseDown={handleTap}
      >
        <div style={{ height: "200px", width: "100%" }}>
          <p
            className="boosterText"
            style={{
              fontSize: "80px",
              fontFamily: "Press Start 2P",
              color: "white",
              textAlign: "center",
              zIndex: 10000000000000,

              marginTop: "-30px",
              opacity: 0.15,
            }}
          >
            {watchScreen.boosterDetails.name === "2x" ? "2X" : null}
            {watchScreen.boosterDetails.name === "3x" ? "3X" : null}
            {watchScreen.boosterDetails.name === "5x" ? "5X" : null}
            {watchScreen.boosterDetails.name === "levelUp" ? "UP" : null}
            {watchScreen.boosterDetails.name === "tap" ? "TAP" : null}
          </p>
        </div>
        <div
          className="col-12"
          style={{
            zIndex: "-1",
          }}
        >
          <div
            className="floor"
            style={
              watchScreen.booster
                ? {
                    position: "fixed",
                    bottom: "15%",
                    width: "100%",
                    height: "96px",
                    backgroundColor: "#670000",
                  }
                : {
                    position: "fixed",
                    bottom: "15%",
                    width: "100%",
                    height: "96px",
                    backgroundColor: "#2800b8",
                  }
            }
          ></div>
          <div
            style={{
              position: "absolute",
            }}
          >
            {/* {watchScreen.boosterDetails.name === "5x" ? ( */}
            <>
              <div style={{ position: "relative" }}>
                <img
                  src={karathe}
                  className={
                    watchScreen.booster
                      ? "woot-dance boosterfilter"
                      : "woot-dance"
                  }
                  width="328"
                  height="272"
                  alt="8-bit dancing Karateka guy"
                />

                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                  }}
                >
                  {/* <img
                    src={mask}
                    className={
                      watchScreen.boosterDetails.name
                        ? "woot-dance booster-mask boosterfilter"
                        : "woot-dance booster-mask"
                    }
                    width="328"
                    height="272"
                    alt="8-bit dancing Karateka guy"
                    style={
                      // watchScreen.boosterDetails.name === "5x"
                      //   ? { visibility: "visible" }
                      //   :
                      { visibility: "hidden" }
                    }
                  /> */}
                </div>

                {/* <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                  }}
                >
                  <img
                    src={mask}
                    className="woot-dance booster-mask"
                    width="328"
                    height="272"
                    alt="8-bit dancing Karateka guy"
                    style={
                      watchScreen.boosterDetails.name === "5x"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                </div> */}
              </div>
            </>
            {/* ) : (
              <img
                src={karathe}
                className="woot-dance"
                width="328"
                height="272"
                alt="8-bit dancing Karateka guy"
              /> */}
            {/* )} */}
          </div>

          {tapAnimations.map((animation) => (
            <div
              key={animation.id}
              className="tap-points txt-color"
              style={{
                left: animation.x,
                top: animation.y,
              }}
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

// 5x :  3,levelup : 1 -- 2x:3,3x:4,levelup:2,
