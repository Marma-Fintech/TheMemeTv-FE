import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Carousel from "react-spring-3d-carousel";
import boost2 from "../../assets/images/2xboost.png";
import boost3 from "../../assets/images/3xboost.png";
import boost5 from "../../assets/images/5xboost.png";
import rightArrow from "../../assets/images/rightarrow.png";
import leftArrow from "../../assets/images/leftArrow.png";
import useUserInfo from "../../Hooks/useUserInfo";
import Card from "./Card";
import { UserDeatils } from "../../apis/user";

const Boosters = () => {
  const [currentSlide, setCurrentSlide] = useState(2);
  const { userDetails, watchScreen, updatewatchScreenInfo, updateUserInfo } =
    useUserInfo();

  const [boosters, setBooster] = useState({
    levelUp: 0,
    tap: 10,
    "2x": 2,
    "3x": 30,
    "5x": 50,
  });

  const [boosterSlides, setBoosterSlides] = useState([]);

  // var userBoosters = [
  //   "levelUp",
  //   "levelUp",
  //   "levelUp",
  //   "tap",
  //   "tap",
  //   "2x",
  //   "3x",
  //   "5x",
  // ];

  var bossters = { levelUp: 0, tap: 0, "2x": 0, "3x": 0, "5x": 0 };

  var allSlides = [];

  useEffect(() => {
    const mapBoosters = watchScreen?.boostersList?.map((item) => {
      bossters[item] = bossters[item] + 1;
    });
    setBooster(bossters);
  }, [watchScreen]);

  useEffect(() => {
    const slides = Object.entries(boosters).map(([key, value], index) => ({
      key: index,
      content: <Card key={index} item={{ key, value }} />,
    }));
    setBoosterSlides(slides);
  }, [boosters]);

  const slides = [
    {
      key: 1,
      content: <Card />,
    },
    // {
    //   key: 2,
    //   content: <img src={boost3} alt="2" style={{ opacity: 1 }} />,
    // },
    // {
    //   key: 3,
    //   content: <img src={boost5} alt="3" style={{ opacity: 1 }} />,
    // },
  ];

  return (
    <div
      className="menupointer"
      style={
        userDetails?.isTutorial
          ? {
              height: "50%",
              width: "100%",
              position: "relative",
              display: "flex",
              flexDirection: "row",
              opacity: 0.5,
            }
          : {
              height: "50%",
              width: "100%",
              position: "relative",
              display: "flex",
              flexDirection: "row",
            }
      }
    >
      <div
        style={{
          width: "25%",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          setCurrentSlide(currentSlide - 1);
        }}
      >
        <img src={leftArrow} style={{ width: "25%" }} />
      </div>
      <div
        style={{
          width: "50%",
          color: "white",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <Carousel
          style={{ width: "100%", opacity: 0 }}
          slides={boosterSlides}
          // offset={500}
          opacity={1}
          goToSlide={currentSlide}
        />
      </div>

      <div
        style={{
          width: "25%",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          setCurrentSlide(currentSlide + 1);
        }}
      >
        <img src={rightArrow} style={{ width: "25%" }} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          position: "absolute",
        }}
      ></div>
    </div>
  );
};

export default Boosters;
