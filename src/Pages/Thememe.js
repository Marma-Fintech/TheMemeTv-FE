import React, { useEffect, useState, useRef } from "react";
import Tvborder from "../components/Tvborder";
import "./thememe.css";
import useUserInfo from "../Hooks/useUserInfo";
import Menu from "./menu/menu";
import Tv from "./Tv/Tv";
import Header from "./Header/Header";
import bottomShape from "../assets/images/bottomshapemain.png";
import bottomLeft from "../assets/images/RectangleLeft.svg";
import bottomRight from "../assets/images/RectangleRight.svg";
import bottomcenter from "../assets/images/bottomcenter.png";
import greenLineBottom from "../assets/images/greenLinebottom.png";
import boosterText from "../assets/images/boostText.png";
import menuIcon from "../assets/images/gameIcon.svg";
import referIcon from "../assets/images/marketp.svg";
import porotta from "../assets/audio/videoplayback.m4a";
import ReferPage from "./ReferPage/ReferPage";
import Boosters from "../Pages/Boosters/Boosters";
import ContinueText from "../assets/images/continue.svg";
import switchOnTv from "../assets/images/doNothing.svg";
import marketPlace from "./MarketPlace/marketPlace";

import {
  UserDeatils,
  calculateStreak,
  calculateStreakOfStreak,
} from "../apis/user";
import { addWatchSeconds, getUserDetails1 } from "../apis/user";
import Spinner from "../Pages/Streak/Spinner"; // Import the spinner component
import Battle from "./Battle/Battle";

