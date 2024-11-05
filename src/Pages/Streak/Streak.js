import React, { useState, useEffect, useRef, useMemo } from "react";
import "./Streak.css";
import questionMarkIcon from "../../assets/Task/ReferImg.png";
import StreakBreakPoints from "../StreakBreakPoints/StreakBreakPoints";
import useUserInfo from "../../Hooks/useUserInfo";
import logo from "../../assets/images/meme-logo.svg";
import twitter from "../../assets/images/twitter.svg";
import Tv from "../Tv/Tv";
import ReferPage from "../ReferPage/ReferPage";
import Task from "../Task/Task";
import Spinner from "./Spinner"; // Import the spinner component
import cancelIcon from "../../assets/Task/cancelicon.png";
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
import { differenceInDays } from "date-fns";
import fire from "../../assets/images/fire.svg";

const Streak = () => {
  const [day, setDay] = useState(1);
  const [normalDay, setNormalDay] = useState(1);
  var dayRef = useRef(1);

  const [claimedLoginDays, setClaimedLoginDays] = useState([]);
  const [claimedWatchDays, setClaimedWatchDays] = useState([]);
  const [claimedReferDays, setClaimedReferDays] = useState([]);
  const [claimedTaskDays, setClaimedTaskDays] = useState([]);
  const [claimedMultiDays, setClaimedMultiDays] = useState([]);
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const [streakData, setStreakData] = useState(null);
  const [streakOfStreakData, setStreakOfStreakData] = useState(null);

  useEffect(() => {
    if (userDetails.userDetails?.streakData) {
      setStreakData(userDetails.userDetails.streakData);
    }

    if (userDetails.userDetails?.streakOfStreakData) {
      setStreakOfStreakData(userDetails.userDetails.streakOfStreakData);
    }
  }, [userDetails]);
  const [loginStreakReward, setLoginStreakReward] = useState(0);
  const [watchStreakReward, setWatchStreakReward] = useState(0);
  const [referStreakReward, setReferStreakReward] = useState(0);
  const [taskStreakReward, setTaskStreakReward] = useState(0);
  const [multiStreakReward, setMultiStreakReward] = useState(0);
  const [streakOfStreakReward, setStreakOfStreakReward] = useState(0);
  const [streakOfStreakRewardPopUp, setStreakOfStreakRewardPopUp] = useState(0);

  //loader
  const [isLoginClaimLoading, setIsLoginClaimLoading] = useState(false);
  const [isWatchClaimLoading, setIsWatchClaimLoading] = useState(false);
  const [isReferClaimLoading, setIsReferClaimLoading] = useState(false);
  const [isTaskClaimLoading, setIsTaskClaimLoading] = useState(false);
  const [isMultiClaimLoading, setIsMultiClaimLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false); // Make sure this is initialized to false
  const closePopup = () => {
    setShowPopup(false); // Close the popup
    setStreakOfStreakRewardPopUp(0);
  };

  const dayRefs = useRef([]);
  const scrollToActiveDay = (dayIndex) => {
    if (dayRefs.current[dayIndex]) {
      dayRefs.current[dayIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  // Scroll to the active day on page load
  useEffect(() => {
    scrollToActiveDay(normalDay - 1);
  }, [normalDay]);

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
          isMenu: false,
        },
      };
    });
  };

  const [startDay, setStartDay] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);

  const referStreakRewardArray = [1000, 2000, 3000, 5000, 10000, 15000, 25000];
  const login_watch_taskStreakRewardArray = [
    100, 200, 400, 800, 1600, 3200, 6400,
  ];

  const multiStreakRewardArray = [1300, 2100, 4200, 8400, 16800, 33600, 67200];

  const data = {
    name: "Ash",
    telegramId: userDetails?.userDetails?.telegramId,
  };

  const getUserDetails = async (data) => {
    const pointDetails = localStorage.getItem("pointDetails");
    const parsedData = JSON.parse(pointDetails);

    var data1;
    var userDetails;
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
      await updateWatchSecOnly(data1).then(async () => {
        userDetails = await UserDeatils(data);

        updateUserInfo((prev) => ({
          ...prev,
          userDetails: userDetails?.user,
        }));

        updatewatchScreenInfo((prev) => ({
          ...prev,
          boostersList: userDetails?.user?.boosters,
          totalReward: userDetails?.user?.totalRewards,
        }));
      });
    } else {
      userDetails = await UserDeatils(data);

      updateUserInfo((prev) => ({
        ...prev,
        userDetails: userDetails,
      }));

      updatewatchScreenInfo((prev) => ({
        ...prev,
        boostersList: userDetails?.boosters,
        totalReward: userDetails?.totalRewards,
      }));
    }

    return userDetails;
  };

  const updateWatchSecOnly = async (data) => {
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
      tapPoints: 0,
      booster: false,
      boosterSec: 0,
      boosterPoints: 0,
      boosterDetails: {},
      watchSec: 0,
    }));
  };

  const memoizedStartDay = useMemo(() => {
    // Some calculation that uses startDay
    return startDay; // Could be any complex calculation
  }, [startDay]);

  const memoizedCurrentDay = useMemo(() => {
    // Some calculation that uses currentDay
    return currentDay; // Could be any complex calculation
  }, [currentDay]);

  //function to check day cnd change the day, if they start in a middle day
  const dayCheck = async (n) => {
    setNormalDay(n);
    const dayCount = n - startDay;
    if (dayCount == 0) {
      setDay(1);
      dayRef.current = 1;
    } else if (dayCount == 1) {
      setDay(2);
      dayRef.current = 2;
    } else if (dayCount == 2) {
      setDay(3);
      dayRef.current = 3;
    } else if (dayCount == 3) {
      setDay(4);
      dayRef.current = 4;
    } else if (dayCount == 4) {
      setDay(5);
      dayRef.current = 5;
    } else if (dayCount == 5) {
      setDay(6);
      dayRef.current = 6;
    }
  };

  //function to calculate day reward
  const calculateReward = async () => {
    const data = {
      telegramId: userDetails.userDetails.telegramId,
      userWatchSeconds: 0,
    };
    // Fetch streak data
    const [calculatedStreakData, getStreakData] = await Promise.all([
      calculateStreak(data),
      getUserStreaks(data.telegramId),
    ]);

    // Update basic streak data
    setStreakData(calculatedStreakData);
    setCurrentDay(getStreakData.currentDay);
    setClaimedLoginDays(getStreakData.claimedLoginDays);
    setClaimedWatchDays(getStreakData.claimedWatchDays);
    setClaimedReferDays(getStreakData.claimedReferDays);
    setClaimedTaskDays(getStreakData.claimedTaskDays);
    setClaimedMultiDays(getStreakData.claimedMultiDays);

    if (
      calculatedStreakData.login &&
      calculatedStreakData.watch &&
      calculatedStreakData.refer &&
      calculatedStreakData.task
    ) {
      // Calculate and update streak of streak data if needed
      const calculatedStreakOfStreakData = await calculateStreakOfStreak(
        data.telegramId
      );
      // Check if there is no error message in the response
      if (
        calculatedStreakOfStreakData &&
        calculatedStreakOfStreakData.message !==
          "User has not completed all streaks"
      ) {
        // Update state only if there is no error
        setStreakOfStreakData(calculatedStreakOfStreakData);
        setMultiStreakReward(
          calculatedStreakOfStreakData.streakOfStreak.multiStreakReward[
            dayRef.current - 1
          ]
        );
        let rewardAmount = 0;
        for (
          let i =
            calculatedStreakOfStreakData.streakOfStreak.streakOfStreakRewards
              .length - 1;
          i >= 0;
          i--
        ) {
          rewardAmount +=
            calculatedStreakOfStreakData.streakOfStreak.streakOfStreakRewards[
              i
            ];
        }
        setStreakOfStreakReward(rewardAmount);
      } else {
        console.log("Error: " + calculatedStreakOfStreakData.message);
      }
    }
    setLoginStreakReward(
      calculatedStreakData.loginStreak.loginStreakReward[dayRef.current - 1]
    );
    setWatchStreakReward(
      calculatedStreakData.watchStreak.watchStreakReward[dayRef.current - 1]
    );
    setReferStreakReward(
      calculatedStreakData.referStreak.referStreakReward[dayRef.current - 1]
    );
    setTaskStreakReward(
      calculatedStreakData.taskStreak.taskStreakReward[dayRef.current - 1]
    );
  };

  // Memoize login streak reward
  const memoizedLoginStreakReward = useMemo(() => {
    return streakData?.loginStreak?.loginStreakReward[dayRef.current - 1] || 0;
  }, [streakData, dayRef.current]);

  // Memoize watch streak reward
  const memoizedWatchStreakReward = useMemo(() => {
    return streakData?.watchStreak?.watchStreakReward[dayRef.current - 1] || 0;
  }, [streakData, dayRef.current]);

  // Memoize refer streak reward
  const memoizedReferStreakReward = useMemo(() => {
    return streakData?.referStreak?.referStreakReward[dayRef.current - 1] || 0;
  }, [streakData, dayRef.current]);

  // Memoize task streak reward
  const memoizedTaskStreakReward = useMemo(() => {
    return streakData?.taskStreak?.taskStreakReward[dayRef.current - 1] || 0;
  }, [streakData, dayRef.current]);

  // Memoize multi streak reward
  const memoizedMultiStreakReward = useMemo(() => {
    return (
      streakOfStreakData?.streakOfStreak?.multiStreakReward[
        dayRef.current - 1
      ] || 0
    );
  }, [streakData, dayRef.current]);

  useEffect(() => {
    calculateReward();
  }, [day]);

  const handleLoginClaimClick = async () => {
    // Set the login streak reward from the current streak data
    setLoginStreakReward(
      streakData.loginStreak.loginStreakReward[dayRef.current - 1]
    );

    const data = {
      telegramId: userDetails.userDetails.telegramId, // Assuming telegramId is in userDetails
      index: day - 1, // Adjust index based on current day
    };

    // Check if the login streak reward is not undefined
    if (
      streakData.loginStreak.loginStreakReward[dayRef.current - 1] !== undefined
    ) {
      try {
        setIsLoginClaimLoading(true); // Start loading

        // Call the loginStreakRewardClaim function and pass the data
        const response = await loginStreakRewardClaim(data);

        // Update claimedLoginDays immediately
        const updatedClaimedLoginDays = [...claimedLoginDays];
        updatedClaimedLoginDays[normalDay - 1] = true; // Mark the current day as claimed
        setClaimedLoginDays(updatedClaimedLoginDays); // Update the state immediately
        // Reset the reward or perform other actions
        setLoginStreakReward(0);
        calculateReward();
      } catch (error) {
        console.error("Error during claim:", error);
      } finally {
        setIsLoginClaimLoading(false); // End loading
      }
    }
  };

  const handleWatchClaimClick = async () => {
    // Set the watch streak reward from the current streak data
    setWatchStreakReward(
      streakData.watchStreak.watchStreakReward[dayRef.current - 1]
    );

    const data = {
      telegramId: userDetails.userDetails.telegramId, // Assuming telegramId is in userDetails
      index: day - 1, // Adjust index based on current day
    };

    // Check if the watch streak reward is not undefined
    if (
      streakData.watchStreak.watchStreakReward[dayRef.current - 1] !== undefined
    ) {
      try {
        setIsWatchClaimLoading(true); // Start loading

        // Call the watchStreakRewardClaim function and pass the data
        const response = await watchStreakRewardClaim(data);
        // Update claimedWatchDays immediately
        const updatedClaimedWatchDays = [...claimedWatchDays];
        updatedClaimedWatchDays[normalDay - 1] = true; // Mark the current day as claimed
        setClaimedWatchDays(updatedClaimedWatchDays); // Update the state immediately

        // Reset the reward or perform other actions
        setWatchStreakReward(0);
        calculateReward(); // Update any further reward calculations
      } catch (error) {
        console.error("Error during watch claim:", error);
      } finally {
        setIsWatchClaimLoading(false); // End loading
      }
    }
  };

  const handleReferClaimClick = async () => {
    // Set the refer streak reward from the current streak data
    setReferStreakReward(
      streakData.referStreak.referStreakReward[dayRef.current - 1]
    );

    const data = {
      telegramId: userDetails.userDetails.telegramId, // Assuming telegramId is in userDetails
      index: day - 1, // Adjust index based on current day
    };

    // Check if the refer streak reward is not undefined
    if (
      streakData.referStreak.referStreakReward[dayRef.current - 1] !== undefined
    ) {
      try {
        setIsReferClaimLoading(true); // Start loading

        // Call the referStreakRewardClaim function and pass the data
        const response = await referStreakRewardClaim(data);
        // Update claimedReferDays immediately
        const updatedClaimedReferDays = [...claimedReferDays];
        updatedClaimedReferDays[normalDay - 1] = true; // Mark the current day as claimed
        setClaimedReferDays(updatedClaimedReferDays); // Update the state immediately

        // Reset the reward or perform other actions
        setReferStreakReward(0);
        calculateReward(); // Update any further reward calculations
      } catch (error) {
        console.error("Error during refer claim:", error);
      } finally {
        setIsReferClaimLoading(false); // End loading
      }
    }
  };

  const handleGameClaimClick = async () => {
    // Set the task streak reward from the current streak data
    setTaskStreakReward(
      streakData.taskStreak.taskStreakReward[dayRef.current - 1]
    );

    const data = {
      telegramId: userDetails.userDetails.telegramId, // Assuming telegramId is in userDetails
      index: day - 1, // Adjust index based on current day
    };

    // Check if the task streak reward is not undefined
    if (
      streakData.taskStreak.taskStreakReward[dayRef.current - 1] !== undefined
    ) {
      try {
        setIsTaskClaimLoading(true); // Start loading

        // Call the taskStreakRewardClaim function and pass the data
        const response = await taskStreakRewardClaim(data);
        // Update claimedTaskDays immediately
        const updatedClaimedTaskDays = [...claimedTaskDays];
        updatedClaimedTaskDays[normalDay - 1] = true; // Mark the current day as claimed
        setClaimedTaskDays(updatedClaimedTaskDays); // Update the state immediately

        // Reset the reward or perform other actions
        setTaskStreakReward(0);
        calculateReward(); // Update any further reward calculations
      } catch (error) {
        console.error("Error during task claim:", error);
      } finally {
        setIsTaskClaimLoading(false); // End loading
      }
    }
  };

  const handleMultiClaimClick = async () => {
    // Check if all necessary streak data is available
    if (
      streakData.login &&
      streakData.watch &&
      streakData.refer &&
      streakData.task
    ) {
      // Set the multi streak reward from the current streak data
      setMultiStreakReward(
        streakOfStreakData.streakOfStreak.multiStreakReward[dayRef.current - 1]
      );

      const data = {
        telegramId: userDetails.userDetails.telegramId, // Assuming telegramId is in userDetails
        index: day - 1, // Adjust index based on current day
      };

      // Check if the multi streak reward is not undefined
      if (
        streakOfStreakData.streakOfStreak.multiStreakReward[
          dayRef.current - 1
        ] !== undefined
      ) {
        try {
          setIsMultiClaimLoading(true); // Start loading

          // Call the multiStreakRewardClaim function and pass the data
          const response = await multiStreakRewardClaim(data);
          // Update claimedMultiDays immediately
          const updatedClaimedMultiDays = [...claimedMultiDays];
          updatedClaimedMultiDays[dayRef.current - 1] = true; // Mark the current day as claimed
          setClaimedMultiDays(updatedClaimedMultiDays); // Update the state immediately

          // Reset the reward or perform other actions
          setMultiStreakReward(0);
          calculateReward(); // Update any further reward calculations
        } catch (error) {
          console.error("Error during multi claim:", error);
        } finally {
          setIsMultiClaimLoading(false); // End loading
        }
      }
    }
  };

  const handleSOSClaimClick = async () => {
    console.log("Inside SOS claim click");
    if (
      streakData.login &&
      streakData.watch &&
      streakData.refer &&
      streakData.task
    ) {
      let rewardAmount = 0;
      for (
        let i =
          streakOfStreakData.streakOfStreak.streakOfStreakRewards.length - 1;
        i >= 0;
        i--
      ) {
        rewardAmount +=
          streakOfStreakData.streakOfStreak.streakOfStreakRewards[i];
      }
      setStreakOfStreakReward(rewardAmount);
      const data = {
        telegramId: userDetails.userDetails.telegramId,
      };
      if (
        streakOfStreakData.streakOfStreak.streakOfStreakRewards[
          streakOfStreakData.streakOfStreak.streakOfStreakRewards.length - 1
        ] != undefined
      ) {
        const response = await streakOfStreakRewardClaim(data);
        calculateReward();
        setStreakOfStreakRewardPopUp(rewardAmount);
        setStreakOfStreakReward(0);
        // Show the popup after reward is claimed and set any UI state needed
        setShowPopup(true); // Show the popup here
      }
    }
  };

  useEffect(() => {
    dayCheck(currentDay); // You can provide any other value here based on your requirement
  }, [currentDay]); // Empty dependency array ensures this runs only on initial render

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        const data = {
          telegramId: userDetails.userDetails.telegramId,
          userWatchSeconds: 0,
        };
        // Fetch streak data using get api
        const getStreakData = await getUserStreaks(data.telegramId);
        if (getStreakData) {
          setClaimedLoginDays(getStreakData.claimedLoginDays);
          setClaimedWatchDays(getStreakData.claimedWatchDays);
          setClaimedReferDays(getStreakData.claimedReferDays);
          setClaimedTaskDays(getStreakData.claimedTaskDays);
          setClaimedMultiDays(getStreakData.claimedMultiDays);
        }
        //updating startDay (use state)
        setStartDay(getStreakData.startDay);
        setCurrentDay(getStreakData.currentDay);

        // Calculate streak data and update the state
        const calculatedStreakData = await calculateStreak(data);
        setStreakData(calculatedStreakData);
        if (
          calculatedStreakData.login &&
          calculatedStreakData.watch &&
          calculatedStreakData.refer &&
          calculatedStreakData.task
        ) {
          // Calculate and update streak of streak data if needed
          const calculatedStreakOfStreakData = await calculateStreakOfStreak(
            data.telegramId
          );
          // Check if there is no error message in the response
          if (
            calculatedStreakOfStreakData &&
            calculatedStreakOfStreakData.message !==
              "User has not completed all streaks"
          ) {
            // Update state only if there is no error
            setStreakOfStreakData(calculatedStreakOfStreakData);
          } else {
            console.log("Error: " + calculatedStreakOfStreakData.message);
          }
        }
        await calculateReward();
      } catch (error) {
        console.error("Error fetching or calculating streak data:", error);
      }
    };
    fetchStreakData();
  }, [userDetails.userDetails.telegramId]); // Dependency array to run the effect when telegramId changes

  useEffect(() => {
    setTimeout(() => {
      updateUserInfo((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }, 1000);
  }, []);

  const toogleMenu = () => {
    updateUserInfo((prev) => ({
      ...prev,
      isPlay: false,
      currentComponent: Tv,
      currentComponentText: "TVPage",
      lastComponent: userDetails?.userDetails.currentComponent,
      lastComponentText: userDetails?.userDetails.currentComponentText,
      isMenu: true,
      menuCount: userDetails?.userDetails?.menuCount + 1,
    }));
  };

  return (
    <>
      <div className=" menupointer zindex">
        <div className="streakContainer mt-15">
          <img
            onMouseEnter={() => {
              goToThePage(StreakBreakPoints, "streakBreakPoints");
            }}
            src={questionMarkIcon}
            alt="Question Mark Icon"
            className="questionMarkIcon"
            style={{ marginLeft: "5px" }}
          />
          <h1 className="streaktext">STREAK</h1>
          <img
            onClick={() => {
              toogleMenu();
            }}
            src={cancelIcon}
            // className="cancel-imgpoints"
            className="questionMarkIcon"
            style={{ cursor: "pointer", pointerEvents: "all" }}
          />
        </div>
        <div
          className="container-fluid zindex"
          style={{ maxWidth: "300px", marginBottom: "10px", zIndex: "-1" }}
        >
          <div className="scrolling-wrapper row flex-row flex-nowrap">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="col-4">
                <div
                  ref={(el) => (dayRefs.current[index] = el)}
                  className={
                    memoizedStartDay > index + 1
                      ? "card-block1 card card-1 com-days"
                      : normalDay === index + 1
                      ? "card card-block2 card-1"
                      : "card card-block card-1"
                  }
                >
                  <button
                    className="btn-none"
                    onClick={() => {
                      dayCheck(index + 1);
                    }}
                    disabled={memoizedStartDay > index + 1 ? true : false}
                  >
                    {" "}
                    DAY {index + 1}{" "}
                  </button>
                </div>
              </div>
            ))}
            {/* <div className="col-4">
              <div
                className={
                  memoizedStartDay > 2
                    ? "card-block1 card card-1 com-days"
                    :normalDay === 2
                    ? "card card-block2 card-1"
                    : "card card-block card-1"
                }
              >
                <button
                  className="btn-none"
                  onClick={() => {
                    dayCheck(2);
                  }}
                  disabled={memoizedStartDay > 2 ? true : false}
                >
                  {" "}
                  DAY 2{" "}
                </button>
              </div>
            </div>
            <div className="col-4">
              <div
                className={
                  memoizedStartDay > 3
                    ? "card-block1 card card-1 com-days"
                    : normalDay === 3
                    ? "card card-block2 card-1"
                    : "card card-block card-1"
                }
              >
                {" "}
                <button
                  className="btn-none"
                  onClick={() => {
                    dayCheck(3);
                  }}
                  disabled={memoizedStartDay > 3 ? true : false}
                >
                  {" "}
                  DAY 3{" "}
                </button>
              </div>
            </div>
            <div className="col-4">
              <div
                className={
                  memoizedStartDay > 4
                    ? "card-block1 card card-1 com-days"
                    : normalDay === 4
                    ? "card card-block2 card-1"
                    : "card card-block card-1"
                }
              >
                {" "}
                <button
                  className="btn-none"
                  onClick={() => {
                    dayCheck(4);
                  }}
                  disabled={memoizedStartDay > 4 ? true : false}
                >
                  {" "}
                  DAY 4{" "}
                </button>
              </div>
            </div>
            <div className="col-4">
              <div
                className={
                  memoizedStartDay > 5
                    ? "card-block1 card card-1 com-days"
                    : normalDay === 5
                    ? "card card-block2 card-1"
                    : "card card-block card-1"
                }
              >
                {" "}
                <button
                  className="btn-none"
                  onClick={() => {
                    dayCheck(5);
                  }}
                  disabled={memoizedStartDay > 5 ? true : false}
                >
                  {" "}
                  DAY 5{" "}
                </button>
              </div>
            </div>
            <div className="col-4">
              <div
                className={
                  memoizedStartDay > 6
                    ? "card-block1 card card-1 com-days"
                    : normalDay === 6
                    ? "card card-block2 card-1"
                    : "card card-block card-1"
                }
              >
                <button
                  className="btn-none"
                  onClick={() => {
                    dayCheck(6);
                  }}
                  disabled={memoizedStartDay > 6 ? true : false}
                >
                  {" "}
                  DAY 6{" "}
                </button>
              </div>
            </div>
            <div className="col-4">
              <div
                className={
                  memoizedStartDay > 7
                    ? "card-block1 card card-1 com-days"
                    : normalDay === 7
                    ? "card card-block2 card-1"
                    : "card card-block card-1"
                }
              >
                <button
                  className="btn-none"
                  onClick={() => {
                    dayCheck(7);
                  }}
                  disabled={memoizedStartDay > 7 ? true : false}
                >
                  {" "}
                  DAY 7{" "}
                </button>{" "}
              </div>
            </div> */}
          </div>
        </div>
        <div className="scrollableContainer">
          <div className="row mt10 cheap-stuff">
            <div className="col-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a32d4767f07e35eed25cbb58c62b6e3e02828c9e572ce8ea3b6670916cbe8671?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                alt="Login streak icon"
                className="image"
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>LOGGED IN</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                {memoizedLoginStreakReward === undefined
                  ? "+0"
                  : claimedLoginDays[normalDay - 1]
                  ? `+${login_watch_taskStreakRewardArray[day - 1]}`
                  : `+${memoizedLoginStreakReward}`}{" "}
              </p>
            </div>
            <div className="col-3">
              {/* If loading is true, show the loader */}
              {isLoginClaimLoading ? (
                <Spinner />
              ) : (
                <button
                  className={`stuff-claim ${
                    claimedLoginDays[normalDay - 1] ||
                    memoizedCurrentDay < day + memoizedStartDay - 1
                      ? "claimed"
                      : memoizedLoginStreakReward > 0
                      ? ""
                      : "claimed"
                  }`}
                  onClick={handleLoginClaimClick}
                  style={{ cursor: "pointer" }}
                  disabled={claimedLoginDays[normalDay - 1]}
                >
                  {claimedLoginDays[normalDay - 1]
                    ? "CLAIMED"
                    : memoizedCurrentDay < day + memoizedStartDay - 1 // Before the current day
                    ? "LOCKED"
                    : memoizedCurrentDay === day + memoizedStartDay - 1 // On the current day
                    ? "CLAIM"
                    : memoizedLoginStreakReward > 0
                    ? "CLAIM"
                    : "LOCKED"}{" "}
                  {/* Adjust logic for next steps */}
                </button>
              )}
            </div>
          </div>
          <div className="row mt10 cheap-stuff">
            <div className="col-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b5a03a049db265cb188f96311f2011c0d512a033e5d53ad816443dd4ad0eec1?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                alt="Watch Streak Icon"
                className="image"
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>WATCHED</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                {memoizedWatchStreakReward === undefined
                  ? "+0"
                  : claimedWatchDays[normalDay - 1]
                  ? `+${login_watch_taskStreakRewardArray[day - 1]}`
                  : `+${memoizedWatchStreakReward}`}{" "}
              </p>
            </div>
            <div className="col-3">
              {isWatchClaimLoading ? (
                <Spinner />
              ) : (
                <button
                  className={`stuff-claim ${
                    claimedWatchDays[normalDay - 1] ||
                    memoizedCurrentDay < day + memoizedStartDay - 1
                      ? "claimed"
                      : memoizedWatchStreakReward > 0
                      ? ""
                      : "claimed"
                  }`}
                  onClick={() => {
                    if (watchStreakReward > 0) {
                      handleWatchClaimClick();
                    } else if (
                      memoizedCurrentDay >=
                      day + memoizedStartDay - 1
                    ) {
                      const userDetails = getUserDetails(data);
                      if (userDetails != undefined) {
                        goToThePage(Tv, "TV");
                      }
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  disabled={claimedWatchDays[normalDay - 1]}
                >
                  {claimedWatchDays[normalDay - 1]
                    ? "CLAIMED"
                    : memoizedCurrentDay < day + memoizedStartDay - 1
                    ? "LOCKED"
                    : memoizedCurrentDay === day + memoizedStartDay - 1
                    ? memoizedWatchStreakReward > 0
                      ? "CLAIM"
                      : "GO"
                    : "CLAIM"}
                  {/* Catch-all to ensure fallback */}
                </button>
              )}
            </div>
          </div>
          <div className="row mt10 cheap-stuff">
            <div className="col-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0eb953a6da27d088a419ecf530736727ca1f124475b9460d890398ef1438fc31?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                className="image"
                alt=""
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>REFERRED</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                {memoizedReferStreakReward === undefined
                  ? "+0"
                  : claimedReferDays[normalDay - 1]
                  ? `+${referStreakRewardArray[day - 1]}`
                  : `+${memoizedReferStreakReward}`}{" "}
              </p>
            </div>
            <div className="col-3">
              {isReferClaimLoading ? (
                <Spinner />
              ) : (
                <button
                  className={`stuff-claim ${
                    claimedReferDays[normalDay - 1] ||
                    memoizedCurrentDay < day + memoizedStartDay - 1
                      ? "claimed"
                      : memoizedReferStreakReward > 0
                      ? ""
                      : "claimed"
                  }`}
                  onClick={() => {
                    if (referStreakReward > 0) {
                      handleReferClaimClick();
                    } else if (
                      memoizedCurrentDay >=
                      day + memoizedStartDay - 1
                    ) {
                      goToThePage(ReferPage, "ReferPage");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  disabled={claimedReferDays[normalDay - 1]}
                >
                  {claimedReferDays[normalDay - 1]
                    ? "CLAIMED"
                    : memoizedCurrentDay < day + memoizedStartDay - 1
                    ? "LOCKED"
                    : memoizedCurrentDay === day + memoizedStartDay - 1
                    ? memoizedReferStreakReward > 0
                      ? "CLAIM"
                      : "GO"
                    : memoizedReferStreakReward > 0
                    ? "CLAIM"
                    : "LOCKED"}
                  {/* Catch-all to ensure fallback */}
                </button>
              )}
            </div>
          </div>
          <div className="row mt10 cheap-stuff">
            <div className="col-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d91855f4c21d7155a4b865bac0a53627ec417e8c7b74d7d40f533e5b8e895a3?apiKey=da9eb044cac44bb1ab1471c98df94a03&&apiKey=da9eb044cac44bb1ab1471c98df94a03"
                points="1,000"
                altText="Game icon"
                className="image"
                alt=""
              />
            </div>
            <div className="col-7 stuff-text">
              <h4>PLAYED</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                {memoizedTaskStreakReward === undefined
                  ? "+0"
                  : claimedTaskDays[normalDay - 1]
                  ? `+${login_watch_taskStreakRewardArray[day - 1]}`
                  : `+${memoizedTaskStreakReward}`}{" "}
              </p>
            </div>
            <div className="col-3">
              {isTaskClaimLoading ? (
                <Spinner />
              ) : (
                <button
                  className={`stuff-claim ${
                    claimedTaskDays[normalDay - 1] ||
                    memoizedCurrentDay < day + memoizedStartDay - 1
                      ? "claimed"
                      : memoizedTaskStreakReward > 0
                      ? ""
                      : "claimed"
                  }`}
                  onClick={() => {
                    if (taskStreakReward > 0) {
                      handleGameClaimClick();
                    } else if (
                      memoizedCurrentDay >=
                      day + memoizedStartDay - 1
                    ) {
                      goToThePage(Task, "Task");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  disabled={claimedTaskDays[normalDay - 1]}
                >
                  {claimedTaskDays[normalDay - 1]
                    ? "CLAIMED"
                    : memoizedCurrentDay < day + memoizedStartDay - 1
                    ? "LOCKED"
                    : memoizedCurrentDay === day + memoizedStartDay - 1
                    ? memoizedTaskStreakReward > 0
                      ? "CLAIM"
                      : "GO"
                    : memoizedTaskStreakReward > 0
                    ? "CLAIM"
                    : "LOCKED"}
                </button>
              )}
            </div>
          </div>
          <div className="row mt10 cheap-stuff mb10">
            <div className="col-2">
              <img loading="lazy" src={fire} className="image" alt="" />
            </div>
            <div className="col-7 stuff-text">
              <h4>MULTI STREAK</h4>
              <p className="stuff-p">
                <img src={logo} />{" "}
                {memoizedMultiStreakReward === undefined
                  ? "+0"
                  : claimedMultiDays[normalDay - 1]
                  ? `+${multiStreakRewardArray[day - 1]}`
                  : `+${memoizedMultiStreakReward}`}{" "}
              </p>
            </div>
            <div className="col-3">
              {isMultiClaimLoading ? (
                <Spinner />
              ) : (
                <button
                  className={`stuff-claim ${
                    claimedMultiDays[normalDay - 1] ||
                    memoizedCurrentDay < day + memoizedStartDay - 1
                      ? "claimed"
                      : memoizedMultiStreakReward > 0
                      ? ""
                      : "claimed"
                  }`}
                  onClick={handleMultiClaimClick}
                  style={{ cursor: "pointer" }}
                  disabled={claimedMultiDays[normalDay - 1]}
                >
                  {claimedMultiDays[normalDay - 1]
                    ? "CLAIMED"
                    : memoizedCurrentDay < day + memoizedStartDay - 1
                    ? "LOCKED"
                    : memoizedCurrentDay === day + memoizedStartDay - 1
                    ? memoizedMultiStreakReward > 0
                      ? "CLAIM"
                      : "GO"
                    : memoizedMultiStreakReward > 0
                    ? "CLAIM"
                    : "LOCKED"}
                </button>
              )}
            </div>
          </div>
          {/* Popup Screen */}
          {/* Popup Screen */}
        </div>
      </div>

      {/* SOS Button */}
      <div
        className={
          streakOfStreakReward === 0 || streakOfStreakReward === undefined
            ? "invite-fri-sos"
            : "invite-fri"
        }
      >
        <button
          className={
            streakOfStreakReward === 0 || streakOfStreakReward === undefined
              ? "btn-none sos-none"
              : "btn-none sos"
          }
          onClick={handleSOSClaimClick}
          style={{ cursor: "pointer" }}
          disabled={
            streakOfStreakReward === 0 || streakOfStreakReward === undefined
              ? true
              : false
          }
        >
          STREAK OF STREAK
        </button>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="epic">STREAK OF STREAK REWARDS!</h2>
            <img src={cancelIcon} className="cancel-img" onClick={closePopup} />
            <div className="row text-center">
              <div className="col-12">
                <div className="epic-div">
                  {/* Display the correct streak reward */}
                  <h3 className="rw-popup">{streakOfStreakRewardPopUp}!</h3>
                </div>
              </div>
            </div>
            <button className="btn-reward" onClick={closePopup}>
              DONE
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Streak;
