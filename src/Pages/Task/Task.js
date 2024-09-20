import React from "react";
import "./task.css";
import playacard from "../../assets/Task/pickacard.png";
import quizImg from "../../assets/Task/Quiz.png";
import wordscrambleImg from "../../assets/Task/word-scramble.png";
import useUserInfo from "../../Hooks/useUserInfo";
import PickaWord from "./PickaWord/PickaWord";
import quiz from "./QuizTask/QuizTask";
import scramble from "./ScrambleaWord/ScrambleaWord";

const Task = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
  const goToThePage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: name,
          lastComponent: userDetails.currentComponent,
          lastComponentText: userDetails.currentComponentText,
          isMenu: false,
        },
      };
    });
  };
  return (
    <div
      className="task-page"
      style={{ justifyContent: "center", marginTop: "0%" }}
    >
      <div>
        <h2 className="txt-color mb15">Games</h2>
      </div>
      <div className="main-div">
        <div
          onClick={() => {
            goToThePage(PickaWord, "Pickaword");
          }}
        >
          <img src={playacard} alt="Play a card" className="task-image" />
        </div>
        <div className="image-row">
          <img
            onClick={() => {
              goToThePage(quiz, "quiz");
            }}
            src={quizImg}
            alt="Quiz"
            className="task-image-small"
          />
          <img
            onClick={() => {
              goToThePage(scramble, "Scramble");
            }}
            src={wordscrambleImg}
            alt="Word Scramble"
            className="task-image-small"
          />
        </div>
      </div>
    </div>
  );
};
export default Task;
