import React from "react";
// import "./milestone.css";
import logo from "../../assets/images/meme-logo.svg";
import Cup from "../../assets/images/cup.svg";
import cancelIcon from "../../../src/assets/Task/cancelicon.png";
import useUserInfo from "../../Hooks/useUserInfo";
import Refer from "../ReferPage/ReferPage";

const Milestone = () => {
  const { userDetails, updateUserInfo } = useUserInfo();

  const goToThePage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: "TVPage",
      lastComponent: userDetails.currentComponent,
      lastComponentText: userDetails.currentComponentText,
      centerCount: userDetails.centerCount + 1,
      isMenu: false,
    }));
  };
  return (
    <div className=" menupointer" style={{ maxWidth: "380px" }}>
      <img
        onClick={() => {
          goToThePage(Refer, "ReferPage");
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer" }}
      />
      <div className="phase-details">
        <h3>Here’s how it works</h3>
      </div>
      <div className="phase-para1">
        <p className="font-2">Create Your Unique Referral Link</p>
        <p>
          Click the "Invite" button to generate your personalized referral link.
          <hr style={{ margin: "10px", paddingBottom: "0px" }} />
        </p>
      </div>

      <div className="container" style={{ maxWidth: "320px" }}>
        <div className="row mt10 cheap-stuff">
          <div className="col-2">
            <img src={Cup} alt="milestone" className="image" />
          </div>
          <div className="col-7 stuff-text">
            <h4>INVITE 3 FRIENDS</h4>
            <p className="stuff-p">
              <img src={logo} /> +10,000
            </p>
          </div>
          <div className="col-3">
            {/* <button className="stuff-claim" style={{ cursor: "pointer" }}>
              CLAIM
            </button> */}
          </div>
        </div>

        <div className="row mt10 cheap-stuff">
          <div className="col-2">
            <img src={Cup} alt="milestone" className="image" />
          </div>
          <div className="col-7 stuff-text">
            <h4>INVITE 5 FRIENDS</h4>
            <p className="stuff-p">
              <img src={logo} /> +16,667
            </p>
          </div>
          <div className="col-3">
            {/* <button className="stuff-claim" style={{ cursor: "pointer" }}>
              CLAIM
            </button> */}
          </div>
        </div>

        <div className="row mt10 cheap-stuff">
          <div className="col-2">
            <img src={Cup} alt="milestone" className="image" />
          </div>
          <div className="col-7 stuff-text">
            <h4>INVITE 10 FRIENDS</h4>
            <p className="stuff-p">
              <img src={logo} /> +33,333
            </p>
          </div>
          <div className="col-3">
            {/* <button className="stuff-claim" style={{ cursor: "pointer" }}>
              CLAIM
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Milestone;
