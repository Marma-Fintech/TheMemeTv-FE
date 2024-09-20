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
    return 5; // Reset to 5 if a new day
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
  const [cards, setCards] = useState(Array(9).fill(null));
  const { userDetails, updateUserInfo } = useUserInfo();
  const [selected, setSelected] = useState(false);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [playsRemaining, setPlaysRemaining] = useState(
    loadPlaysRemaining(userDetails?.userDetails?.lastLogin)
  );
  const [purchasesRemaining, setPurchasesRemaining] = useState(
    loadPurchasesRemaining(userDetails?.userDetails?.lastLogin)
  );
  const [results, setResults] = useState(loadResults());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [randomContents, setRandomContents] = useState(generateCardContents());

  useEffect(() => {
    savePurchasesRemaining(
      purchasesRemaining,
      userDetails?.userDetails?.lastLogin
    ); // Save purchasesRemaining whenever it changes
  }, [purchasesRemaining]);
  const handleCardClick = async (index) => {
    if (playsRemaining <= 0) {
      setShowPopup(true);
      return;
    }
    if (!selected && cards[index] === null) {
      const newCards = [...cards];
      const cardContent = randomContents[index];
      newCards[index] = cardContent;
      setCards(newCards);
      setSelected(true);
      setSelectedCard(cardContent);
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
      setTimeout(() => {
        setShowPopup(true);
      }, 1000);
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
    setCards(Array(9).fill(null));
    setSelected(false);
    setPoints(0);
    setMessage("");
    setRandomContents(generateCardContents());
    setPlaysRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    setShowPopup(false);
    setSelectedCard(null);
  };

  const handlePlayAgain = async () => {
    if (purchasesRemaining <= 0) {
      setMessage("Come back tomorrow for more plays!");
      return;
    }

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
    setCards(Array(9).fill(null));
    setSelected(false);
    setPoints(0);
    setMessage("");
    setRandomContents(generateCardContents());
    setShowPopup(false);
    setSelectedCard(null);
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
      {purchasesRemaining === 0 && playsRemaining === 0 ? (
        <h5 className="chancesleft">Come back tomorrow</h5>
      ) : message === "Not enough points available" ? (
        <h5 className="chancesleft">Not enough Game points available</h5>
      ) : (
        <h5 className="chancesleft">
          YOU HAVE {playsRemaining}/5 CHANCES LEFT NOW
        </h5>
      )}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            {playsRemaining > 1 ? (
              <>
                <h2 className="epic">
                  {selectedCard !== "Better luck next time" && "Epic Win!"}
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
                          alt={selectedCard}
                          className="popup-card-image"
                        />
                      )}
                      <h3 className="rw-popup">You got {selectedCard}!</h3>
                    </div>
                  </div>
                </div>
                <button className="btn-reward" onClick={handleFreePick}>
                  Free Pick
                </button>
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
                        <img
                          src={cardImages[selectedCard]}
                          alt={selectedCard}
                          className="popup-card-image"
                        />
                      )}
                      {selectedCard ? (
                        <h3 className="rw-popup">You got {selectedCard}!</h3>
                      ) : (
                        <h3 className="rw-popup">Pay 500 for one Pick</h3>
                      )}
                    </div>
                  </div>
                </div>
                {purchasesRemaining !== 0 ? (
                  <button
                    className="btn-reward"
                    onClick={() => {
                      handlePlayAgain();
                    }}
                  >
                    500 Coins
                  </button>
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