const Thememe = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const [isTutorial, setIsTutorial] = useState(true);

  const latestUserDetails = useRef(userDetails);
  const latestWatchScreen = useRef(watchScreen);

  useEffect(() => {
    latestUserDetails.current = userDetails;
    latestWatchScreen.current = watchScreen;
    const storedData1 = localStorage.getItem("watchStreak");
    const parsedData1 = storedData1 ? JSON.parse(storedData1) : 0;
    if (
      parsedData1 &&
      parsedData1 !== 0 &&
      parsedData1.watchSec > 180 &&
      !parsedData1?.updated
    ) {
      // postWatchStreak(String(userData?.id));
      postWatchStreak(userDetails?.userDetails?.telegramId, parsedData1);
    }

    console.log(
      JSON.stringify(userDetails?.currentPhase) + "kjhfdfghjkhgfgfghkjhhg"
    );
  }, [userDetails, watchScreen]);

  useEffect(() => {
    const data = localStorage.getItem("tutorial");
    const parsedData = JSON.parse(data);
    if (parsedData?.watched) {
      updateUserInfo((prev) => ({
        ...prev,
        isTutorial: false,
      }));
    } else {
      updateUserInfo((prev) => ({
        ...prev,
        isTutorial: true,
      }));
    }
  }, []);

  useEffect(() => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    const userData = window.Telegram.WebApp.initDataUnsafe.user;
    const urlParams = new URLSearchParams(window.location.search);
    const referredIdFromUrl = urlParams.get("start");

    if (userData) {
      var data;
      if (referredIdFromUrl && referredIdFromUrl !== "undefined") {
        data = {
          name: userData?.first_name,
          telegramId: String(userData?.id),
          referredById: referredIdFromUrl,
        };
      } else {
        data = {
          name: userData?.first_name,
          telegramId: String(userData?.id),
        };
      }

      getUserDetails(data);

      updateUserInfo((prev) => ({
        ...prev,
        telegramDetails: userData,
      }));
    }
    // const data1 = {
    //   name: "Karthikeyan",
    //   telegramId: "62655jln9lugkyu18",
    // };
    // getUserDetails(data1);

    const storedData1 = localStorage.getItem("watchStreak");
    const parsedData1 = storedData1 ? JSON.parse(storedData1) : 0;

    if (
      parsedData1 &&
      parsedData1 !== 0 &&
      parsedData1.watchSec > 180 &&
      !parsedData1?.updated
    ) {
      postWatchStreak(String(userData?.id));
      // postWatchStreak(data1.telegramId, parsedData1);
    }

    const calculateReward = async () => {
      const data24 = {
        telegramId: String(userData?.id),
        // telegramId: data1.telegramId,
        userWatchSeconds: 0,
      };
      // Calculate streak data and update the state
      const calculatedStreakData = await calculateStreak(data24);
      userDetails.userDetails.streakData = calculatedStreakData;
      if (
        calculatedStreakData.login &&
        calculatedStreakData.watch &&
        calculatedStreakData.refer &&
        calculatedStreakData.task
      ) {
        // Calculate and update streak of streak data if needed
        const calculatedStreakOfStreakData = await calculateStreakOfStreak(
          data24.telegramId
        );
        userDetails.userDetails.streakOfStreakData =
          calculatedStreakOfStreakData;
      }
    };
    calculateReward();
  }, []);

  const postWatchStreak = async (id, parsedData1) => {
    // console.log("jhgfdsdfghj");
    const calculatedStreakData = await calculateStreak({
      telegramId: id,
      userWatchSeconds: 180,
    });
    if (calculatedStreakData) {
      localStorage.setItem(
        "watchStreak",
        JSON.stringify({
          // totalReward: totalRewardPoints,
          watchSec: parsedData1?.watchSec,
          // date: new Date(userDetails?.userDetails?.lastLogin).getDate(),
          // date: new Date().getDate(),
          date: new Date(userDetails?.userDetails?.lastLogin).getDate(),
          updated: true,
        })
      );
    }
  };

  const getUserDetails = async (data) => {
    const pointDetails = localStorage.getItem("pointDetails");
    const parsedData = JSON.parse(pointDetails);

    let data1;
    let userDetails;

    // If there are watch seconds, prepare data and make the update call
    if (parsedData?.watchSec) {
      data1 = {
        telegramId: data?.telegramId,
        userWatchSeconds: parsedData?.watchSec,
        boosterPoints: String(
          Number(parsedData?.tapPoints) + Number(parsedData?.boosterPoints)
        ),
      };

      if (parsedData?.booster[0]) {
        data1.boosters = parsedData?.booster;
      }

      // Use Promise.all to parallelize the API calls and updates
      try {
        await Promise.all([
          updateWatchSecOnly(data1),
          localStorage.setItem(
            "pointDetails",
            JSON.stringify({
              tapPoints: 0,
              watchSec: 0,
              boosterPoints: 0,
              booster: [0],
            })
          ),
        ]);

        userDetails = await UserDeatils(data);
        // console.log(JSON.stringify(userDetails) + "kjhgfds");
      } catch (error) {
        console.error("Error in updating or fetching user details:", error);
      }

      // Update state after both async calls are completed
      if (userDetails) {
        updateUserInfo((prev) => ({
          ...prev,
          currentPhase: userDetails?.currentPhase,
          userDetails: userDetails.user,
        }));

        updatewatchScreenInfo((prev) => ({
          ...prev,
          boostersList: userDetails?.user?.boosters,
          totalReward: userDetails?.user?.totalRewards,
          tapPoints: 0,
          booster: false,
          boosterSec: 0,
          boosterPoints: 0,
          boosterDetails: {},
          watchSec: 0,
        }));
      }
    } else {
      // If no watch seconds, fetch user details only
      try {
        userDetails = await UserDeatils(data);
      } catch (error) {
        console.error("Error in fetching user details:", error);
      }

      // Update state after fetching user details
      if (userDetails) {
        // console.log(JSON.stringify(userDetails) + "kjhgfsdfghjk");
        updateUserInfo((prev) => ({
          ...prev,
          currentPhase: userDetails?.currentPhase,
          userDetails: userDetails?.user,
        }));

        updatewatchScreenInfo((prev) => ({
          ...prev,
          boostersList: userDetails?.user?.boosters,
          totalReward: userDetails?.user?.totalRewards,
        }));
      }
    }

    return userDetails;
  };

  const getUserDetailsOnly = async () => {
    let userDetails1;

    try {
      userDetails1 = await getUserDetails1(
        userDetails?.userDetails?.telegramId
      );
    } catch (error) {
      console.error("Error in updating or fetching user details:", error);
    }

    // Update state after both async calls are completed
    if (userDetails) {
      updateUserInfo((prev) => ({
        ...prev,
        userDetails: userDetails1,
      }));

      updatewatchScreenInfo((prev) => ({
        ...prev,
        boostersList: userDetails1?.boosters,
        totalReward: userDetails1?.totalRewards,
        tapPoints: 0,
        booster: false,
        boosterSec: 0,
        boosterPoints: 0,
        boosterDetails: {},
        watchSec: 0,
      }));
    }

    return userDetails;
  };

  // const getUserDetails = async (data) => {
  //   const pointDetails = localStorage.getItem("pointDetails");
  //   const parsedData = JSON.parse(pointDetails);

  //   var data1;
  //   var userDetails;
  //   if (parsedData?.watchSec) {
  //     data1 = {
  //       telegramId: data?.telegramId,
  //       userWatchSeconds: parsedData?.watchSec,
  //       boosterPoints: String(
  //         Number(parsedData?.tapPoints) + Number(parsedData?.boosterPoints)
  //       ),
  //     };

  //     if (parsedData?.booster[0]) {
  //       data1.boosters = parsedData?.booster;
  //     }
  //     const res = await updateWatchSecOnly(data1).then(async (res) => {
  //       localStorage.setItem(
  //         "pointDetails",
  //         JSON.stringify({
  //           tapPoints: 0,
  //           watchSec: 0,
  //           boosterPoints: 0,
  //           booster: [0],
  //         })
  //       );

  //       userDetails = await UserDeatils(data);

  //       updateUserInfo((prev) => ({
  //         ...prev,
  //         userDetails: userDetails,
  //       }));

  //       updatewatchScreenInfo((prev) => ({
  //         ...prev,
  //         boostersList: userDetails?.boosters,
  //         totalReward: userDetails?.totalRewards,
  //         tapPoints: 0,
  //         booster: false,
  //         boosterSec: 0,
  //         boosterPoints: 0,
  //         boosterDetails: {},
  //         watchSec: 0,
  //       }));
  //     });
  //     return userDetails;
  //   } else {
  //     userDetails = await UserDeatils(data);

  //     updateUserInfo((prev) => ({
  //       ...prev,
  //       userDetails: userDetails,
  //     }));

  //     updatewatchScreenInfo((prev) => ({
  //       ...prev,
  //       boostersList: userDetails?.boosters,
  //       totalReward: userDetails?.totalRewards,
  //     }));
  //   }

  //   return userDetails;
  // };

  const goToTheRefererPage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: latestUserDetails.current.currentComponent,
      lastComponentText: latestUserDetails.current.currentComponentText,
      refererCount: latestUserDetails.current.refererCount + 1,
    }));
  };

  const toogleMenu = async () => {
    updateUserInfo((prev) => ({
      ...prev,
      isLoading: true,
    }));
    await addWatchSecMenu().then(() => {
      updateUserInfo((prev) => ({
        ...prev,
        isPlay: false,
        currentComponent: Menu,
        currentComponentText: "MenuPage",
        lastComponent: latestUserDetails.current.currentComponent,
        lastComponentText: latestUserDetails.current.currentComponentText,
        isMenu: !latestUserDetails.current.isMenu,
        menuCount: latestUserDetails.current.menuCount + 1,
      }));
    });
  };

  const goToThePage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: latestUserDetails.current.currentComponent,
      lastComponentText: latestUserDetails.current.currentComponentText,
      centerCount: latestUserDetails.current.centerCount + 1,
    }));
  };

  const audioRef = useRef(null);

  useEffect(() => {
    if (
      latestUserDetails.current.centerCount === 3 &&
      latestUserDetails.current.refererCount === 5
    ) {
      audioRef.current.play();
    }
  }, [userDetails]);

  const boostIntervalRef = useRef(null);
  const boostref = useRef(false);

  useEffect(() => {
    if (
      latestWatchScreen.current.booster &&
      latestWatchScreen.current.boosterSec > 0
    ) {
      boosterInterval();
    }
  }, [watchScreen]);

  const boosterInterval = () => {
    if (!boostref.current) {
      boostref.current = true;
      boostIntervalRef.current = setInterval(() => {
        updatewatchScreenInfo((prev) => {
          const newBoosterSec = Math.max(prev.boosterSec - 1, 0);

          if (newBoosterSec === 0) {
            clearInterval(boostIntervalRef.current);
            boostref.current = false;
            addWatchSec();
          }

          return {
            ...prev,
            boosterSec: newBoosterSec,
          };
        });
      }, 1000);
    }
  };

  const updateWatchSecOnly = async (data) => {
    const res = await addWatchSeconds(data);

    return res;
  };

  const addWatchSecapi = async (data) => {
    const res = await addWatchSeconds(data);
    updatewatchScreenInfo((prev) => ({
      ...prev,
      tapPoints: 0,
      booster: false,
      boosterSec: 0,
      boosterPoints: 0,
      boosterDetails: {},
      watchSec: 0,
    }));
  };

  const addWatchSec = () => {
    if (latestUserDetails.current.currentComponentText !== "TVPage") {
      var data = {};
      if (watchScreen.booster) {
        data = {
          telegramId: userDetails.userDetails.telegramId,
          userWatchSeconds: latestWatchScreen.current.watchSec,
          boosterPoints: String(
            latestWatchScreen.current.boosterPoints +
              latestWatchScreen.current.tapPoints
          ),
          boosters: [latestWatchScreen.current.boosterDetails.name],
        };
      } else {
        data = {
          telegramId: userDetails.userDetails.telegramId,
          userWatchSeconds: latestWatchScreen.current.watchSec,
          boosterPoints: String(latestWatchScreen.current.tapPoints),
        };
      }

      addWatchSecapi(data);
    }
  };

  const addWatchSecMenu = async () => {
    // if (latestUserDetails.current.currentComponentText !== "TVPage") {
    const values = JSON.parse(localStorage.getItem("pointDetails"));
    var data = {
      telegramId: userDetails.userDetails.telegramId,
      userWatchSeconds: values.watchSec + 1,
      boosterPoints: String(values.tapPoints),
    };
    var data = {};
    // if (watchScreen.booster) {÷
    data = {
      telegramId: userDetails.userDetails.telegramId,
      userWatchSeconds: values.watchSec + 1,
      boosterPoints: String(values.tapPoints),
      // boosters: [latestWatchScreen.current.boosterDetails.name],
    };
    // } else {
    //   data = {
    //     telegramId: userDetails.userDetails.telegramId,
    //     userWatchSeconds: latestWatchScreen.current.watchSec,
    //     boosterPoints: String(latestWatchScreen.current.tapPoints),
    //   };
    // }

    return await addWatchSecapi(data);
    // }
  };

  const reclaimUserDetails = () => {
    if (!watchScreen.booster) {
      const data = getUserDetailsOnly().then(() => {
        goToThePage(Tv, "TVPage");
        // goToThePage(Battle, "BattlePage");
      });
    }
  };

  const addWatchSecapiMarket = async (data) => {
    updateUserInfo((prev) => ({
      ...prev,
      isLoading: true,
    }));
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

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
        position: "fixed",
        overflow: "hidden",
      }}
    >
      {/* {userDetails?.userDetails?.isLoading && <Spinner />} */}

      <audio ref={audioRef}>
        <source src={porotta} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {latestUserDetails.current.isHeader && (
        <div className="box" style={{ height: "7%", width: "100%" }}>
          <Header />
        </div>
      )}

      <div
        style={{
          position: "fixed",
          zIndex: 1,
          height: "17%",
          width: "100%",
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <div style={{ position: "absolute", height: "100%", width: "100%" }}>
            <img
              src={bottomShape}
              alt="border"
              style={{ height: "100%", width: "100%" }}
              className="bottomImg"
            />
          </div>
          <div
            className="bottomtab"
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
              position: "absolute",
              alignItems: "flex-end",
            }}
          >
            <div
              className={
                userDetails.currentComponentText === "IntroImg" ||
                watchScreen.booster
                  ? "pulse-imagememu"
                  : "pulse-imagememu-active"
              }
              style={{
                height: "80%",
                width: "20%",
                marginBottom: "10px",
              }}
            >
              <div
                // className="pulse-image"
                style={
                  userDetails?.isTutorial &&
                  userDetails.currentComponentText === "TVPage"
                    ? {
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        opacity: ".5",
                      }
                    : { position: "absolute", height: "100%", width: "100%" }
                }
                onClick={() => {
                  if (
                    !watchScreen.booster &&
                    userDetails.currentComponentText !== "IntroImg" &&
                    !userDetails?.isTutorial
                  ) {
                    toogleMenu();
                  }
                }}
              >
                <img
                  src={bottomLeft}
                  alt="border"
                  style={
                    userDetails?.isTutorial
                      ? { height: "100%", width: "100%", opacity: 0.5 }
                      : { height: "100%", width: "100%" }
                  }
                  className="bottomImg"
                />
              </div>
              {userDetails?.isTutorial &&
              userDetails.currentComponentText === "TVPage" ? (
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <div
                    className="loader"
                    onClick={() => {
                      updateUserInfo((prev) => ({
                        ...prev,
                        tutorialText: "PLAY GAMES AND EARN TOKENS",
                      }));
                    }}
                    style={{ position: "absolute" }}
                  >
                    <div className="dot"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </div>
              ) : null}
              <div
                onClick={() => {
                  if (
                    !watchScreen.booster &&
                    userDetails.currentComponentText !== "IntroImg" &&
                    !userDetails?.isTutorial
                  ) {
                    toogleMenu();
                  }
                }}
                style={{
                  width: "100%",
                  position: "absolute",
                  display: "flex",
                  top: "35%",
                  left: "-3%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={menuIcon}
                  alt="border"
                  style={{
                    width: "50%",
                    // marginLeft: "10px",
                    // marginTop: "-10px",
                  }}
                  className="bottomImg"
                />
              </div>
            </div>
            <div
              style={{
                height: "100%",
                width: "60%",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -9,
                  height: "100%",
                  width: "175%",
                  display: "flex",
                  alignItems: "end",
                }}
              >
                <img
                  src={bottomcenter}
                  alt="border"
                  style={{ height: "85%", width: "63%" }}
                  className="bottomImg"
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  left: -9,
                  height: "100%",
                  width: "175%",
                  display: "flex",
                  alignItems: "end",
                }}
              >
                {userDetails.currentComponentText === "TVPage" ? (
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 29,
                        height: "100%",
                        width: "45%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 11,
                          color: "rgba(0, 255, 41, 1)",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "end",
                          justifyContent: "center",
                        }}
                      >
                        BOOSTERS
                      </div>
                      <img
                        src={boosterText}
                        alt="border"
                        style={{
                          height: "32%",
                          width: "70%",
                          padding: "10px",
                        }}
                        className="bottomImg"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <img
                  src={greenLineBottom}
                  alt="border"
                  style={{
                    height: "85%",
                    width: "63%",
                    padding: "10px",
                    position: "absolute",
                  }}
                  className="bottomImg pulse-image"
                />
              </div>
              {userDetails.currentComponentText === "TVPage" ? (
                <div
                  style={{
                    position: "relative",
                    left: 0,
                    top: 10,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {userDetails?.isTutorial ? (
                    <div
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        backgroundColor: "transparent",
                        zIndex: 20,
                      }}
                    >
                      <div
                        className="loader"
                        onClick={() => {
                          updateUserInfo((prev) => ({
                            ...prev,
                            tutorialText: "USE BOOSTERS AND BOOST YOUR TOKENS",
                          }));
                        }}
                        style={{ position: "absolute", left: "30%" }}
                      >
                        <div className="dot"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                      </div>
                    </div>
                  ) : null}
                  <Boosters />
                </div>
              ) : null}

              {userDetails.currentComponentText !== "TVPage" &&
              userDetails.currentComponentText !== "IntroImg" ? (
                <div
                  className="pulse-image"
                  style={{
                    position: "relative",
                    left: 0,
                    top: 10,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      onClick={() => {
                        reclaimUserDetails();
                      }}
                      src={switchOnTv}
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
              ) : null}

              {userDetails.currentComponentText === "IntroImg" ? (
                <div
                  className="pulse-image"
                  style={{
                    position: "relative",
                    left: 0,
                    top: 10,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    if (
                      userDetails?.userDetails?.telegramId &&
                      !watchScreen.booster
                    ) {
                      goToThePage(Tv, "TVPage");
                      // goToThePage(Battle, "BattlePage");
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={ContinueText} style={{ width: "90%" }} />
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className={
                userDetails.currentComponentText === "IntroImg" ||
                watchScreen.booster
                  ? "pulse-imagememu"
                  : "pulse-imagememu-active"
              }
              style={{
                height: "80%",
                width: "20%",
                marginBottom: "10px",
              }}
              onClick={() => {
                if (
                  !watchScreen?.booster &&
                  userDetails.currentComponentText !== "IntroImg" &&
                  !userDetails?.isTutorial
                ) {
                  const values = JSON.parse(
                    localStorage.getItem("pointDetails")
                  );
                  var data = {
                    telegramId: userDetails.userDetails.telegramId,
                    userWatchSeconds: values.watchSec + 1,
                    boosterPoints: String(values.tapPoints),
                  };
                  addWatchSecapiMarket(data);
                  // goToTheRefererPage(ReferPage, "ReferPage");
                }
              }}
            >
              <div
                style={
                  userDetails?.isTutorial &&
                  userDetails.currentComponentText === "TVPage"
                    ? {
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        opacity: 0.5,
                      }
                    : { position: "absolute", height: "100%", width: "100%" }
                }
              >
                <img
                  src={bottomRight}
                  alt="border"
                  style={{ height: "100%", width: "100%" }}
                  className="bottomImg"
                />
              </div>

              <div
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={referIcon}
                  alt="border"
                  style={{ width: "30%", objectFit: "contain" }}
                  className="bottomImg"
                />
              </div>

              {userDetails?.isTutorial &&
              userDetails.currentComponentText === "TVPage" ? (
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <div
                    className="loader"
                    onClick={() => {
                      updateUserInfo((prev) => ({
                        ...prev,
                        tutorialText: "USE YOUR TOKENS TO BUY BOOSTERS",
                      }));
                    }}
                    style={{ position: "absolute" }}
                  >
                    <div className="dot"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: userDetails.isHeader ? "77%" : "86%",
          width: "100%",
          zIndex: "-999",
          backgroundColor: "black",
          position: "relative",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {userDetails?.isLoading && (
            <div className="loaderstyle">
              <div className="spinner"></div>
            </div>
          )}
          {userDetails.currentComponent && <userDetails.currentComponent />}
        </div>
        <Tvborder />
      </div>
    </div>
  );
};

export default Thememe;
