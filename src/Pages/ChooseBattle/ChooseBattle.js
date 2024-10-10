import React from "react";
import "./ChooseBattle.css";
import shibapng from "../../assets/images/shiba.png";
import pepe from "../../assets/images/pepe.png";
import cancleCoin from "../../assets/images/cat.png";

const Battle = () => {
  return (
    <>
      <div className="wrapper-div">
        <div className="match-header">
          <h3 className="match-header-text">MATCH 21</h3>
        </div>
        <div className="battle-content">
          <div className="choose-text-div">
            <h3 className="choose-text">CHOOSE THE TEAM FOR YOUR MATCH !</h3>
          </div>
          <div className="characters-container">
            <div className="character red-character">
              <div className="team-1">
                <img
                  src={shibapng}
                  alt="SHIBA INU"
                  className="character-image"
                />
              </div>
              <h3 className="shiba-text">SHIBU INU</h3>

              <ul className="team-stats red">
                <li>
                  {" "}
                  RANK<span className="value">88</span>
                </li>
                <li>
                  WIN<span className="value">01</span>
                </li>
                <li>
                  LOSE<span className="value">0</span>
                </li>
              </ul>
              <button className="team-shiba-btn">
                <p>CHOOSE ME</p>
              </button>
            </div>

            <img src="\assets\images\vs.png" className="vs-text" alt="VS" />

            <div className="character green-character">
              <div className="team-2">
                <img src={pepe} alt="PEPE" className="pepe-img" />
              </div>
              <h3 className="pepe-text">PEPE</h3>
              <ul className="team-stats green">
                <li>
                  {" "}
                  RANK<span className="value">01</span>
                </li>
                <li>
                  WIN<span className="value">21</span>
                </li>
                <li>
                  LOSE<span className="value">00</span>
                </li>
              </ul>
              <button className="team-pepe-btn">
                <p>CHOOSE ME</p>
              </button>
            </div>
          </div>
        </div>
        <button className="close-btn">
          <img
            className="close-icon"
            src="assets/icons/cancelicon.png"
            alt=""
          />
        </button>
      </div>
    </>
  );
};

export default Battle;
