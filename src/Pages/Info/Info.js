import React from "react";
import useUserInfo from "../../Hooks/useUserInfo";
import PhaseDetails from "../PhaseDetails/PhaseDetails";
import "./info.css";
import Arrow from "../../assets/images/arrow.gif";
import Currency from "../../assets/images/currency.gif";
const Info = () => {
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
    <div className="info-img">
      <div
        className="menupointer "
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          pointerEvents: "all",
        }}
      >
        <div className="phasediv">
          <h3>
            YOU ARE IN
            <br />
            <span>PHASE 1</span>
          </h3>
        </div>
        <p className="info-p">Earn 1 token/sec for watching meme videos.</p>
        <div>
          <img src={Currency} style={{ width: "80px" }} />
        </div>
        <h3 className="info-content">
          Enjoy effortless rewards with our Watch & Earn feature!
        </h3>
        <p className="works-p">Here’s how it works</p>
        <div
          onClick={() => {
            goToThePage(PhaseDetails, "PhaseDetailsPage");
          }}
        >
          <img src={Arrow} style={{ width: "40px" }} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Info;
