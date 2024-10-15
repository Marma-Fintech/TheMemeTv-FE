import React from "react";
// import "./ChooseBattle.css";
import "./ChooseBattle.css";
import shibapng from "../../assets/images/shiba.png";
import pepebattle from "../../assets/images/pepebattle.png";
import cancleCoin from "../../assets/Task/cancelicon.png";
import vs from "../../assets/images/vs.png";
import useUserInfo from "../../Hooks/useUserInfo";
import { chooseTeam } from "../../apis/user";

const Battle = () => {
  const { userDetails, updateUserInfo } = useUserInfo();

  const TeamA = userDetails?.battleDetails[0]?.teams[0];
  const TeamB = userDetails?.battleDetails[0]?.teams[1];
  console.log(TeamA);
  const selectTeam = (data) => {
    const res = chooseTeam(data);
    if (res) {
      updateUserInfo((prev) => ({
        ...prev,
        isBattleScreen: false,
        voteStatus: true,
      }));
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="battle-content">
        <div className="match-header">
          <h3 className="match-header-text">MATCH 21</h3>
        </div>
        <div className="outline">
          <div className="content">
            <p className="choose-text">CHOOSE YOUR MEME FOR THE FIGHT!</p>
          </div>
        </div>
        <div className="characters-container">
          <div className="character red-character">
            <div className="team-1">
              <img
                src={TeamA?.img}
                alt="SHIBA INU"
                height={200}
                className="character-image"
              />
            </div>
            <h3 className="shiba-text">SHIBA INU</h3>

            <ul className="team-stats red">
              <li>
                {" "}
                RANK<span className="value">{TeamA?.rank}</span>
              </li>
              <li>
                WIN<span className="value">{TeamA?.wins}</span>
              </li>
              <li>
                LOSE<span className="value">{TeamA?.losses}</span>
              </li>
            </ul>
            <button
              className="team-shiba-btn"
              onClick={() => {
                selectTeam({
                  telegramId: userDetails?.userDetails?.telegramId,
                  teamId: TeamA.teamId,
                });
              }}
            >
              CHOOSE ME
            </button>
          </div>

          <img src={vs} className="vs-text" alt="VS" />

          <div className="character green-character">
            <div className="team-2">
              <img src={TeamB?.img} alt="PEPE" className="character-image" />
            </div>
            <h3 className="pepe-text">PEPE</h3>
            <ul className="team-stats green">
              <li>
                {" "}
                RANK<span className="value">{TeamB?.rank}</span>
              </li>
              <li>
                WIN<span className="value">{TeamB?.wins}</span>
              </li>
              <li>
                LOSE<span className="value">{TeamB?.losses}</span>
              </li>
            </ul>
            <button
              className="team-pepe-btn"
              onClick={() => {
                selectTeam({
                  telegramId: userDetails?.userDetails?.telegramId,
                  teamId: TeamB.teamId,
                });
              }}
            >
              CHOOSE ME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battle;
