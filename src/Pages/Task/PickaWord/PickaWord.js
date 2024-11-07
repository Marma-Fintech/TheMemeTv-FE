import React, { useEffect, useState } from "react";
import "./PickaWord.css";
import useUserInfo from "../../../Hooks/useUserInfo";
import questionmark from "../../../assets/Task/Questionmark.png";
import levelUpBoostImg from "../../../assets/Task/1levelup.png";
import twoXBoostImg from "../../../assets/Task/2xboost.png";
import threeXBoostImg from "../../../assets/Task/3xboost.png";
import fiveXBoostImg from "../../../assets/Task/5xboost.png";
import tapBoosterImg from "../../../assets/Task/TapBoost.png";
import thousandPointsImg from "../../../assets/Task/1000points.png";
import fiveThousandPointsImg from "../../../assets/Task/5000points.png";
import betterLuckNextTimeImg from "../../../assets/Task/nexttime.png";
import Spinner from "../../Streak/Spinner";
import logo from "../../../assets/images/meme-logo.svg";

import {
  getUserDetails,
  purchaseGameCards,
  userGameRewards,
} from "../../../apis/user";
import cancelIcon from "../../../assets/Task/cancelicon.png";
// import useUserInfo from "../../../Hooks/useUserInfo";
import Tv from "../../Tv/Tv";
import Menu from "../../menu/menu";

const cardContents = [
  "levelUp",
  "2x",
  "3x",
  "5x",
  "tap",
  "1000 points",
  "5000 points",
  "Better luck next time",
  "Better luck next time",
];
const cardImages = {
  levelUp: levelUpBoostImg,
  "2x": twoXBoostImg,
  "3x": threeXBoostImg,
  "5x": fiveXBoostImg,
  tap: tapBoosterImg,
  "1000 points": thousandPointsImg,
  "5000 points": fiveThousandPointsImg,
  "Better luck next time": betterLuckNextTimeImg,
};

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const loadResults = () => {
  const results = localStorage.getItem("gameResults");
  return results ? JSON.parse(results) : { points: 0, boosts: [] };
};
const saveResults = async (results) => {
  localStorage.setItem("gameResults", JSON.stringify(results));
};

const loadSelectedCards = () => {
  const selectedCards = localStorage.getItem("selectedCards");
  const lastCardDate = localStorage.getItem("lastCardDate");
  const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format

  // If the cards exist and it's the same day, return the saved cards
  if (lastCardDate === today) {
    return selectedCards ? JSON.parse(selectedCards) : Array(9).fill(null);
  } else {
    let updatedResults = {
      points: 0,
      boosts: [],
    };
    localStorage.setItem("gameResults", JSON.stringify(updatedResults));
    return Array(9).fill(null);
  }
};

const saveSelectedCards = (cards) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const selectedCardsInLocal = localStorage.getItem("selectedCards");
  localStorage.setItem("lastCardDate", today); // Save today's date as lastCardDate
  if (selectedCardsInLocal) {
    localStorage.setItem("selectedCards", JSON.stringify(cards));
  } else {
    localStorage.setItem("selectedCards", JSON.stringify(Array(9).fill(null)));
  }
};

const loadPlaysRemaining = (date) => {
  const savedPlays = localStorage.getItem("playsRemaining");
  const lastPlayDate = localStorage.getItem("lastPlayDate");
  const today = new Date(date).toISOString().split("T")[0];
  if (lastPlayDate !== today) {
    return 5; // Reset to 5 if a new day
  }
  return savedPlays ? JSON.parse(savedPlays) : 5;
};

const savePlaysRemaining = (remaining, date) => {
  const today = new Date(date).toISOString().split("T")[0];
  localStorage.setItem("playsRemaining", JSON.stringify(remaining));
  localStorage.setItem("lastPlayDate", today);
};

