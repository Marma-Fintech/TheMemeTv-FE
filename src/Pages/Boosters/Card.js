import React from "react";

import levelupBoostImg from "../../assets/images/levelupImg.svg";
import tapBoostImg from "../../assets/images/tapboostimg.svg";
import twoxboost from "../../assets/images/2xboostimg.png";
import threexboost from "../../assets/images/3xturboimg.png";
import fivexboost from "../../assets/images/5xboostimg.png";
import useUserInfo from "../../Hooks/useUserInfo";

function Card(props) {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const { value, key } = props.item;
  const images = {
    levelUp: levelupBoostImg,
    tap: tapBoostImg,
    "2x": twoxboost,
    "3x": threexboost,
    "5x": fivexboost,
  };

  const boosterSelected = () => {
    if (watchScreen.booster && watchScreen.boosterDetails.name !== key) {
      return false;
    }
    const boosterDuration = {
      levelUp: 60,
      tap: 60,
      "2x": 60,
      "3x": 120,
      "5x": 180,
    };

    var minsBoosterList = watchScreen.boostersList;
    const index = minsBoosterList.indexOf(key);
    if (index !== -1) {
      minsBoosterList.splice(index, 1);
    }
    if (key === "tap") {
      updatewatchScreenInfo((prev) => {
        return {
          ...prev,
          ...{
            booster: true,
            boosterDetails: {
              name: key,
            },
            boostersList: minsBoosterList,
            boosterSec: watchScreen.boosterSec + boosterDuration[key],
          },
        };
      });
    } else {
      updatewatchScreenInfo((prev) => {
        return {
          ...prev,
          ...{
            booster: true,
            boosterDetails: {
              name: key,
            },
            boostersList: minsBoosterList,
            boosterSec: watchScreen.boosterSec + boosterDuration[key],
          },
        };
      });
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        display: "contents",
      }}
      onClick={() => {
        if (value !== 0) {
          boosterSelected();
        }
      }}
    >
      <div
        className="boostNumber"
        style={{ position: "absolute", top: -2, fontSize: 9 }}
      >
        {value}
      </div>
      <img src={images[key]} />
    </div>
  );
}

export default Card;
