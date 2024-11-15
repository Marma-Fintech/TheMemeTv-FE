import React from "react";
import PhaseDetails from "../PhaseDetails/PhaseDetails";
import useUserInfo from "../../Hooks/useUserInfo";
import "../PhaseDetails/PhaseDetails.css";
import Tv from "../Tv/Tv";
import cancelIcon from "../../assets/Task/cancelicon.png";
import Totalpoints from "../TotalPoints/TotalPoints";

const Info = () => {
  const { userDetails, updateUserInfo } = useUserInfo();

  const toogleMenu = () => {
    updateUserInfo((prev) => ({
      ...prev,
      isPlay: false,
      currentComponent: Totalpoints,
      currentComponentText: "TotalpointsPage",
      lastComponent: userDetails?.userDetails.currentComponent,
      lastComponentText: userDetails?.userDetails.currentComponentText,
      isMenu: false,
      menuCount: userDetails?.userDetails?.menuCount + 1,
    }));
  };

  return (
    <div className="info-img">
      <img
        onClick={() => {
          toogleMenu();
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer", pointerEvents: "all" }}
      />

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
        <div style={{ maxWidth: "380px" }}>
          <div className="phase-details">
            <h3>Here’s how it works</h3>
          </div>
          <div className="phase-para1">
            <p className="font-2">
              doNothing, <br />
              YOU GET POINTS
            </p>
            <p className="font-2">
              TAP, <br />
              YOU GET POINTS
            </p>
            <p className="font-2">
              PLAY GAMES, <br />
              YOU GET POINTS
            </p>
            <p className="font-2">
              MAINTAIN STREAK, <br />
              YOU GET POINTS
            </p>
            <p className="font-2">
              STAKE, <br />
              YOU GET POINTS
            </p>
            <h3 className="fonth3">REPEAT !!!</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Info;
