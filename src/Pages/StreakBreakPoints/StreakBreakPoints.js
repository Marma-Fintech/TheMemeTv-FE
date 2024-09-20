import React, { useState } from "react";
import "./StreakBreakPoints.css";
import dayIcon from "../../assets/Task/dayicon.png";
import cancelIcon from "../../assets/Task/cancelicon.png";
import useUserInfo from "../../Hooks/useUserInfo";
import Streak from "../Streak/Streak";
import coinImg from "../../assets/images/coinlogo.png";
import booster3 from "./booster3.png";
import booster5 from "./booster5.png";

const streakData = [
  { type: "LOGIN STREAK", coins: [100, 200, 300, 400, 500, 600, 700] },
  { type: "WATCH STREAK", coins: [100, 200, 300, 400, 500, 600, 700] },
  {
    type: "REFER STREAK",
    coins: [1000, 2000, 3000, 5000, 10000, 15000, 25000],
  },
  { type: "TASK STREAK", coins: [100, 200, 300, 400, 500, 600, 700] },
  {
    type: "MULTI STREAK",
    coins: [1300, 2100, 4200, 8400, 16800, 33600, 67200],
  },
  {
    type: "STREAK OF STREAK",
    coins: [0, 2100, 6300, 14700, 31500, 65100, 132300],
  },
];

const boosters = {
  login: [1, 2, 3, 4, 5, 6, 7], // Number of 3x boosters for login
  watch: [1, 2, 3, 4, 5, 6, 7], // Number of 3x boosters for watch
  refer: [1, 2, 3, 4, 5, 6, 7], // Number of 3x boosters for refer
  task: [1, 2, 3, 4, 5, 6, 7], // Number of 3x boosters for tasks
  multi: [1, 2, 3, 4, 5, 6, 7], // Number of 5x boosters for multi streak
};

const StreakBreakPoints = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
  const [openDropdowns, setOpenDropdowns] = useState([]);

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

  const toggleDropdown = (day) => {
    if (openDropdowns.includes(day)) {
      setOpenDropdowns(openDropdowns.filter((d) => d !== day));
    } else {
      setOpenDropdowns([...openDropdowns, day]);
    }
  };

  return (
    <div className="tv-body">
      <div className="streakBreakPointsContainer">
        <div className="streakBreakRow">
          <span className="streakBreakText">STREAK POINTS</span>
          <img
            onClick={() => {
              goToThePage(Streak, "Streak");
            }}
            src={cancelIcon}
            alt="Cancel Icon"
            className="cancelIcon"
          />
        </div>
        <span className="pointsText">BREAKDOWN</span>
        <div className="scrollableContainer">
          <h3 className="additionalText">
            Login daily to unlock the <b>STREAK OF STREAK</b> bonus and keep
            your SOS alive throughout the entire reward cycle!
          </h3>
          <h3 className="additionalText1">
            Complete your daily tasks to win Streaks and unlock rewards at every
            new phase!
          </h3>
          <h1 className="check-text">check out the point system</h1>
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div className="containerbox-main" key={dayIndex}>
              <div
                className={`containerbox ${
                  openDropdowns.includes(dayIndex + 1) ? "active" : ""
                }`}
              >
                <button>DAY {dayIndex + 1}</button>
                <img
                  src={dayIcon}
                  alt={`Day ${dayIndex + 1} Icon`}
                  className="icon"
                  onClick={() => toggleDropdown(dayIndex + 1)}
                />
              </div>
              {openDropdowns.includes(dayIndex + 1) && (
                <div className="dropdown">
                  {streakData.map((streak, streakIndex) => (
                    <div key={streakIndex} className="dropdownItem">
                      {streak.type === "STREAK OF STREAK" ? (
                        <span className="check-text">{streak.type}</span>
                      ) : (
                        <span className="streakDropdownText">
                          {streak.type}
                        </span>
                      )}

                      <img src={coinImg} alt="Coin Icon" className="coinIcon" />
                      {/* Display coins for the specific day */}
                      {streak.type === "STREAK OF STREAK" ? (
                        <span className="coinsText">
                          {streak.coins[dayIndex]}
                        </span>
                      ) : (
                        <span className="coinsText">
                          {streak.coins[dayIndex]} +
                        </span>
                      )}

                      {/* Display boosters for the specific streak */}
                      {streak.type === "MULTI STREAK" ? (
                        <div style={{ lineHeight: "10px" }}>
                          <span className="coinsText">
                            {boosters.multi[dayIndex]} x
                          </span>
                          <img
                            src={booster5}
                            alt="Coin Icon"
                            className="coinIcon"
                          />
                        </div>
                      ) : (
                        <>
                          {[
                            "LOGIN STREAK",
                            "WATCH STREAK",
                            "REFER STREAK",
                            "TASK STREAK",
                          ].includes(streak.type) && (
                            <div style={{ lineHeight: "10px" }}>
                              <span className="coinsText">
                                {
                                  boosters[
                                    streak.type.toLowerCase().split(" ")[0]
                                  ][dayIndex]
                                }{" "}
                                x
                              </span>
                              <img
                                src={booster3}
                                alt="Coin Icon"
                                className="coinIcon"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreakBreakPoints;
