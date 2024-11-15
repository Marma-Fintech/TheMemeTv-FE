import React, { useEffect, useState } from "react";
import "./ReferPage.css";
import useUserInfo from "../../Hooks/useUserInfo";
import Invite from "../../assets/images/Invitefriends.png";
import { myReferrel } from "../../apis/user";
import Milestone from "../Milestone/milestone";
import { RWebShare } from "react-web-share";
import Tv from "../Tv/Tv";
import cancelIcon from "../../assets/Task/cancelicon.png";
import copy from "../../assets/images/copy.png";

const ReferPage = () => {
  const { userDetails, updateUserInfo } = useUserInfo();

  const [referrals, setReferrals] = useState([]);

  const getMyReferralList = async () => {
    const referrals = await myReferrel(
      String(userDetails?.userDetails?.telegramId)
    );

    setReferrals(referrals.referrals);
  };

  useEffect(() => {
    getMyReferralList();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      updateUserInfo((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }, 1000);
  }, []);

  const shareToTelegram = () => {
    const url = encodeURIComponent(
      `https://t.me/the_meme_tv_bot?start=${userDetails?.userDetails?.refId}`
    );
    const text = encodeURIComponent("My referrel");
    const telegramUrl = `https://t.me/share/url?url=${url}&text=${text}`;

    window.open(telegramUrl, "_blank");
  };

  const goToTheMilstonePage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: userDetails?.userDetails?.currentComponent,
      lastComponentText: userDetails?.userDetails?.currentComponentText,
      refererCount: userDetails?.userDetails?.refererCount + 1,
    }));
  };

  const toogleMenu = () => {
    updateUserInfo((prev) => ({
      ...prev,
      isPlay: false,
      currentComponent: Tv,
      currentComponentText: "TVPage",
      lastComponent: userDetails?.userDetails.currentComponent,
      lastComponentText: userDetails?.userDetails.currentComponentText,
      isMenu: true,
      menuCount: userDetails?.userDetails?.menuCount + 1,
    }));
  };

  return (
    <div className="info-img menupointer">
      <img
        onClick={() => {
          toogleMenu();
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer", pointerEvents: "all" }}
      />
      <div
        className="menupointer"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          pointerEvents: "all",
          marginTop: "60px",
        }}
      >
        <div className="col-9 phasediv">
          <h3>
            <img src={Invite} />
          </h3>
          <p className="refer-earn">
            EARN 10,000 MEMETV TOKENS <br />& <br />5 2X BOOSTERS FOR EVERY
            REFERRAL
          </p>
        </div>
        <div className="row d-flex align-items-center justify-content-center">
          {/* <div className="refer-head" style={{ width: "100%" }}>
            <p className="refer-earn">EARN 10,000 MEMETV TOKENS</p>
            <p className="refer-earn">&</p>
            <p className="refer-earn">5 2X BOOSTERS FOR EVERY REFERRAL</p>

            <p
              className="works-p"
              onClick={() => {
                goToTheMilstonePage(Milestone, "Milestone");
              }}
            >
              HoW IT’S WORK
            </p>
          </div> */}
        </div>
        <div className="col-9 mt-20 refer">
          <div className="row claim-ref">
            <div className="col-8">
              <h2
                className="refer-table text-color"
                style={{ fontSize: "14px", textAlign: "left" }}
              >
                {" "}
                MY REFERRALS
              </h2>
              {/* <h2 className="refer-table text-color">MILESTONES</h2> */}
            </div>
            <div className="col-4">
              <h2
                onClick={() => {
                  goToTheMilstonePage(Milestone, "Milestone");
                }}
                className=""
                style={{
                  fontSize: "12px",
                  textAlign: "right",
                  color: "yellow",
                  textDecorationLine: "underline",
                }}
              >
                MILESTONES
              </h2>
            </div>

            <div className="col-4"></div>
          </div>

          <table className="table table-dark">
            <tbody>
              {referrals.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.totalRewards}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div
            className="invite-fri"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <h2
              onClick={() => {
                shareToTelegram();
              }}
            >
              invite Friends
            </h2>
            <div
              onClick={() => {
                navigator.clipboard
                  .writeText(
                    `https://t.me/the_meme_tv_bot?start=${userDetails?.userDetails?.refId}`
                  )
                  .then(() => {})
                  .catch((err) => {
                    console.error("Failed to copy text: ", err);
                  });
              }}
            >
              <img
                src={copy}
                style={{ marginLeft: "20px", marginBottom: "10px" }}
              />
            </div>

            {/* <RWebShare
              data={{
                text: "Like humans, flamingos make friends for life",
                url: `https://t.me/the_meme_tv_bot?start=${userDetails?.userDetails?.refId}`,
                title: "",
              }}
              onClick={() => console.log("shared successfully!")}
              // disableNative={true}
            >
              <h2>invite Friends</h2>
            </RWebShare> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferPage;
