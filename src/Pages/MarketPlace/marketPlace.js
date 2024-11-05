import React, { useRef, useEffect, useState } from "react";
import "./marketPlace.css";
import memetv from "../../assets/images/rewards.svg";
import booster from "../../assets/images/boost-tap.png";
import ligthing from "../../assets/images/lighting.png";
import booster3 from "../../assets/images/3x-ligthing.png";
import booster2 from "../../assets/images/2booster.png";
import cancelIcon from "../../assets/Task/cancelicon.png";
import { purchaseBooster } from "../../apis/user";
import useUserInfo from "../../Hooks/useUserInfo";
import { UserDeatils } from "../../apis/user";
import Tv from "../Tv/Tv";

const MarketPlace = () => {
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState({});
  const [totalReward, setTotalReward] = useState();
  const [count, setCount] = useState(1);
  const [err, setErr] = useState("");
  const [isFirst, setIsFirst] = useState(false);
  const timeoutRef = useRef(null); // To store the timeout ID

  const handleClick1 = () => {
    setCount(count + 1);
  };

  const goToThePage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: userDetails.currentComponent,
      lastComponentText: userDetails.currentComponentText,
      centerCount: userDetails.centerCount + 1,
      isMenu: false,
    }));
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return Math.floor(num / 100000) / 10 + "M";
    if (num >= 1000) return Math.floor(num / 100) / 10 + "k";
    return num;
  };

  useEffect(() => {
    updateUserInfo((prev) => ({
      ...prev,
      isLoading: false,
    }));

    if (!isFirst && watchScreen?.updatedWatchPoints > 0) {
      setTotalReward(watchScreen.totalReward);
      setIsFirst(true);
    }
  }, [watchScreen, isFirst]);

  useEffect(() => {
    const getUserDetails = async (data) => {
      const userDetails = await UserDeatils(data);

      updateUserInfo((prev) => ({
        ...prev,
        userDetails: userDetails?.user,
      }));

      updatewatchScreenInfo((prev) => ({
        ...prev,
        boostersList: userDetails?.user?.boosters,
      }));
    };
    const data1 = {
      name: userDetails?.userDetails?.name,
      telegramId: String(userDetails?.userDetails?.telegramId),
    };

    getUserDetails(data1);
  }, []);
  const handleClick2 = () => {
    if (count === 1) {
    } else {
      setCount(count - 1);
    }
  };

  const getDetails = async (data) => {
    const userDetails = await UserDeatils(data);
    setTotalReward(userDetails?.user?.totalRewards);
    updateUserInfo((prev) => ({
      ...prev,
      userDetails: userDetails?.user,
    }));

    updatewatchScreenInfo((prev) => ({
      ...prev,
      boostersList: userDetails?.user?.boosters,
      totalReward: userDetails?.user?.totalRewards,
    }));

    return userDetails;
  };

  const getUserDetails = () => {
    const data = {
      name: userDetails.userDetails?.name,
      telegramId: userDetails?.userDetails?.telegramId,
    };

    const res = getDetails(data);
  };

  const purchaseCards = async () => {
    const data = {
      telegramId: userDetails?.userDetails?.telegramId,
      boosterPoints: String(selected.price * count),
      booster: selected.booster,
      boosterCount: count,
    };

    const Boosters = await purchaseBooster(data);
    if (Boosters?.message) {
      setShowPopup(false);
      setCount(1);
      getUserDetails();
    } else {
      setErr("Not Enough watch points");
      timeoutRef.current = setTimeout(() => {
        setCount(1);
        setShowPopup(false);
        setErr("");
      }, 2500);
    }
  };

  const closePopUp = () => {
    clearTimeout(timeoutRef.current);
    setCount(1);
    setErr("");
    setShowPopup(false);
  };

  return (
    <div className="info-img menupointer">
      <img
        onClick={() => {
          goToThePage(Tv, "TVPage");
          // console.log("hihihi");
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer" }}
      />

      <div
        className="menupointer "
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "3%",
          flexDirection: "column",
          pointerEvents: "all",
        }}
      >
        <div className="market-place">
          <div className="market">
            <div className="bg-market">
              <h2 className="welcome-text mb15 text-center">Market place</h2>
              <hr />
              <div className="row mt5">
                <div className="display-flex">
                  <div className="col-7">
                    <p className="rewards mb0"> Total Rewards</p>
                  </div>
                  <div className="col-5 text-right market-color">
                    <p className="mb0 market-points">
                      <img style={{ width: "15%" }} src={memetv} />{" "}
                      {formatNumber(totalReward)}
                      {/* 13241543 */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt15">
              <div className="col-6">
                <div className="market-card p5">
                  <div className="market-pick text-center">
                    <img src={booster} className="booster-margin" />
                    <div className="row">
                      <h4 className="mb0 market-color flex">
                        <img className="mr5" src={memetv} /> 10k
                      </h4>
                    </div>
                  </div>
                  <div className="p10">
                    <button
                      onClick={() => {
                        setShowPopup(true);
                        setSelected({
                          booster: "tap",
                          img: booster,
                          price: 10000,
                        });
                      }}
                      type="button"
                      className="btn-card"
                    >
                      BUY
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="market-card p5">
                  <div className="market-pick text-center">
                    <img src={ligthing} className="booster-margin" />
                    <div className="row">
                      <h4 className="mb0 market-color flex">
                        <img className="mr5" src={memetv} />{" "}
                        {90 * userDetails.userDetails?.level}
                      </h4>{" "}
                    </div>
                  </div>
                  <div className="p10">
                    <button
                      onClick={() => {
                        setShowPopup(true);
                        setSelected({
                          booster: "5x",
                          img: ligthing,
                          price: 90 * userDetails.userDetails?.level,
                        });
                      }}
                      type="button"
                      className="btn-card"
                    >
                      BUY
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="market-card p5">
                  <div className="market-pick text-center">
                    <img src={booster2} className="booster-margin" />
                    <div className="row">
                      <h4 className="mb0 market-color flex">
                        <img className="mr5" src={memetv} />{" "}
                        {12 * userDetails?.userDetails?.level}
                      </h4>
                    </div>
                  </div>
                  <div className="p10">
                    <button
                      onClick={() => {
                        setShowPopup(true);
                        setSelected({
                          booster: "2x",
                          img: booster2,
                          price: 12 * userDetails?.userDetails?.level,
                        });
                      }}
                      type="button"
                      className="btn-card"
                    >
                      BUY
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="market-card p5">
                  <div className="market-pick text-center">
                    <img src={booster3} className="booster-margin" />
                    <div className="row">
                      <h4 className="mb0 market-color flex">
                        <img className="mr5" src={memetv} />{" "}
                        {36 * userDetails.userDetails.level}
                      </h4>
                    </div>
                  </div>
                  <div className="p10">
                    <button
                      onClick={() => {
                        setShowPopup(true);
                        setSelected({
                          booster: "3x",
                          img: booster3,
                          price: 36 * userDetails.userDetails.level,
                        });
                      }}
                      type="button"
                      className="btn-card"
                    >
                      BUY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <>
                <h2 className="epic-m txt-color">{selected.booster} Booster</h2>
                <img
                  src={cancelIcon}
                  className="cancel-img"
                  onClick={() => {
                    closePopUp();
                  }}
                />
                <div className="row text-center">
                  <div className="col-12">
                    <div className="epic-market">
                      {/* {selectedCard && ( */}
                      <img
                        src={selected?.img}
                        alt={"booster"}
                        className="booster1"
                      />
                      {/* )} */}
                      {/* <h3 className="rw-popup">You got 2x!</h3> */}
                      <div>
                        <div className="buttons">
                          <button
                            className="decre txt-color"
                            onClick={handleClick2}
                          >
                            <p className="txt-color mb0">-</p>
                          </button>
                          <div>
                            <p className="count">{count}</p>
                          </div>
                          <button className="decre" onClick={handleClick1}>
                            <p className="txt-color mb0">+</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    purchaseCards();
                  }}
                  className="btn-reward1"
                  style={err === "" ? {} : { color: "red" }}
                >
                  {err === ""
                    ? selected.price * count
                    : "Not Enough Watch Points"}
                </button>
                {/* <button className="btn-reward">Free Pick</button> */}
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MarketPlace;