const loadPurchasesRemaining = (date) => {
  const savedPurchases = localStorage.getItem("purchasesRemaining");
  const lastPurchaseDate = localStorage.getItem("lastPurchaseDate");
  const today = new Date(date).toISOString().split("T")[0];
  if (lastPurchaseDate !== today) {
    return 4; // Reset to 5 if a new day
  }

  return savedPurchases ? JSON.parse(savedPurchases) : 5;
};

const savePurchasesRemaining = (remaining, date) => {
  const today = new Date(date).toISOString().split("T")[0];
  localStorage.setItem("purchasesRemaining", JSON.stringify(remaining));
  localStorage.setItem("lastPurchaseDate", today);
};

const generateCardContents = () => shuffleArray([...cardContents]);

const PickaWord = () => {
  const [cards, setCards] = useState(loadSelectedCards());
  const { userDetails, updateUserInfo } = useUserInfo();
  // const [selected, setSelected] = useState(false);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [playsRemaining, setPlaysRemaining] = useState(
    loadPlaysRemaining(userDetails?.userDetails?.lastLogin)
  );
  const [purchasesRemaining, setPurchasesRemaining] = useState(
    loadPurchasesRemaining(userDetails?.userDetails?.lastLogin)
  );
  const [results, setResults] = useState(loadResults());
  const [selectedCard, setSelectedCard] = useState(null);
  const [randomContents, setRandomContents] = useState(generateCardContents());
  const [selectedCards, setSelectedCards] = useState(loadSelectedCards()); // New state for selected cards
  const [claimButtonLoading, setClaimButtonLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showComeBackTomorrow, setShowComeBackTomorrow] = useState(false);

  // Save selected cards to local storage whenever they change
  useEffect(() => {
    saveSelectedCards(selectedCards);
  }, [selectedCards]);

  useEffect(() => {
    savePurchasesRemaining(
      purchasesRemaining,
      userDetails?.userDetails?.lastLogin
    ); // Save purchasesRemaining whenever it changes
  }, [purchasesRemaining]);

  useEffect(() => {
    // Check if both purchases and plays are zero
    if (purchasesRemaining === 0 && playsRemaining === 0) {
      // Set a delay of 1 second to show "COME BACK TOMORROW"
      const timer = setTimeout(() => {
        setShowComeBackTomorrow(true);
      }, 1000);

      // Cleanup function to clear the timeout if component unmounts or dependencies change
      return () => clearTimeout(timer);
    } else {
      // Reset the message state if the conditions change
      setShowComeBackTomorrow(false);
    }
  }, [purchasesRemaining, playsRemaining]);

  const handleCardClick = async (index) => {
    console.log("Set Plays Remaining" + playsRemaining);
    if (playsRemaining <= 0) {
      setShowPopup(true);
      return;
    }
    if (cards[index] === null) {
      handleFreePick();
      const newCards = [...cards];
      const cardContent = randomContents[index];
      newCards[index] = cardContent;
      setCards(newCards);
      setSelectedCard(cardContent);
      let selectedCardsArray = selectedCards;
      selectedCardsArray[index] = cardContent;
      setSelectedCards(selectedCardsArray); // Update the selected cards state and save to local storage
      saveSelectedCards(selectedCards);
      let newPoints = points;
      let newMessage = "";
      if (cardContent === "1000 points") {
        newPoints += 1000;
        newMessage = "1000 points added!";
      } else if (cardContent === "5000 points") {
        newPoints += 5000;
        newMessage = "5000 points added!";
      } else if (["2x", "3x", "5x", "levelUp", "tap"].includes(cardContent)) {
        newMessage = `${cardContent} boost added!`;
      } else if (cardContent === "Better luck next time") {
        newMessage = "Better luck next time!";
      } else {
        newMessage = `${cardContent} added!`;
      }
      setPoints(newPoints);
      setMessage(newMessage);
      let currentResult = {
        points: cardContent.includes("points")
          ? parseInt(cardContent.split(" ")[0])
          : 0,
        boosts: [],
      };
      if (["2x", "3x", "5x", "levelUp", "tap"].includes(cardContent)) {
        currentResult.boosts.push(cardContent);
      }
      let updatedResults = {
        points: results.points + currentResult.points,
        boosts: [...results?.boosts, ...currentResult.boosts],
      };
      await saveResults(updatedResults);
      setResults(updatedResults);
      if (playsRemaining === 1) {
        setTimeout(() => {
          setShowPopup(true);
        }, 1000);
      }
      const apiData = {
        telegramId: String(userDetails.userDetails?.telegramId),
        gamePoints: String(currentResult.points),
        boosters: currentResult.boosts,
      };
      await userGameRewards(apiData);
      savePlaysRemaining(
        playsRemaining - 1,
        userDetails?.userDetails?.lastLogin
      );
    }
  };
  const handleFreePick = () => {
    // setCards(Array(9).fill(null));
    setPoints(0);
    setMessage("");
    setRandomContents(generateCardContents());
    setPlaysRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    if (playsRemaining === 0) {
      setShowPopup(false);
    }
    setSelectedCard(null);
  };

  const handlePlayAgain = async () => {
    if (purchasesRemaining <= 0) {
      setTimeout(() => {
        setMessage("Come back tomorrow for more plays!");
      }, 1000); // 1000 milliseconds = 1 second
      return;
    }
    setClaimButtonLoading(true);
    const res = await purchaseGameCards({
      telegramId: String(userDetails.userDetails.telegramId),
      gamePoints: String(500),
    });
    if (res === "Not enough points available") {
      setMessage("Not enough points available");
      setShowPopup(false);
      return;
    }

    // Deduct the purchase first to ensure it's done before anything else
    setPurchasesRemaining((prev) => prev - 1); // Deduct a purchase
    setPlaysRemaining(1); // Set playsRemaining to 1 after purchase

    // Save plays remaining immediately
    savePlaysRemaining(1, userDetails?.userDetails?.lastLogin);

    // Fetch user details and make the purchase

    // Reset the game state
    // setCards(Array(9).fill(null));
    // setSelected(false);
    // setPoints(0);
    setMessage("");
    setShowPopup(false);
    setRandomContents(generateCardContents());
    setClaimButtonLoading(false);
    // setSelectedCard(null);
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
    <div className="task-page">
      <img
        onClick={() => {
          toogleMenu(Tv, "Tv");
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer" }}
      />
      <div className="">
        <h2 className="welcome-text mb15">Pick a Card</h2>
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card !== null ? "flipped" : ""}`}
            onClick={
              purchasesRemaining === 0 && playsRemaining === 0
                ? null
                : () => handleCardClick(index)
            }
          >
            <div className="card-inner">
              <div className="card-front">
                {card === null ? <img src={questionmark} alt="?" /> : null}
              </div>
              <div className="card-back">
                {card !== null ? (
                  <img src={cardImages[card]} alt={card} />
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showComeBackTomorrow ? (
        <h5 className="chancesleft">COME BACK TOMORROW</h5>
      ) : message === "Not enough points available" ? (
        <h5 className="chancesleft">INSUFFICIENT POINTS</h5>
      ) : playsRemaining != 0 && purchasesRemaining == 4 ? (
        <h5 className="chancesleft">
          YOU HAVE {playsRemaining}/5 CHANCES LEFT TODAY
        </h5>
      ) : (
        <h5 className="chancesleft">
          YOU HAVE {playsRemaining}/{purchasesRemaining} CHANCES LEFT NOW
        </h5>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            {purchasesRemaining !== 4 ? (
              <>
                <h2 className="epic">
                  {selectedCard &&
                    selectedCard !== "Better luck next time" &&
                    "Epic Win!"}
                </h2>
                <img
                  src={cancelIcon}
                  className="cancel-img"
                  onClick={handleFreePick}
                />
                <div className="row text-center">
                  <div className="col-12">
                    <div className="epic-div">
                      {selectedCard && (
                        <img
                          src={cardImages[selectedCard]}
                          alt={cardImages[selectedCard]}
                          className="popup-card-image"
                        />
                      )}
                      {selectedCard ? (
                        <h3 className="rw-popup">you got {selectedCard}!</h3>
                      ) : (
                        <h3 className="rw-popup">FOR AN EXTRA PICK</h3>
                      )}
                    </div>
                  </div>
                </div>
                {playsRemaining > 0 ? (
                  <button className="btn-reward" onClick={handleFreePick}>
                    Pick Next
                  </button>
                ) : purchasesRemaining != 0 ? (
                  selectedCard ? (
                    <>
                      <p className="pick-para">PICK AGAIN</p>
                      <button
                        className="btn-reward"
                        onClick={() => {
                          handlePlayAgain();
                        }}
                      >
                        {claimButtonLoading ? (
                          <Spinner />
                        ) : (
                          <p className="pickcard-points">
                            <img
                              style={{
                                width: "25px",
                              }}
                              src={logo}
                            ></img>{" "}
                            500
                          </p>
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn-reward"
                        onClick={() => {
                          handlePlayAgain();
                        }}
                      >
                        {claimButtonLoading ? (
                          <Spinner />
                        ) : (
                          <p className="pickcard-points">
                            <img
                              style={{
                                width: "25px",
                              }}
                              src={logo}
                            ></img>{" "}
                            500
                          </p>
                        )}
                      </button>
                    </>
                  )
                ) : null}
              </>
            ) : (
              <>
                <h2 className="epic">{selectedCard && "Epic Win!"}</h2>
                <img
                  src={cancelIcon}
                  className="cancel-img"
                  onClick={handleFreePick}
                />
                <div className="row text-center">
                  <div className="col-12">
                    <div className="epic-div">
                      {selectedCard && (
                        <>
                          {selectedCards.map((card, index) =>
                            card ? (
                              <img
                                key={index}
                                src={card ? cardImages[card] : questionmark}
                                alt={card || "Question Mark"}
                                className="popup-card-image-popup"
                              />
                            ) : null
                          )}
                        </>
                      )}
                      {/* {selectedCard ? (
                        results.points > 0 && results.boosts.length > 0 ? (
                          <h3 className="rw-popup">
                            You won {results.points} points and{" "}
                            {results.boosts.join(", ")} boosters!
                          </h3>
                        ) : results.points === 0 &&
                          results.boosts.length === 0 ? (
                          <h3 className="rw-popup">Better luck next time!</h3>
                        ) : results.boosts.length === 0 ? (
                          <h3 className="rw-popup">
                            You won {results.points} points
                          </h3>
                        ) : results.points === 0 ? (
                          <h3 className="rw-popup">
                            You won {results.boosts.join(", ")} boosters!
                          </h3>
                        ) : (
                          <h3 className="rw-popup">
                            You won {results.points} points and{" "}
                            {results.boosts.join(", ")} boosters!
                          </h3>
                        )
                      ) : (
                        <h3 className="rw-popup">FOR AN EXTRA PICK</h3>
                      )} */}
                      {selectedCard ? null : (
                        <h3 className="rw-popup">FOR AN EXTRA PICK</h3>
                      )}
                    </div>
                  </div>
                </div>
                {purchasesRemaining !== 0 ? (
                  selectedCard ? (
                    <>
                      <p className="pick-para">PICK AGAIN</p>
                      <button
                        className="btn-reward"
                        onClick={() => {
                          handlePlayAgain();
                        }}
                      >
                        {claimButtonLoading ? (
                          <Spinner />
                        ) : (
                          <p className="pickcard-points">
                            <img
                              style={{
                                width: "25px",
                              }}
                              src={logo}
                            ></img>{" "}
                            500
                          </p>
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn-reward"
                        onClick={() => {
                          handlePlayAgain();
                        }}
                      >
                        {claimButtonLoading ? (
                          <Spinner />
                        ) : (
                          <p className="pickcard-points">
                            <img
                              style={{
                                width: "25px",
                              }}
                              src={logo}
                            ></img>{" "}
                            500
                          </p>
                        )}
                      </button>
                    </>
                  )
                ) : null}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PickaWord;
