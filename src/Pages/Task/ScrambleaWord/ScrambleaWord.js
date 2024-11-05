import React, { useEffect, useState } from "react";
import "./ScrambleaWord.css";
import { FaChevronRight } from "react-icons/fa";
import useUserInfo from "../../../Hooks/useUserInfo";
import ScrambleaWordPlay from "./ScrambleaWordPlay.js";
import Menu from "../../menu/menu";
import Tv from "../../Tv/Tv";
import cancelIcon from "../../../assets/Task/cancelicon.png";

const ScrambleaWord = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
  const [scrambleProgress, setScrambleProgress] = useState([]);
  const startDate = new Date("2024-10-28");
  const totalDays = 84; // Total days from startDate to endDate
  const daysInPhase = 7; // Number of days per phase
  const totalScramblesPerDay = 5;

  // Function to simulate the current day based on the start date
  const calculateSimulatedDay = () => {
    const today = new Date(userDetails?.userDetails?.lastLogin); // This will be used to simulate the current day
    const diffTime = Math.abs(today - startDate);
    const simulatedDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return simulatedDay > 0 ? simulatedDay : 1; // Ensure that Day 1 is correctly set
  };
  const simulatedDay = calculateSimulatedDay();
  const currentPhase = Math.ceil(simulatedDay / daysInPhase);

  useEffect(() => {
    if (simulatedDay > totalDays) {
      setScrambleProgress([]);
    } else {
      const progress = Array.from({ length: daysInPhase }, (_, i) => {
        const day = (currentPhase - 1) * daysInPhase + i + 1;
        const completedIndex =
          parseInt(localStorage.getItem(`scrambleIndex_day${day}`)) || 0;
        const scramblesRemaining = totalScramblesPerDay - completedIndex;
        if (day <= simulatedDay && scramblesRemaining > 0) {
          return ` Play Game ${scramblesRemaining}/5 `;
        } else if (completedIndex >= totalScramblesPerDay) {
          return "Completed";
        } else {
          return "Locked";
        }
      });
      setScrambleProgress(progress);
    }
  }, [currentPhase, simulatedDay]);

  const goToThePage = (component, name, isDisabled) => {
    if (isDisabled) return; // Prevent navigation if the day is disabled
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: userDetails.currentComponent,
      lastComponentText: userDetails.currentComponentText,
      isMenu: !userDetails.isMenu,
    }));
  };

  const toogleMenu = () => {
    updateUserInfo((prev) => ({
      ...prev,
      isPlay: false,
      currentComponent: Menu,
      currentComponentText: "MenuPage",
      lastComponent: userDetails?.userDetails.currentComponent,
      lastComponentText: userDetails?.userDetails.currentComponentText,
      isMenu: true,
      menuCount: userDetails?.userDetails?.menuCount + 1,
    }));
  };

  return (
    <div className="quiz-task menupointer">
      <img
        onClick={() => {
          toogleMenu(Tv, "Tv");
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer" }}
      />
      {simulatedDay > totalDays ? (
        <div className="completion-message">
          <h1>All phases completed!</h1>
          <p>You are not eligible to play anymore.</p>
        </div>
      ) : (
        <>
          <h1 className="welcome-text">Word Scramble </h1>
          <h2 className="phase-text">Phase {currentPhase}</h2>
          <div className="days-container">
            {Array.from({ length: daysInPhase }, (_, i) => {
              const day = (currentPhase - 1) * daysInPhase + i + 1;
              const isCompleted = scrambleProgress[i] === "Completed";
              const isDisabled = scrambleProgress[i] === "Locked";
              return (
                <div key={i} className="day-box">
                  <div className="day-label">Day {i + 1}</div>
                  <div
                    onClick={() => {
                      goToThePage(
                        () => <ScrambleaWordPlay day={day} />,
                        "ScrambleaWordPlay",
                        isDisabled || isCompleted
                      );
                    }}
                    className="play-status"
                    style={{
                      cursor:
                        isDisabled || isCompleted ? "not-allowed" : "pointer",
                      color: isDisabled
                        ? "grey"
                        : isCompleted
                        ? "darkgrey"
                        : "#ccc",
                    }}
                  >
                    {scrambleProgress[i]} <FaChevronRight />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default ScrambleaWord;
