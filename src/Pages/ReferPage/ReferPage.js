import React, { useEffect, useState } from "react";
import "./ReferPage.css";
import useUserInfo from "../../Hooks/useUserInfo";
import Invite from "../../assets/images/Invitefriends.png";
import { myReferrel } from "../../apis/user";
import Milestone from "../Milestone/milestone";
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

  const shareToTelegram = () => {
    const url = encodeURIComponent(
      `https://t.me/mytestgetDetailsbot?start=${userDetails?.userDetails?.refId}`
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

  return (
    <div className="info-img menupointer">
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
        </div>
        <div
          className="row d-flex align-items-center justify-content-center 
            "
        >
          <div className="col-7 refer-head">
            <p className="refer-earn">
              Get a 10,000 MTV and 5 Booster for each referral
            </p>
            <p
              className="works-p"
              onClick={() => {
                goToTheMilstonePage(Milestone, "Milestone");
              }}
            >
              HoW IT WORK'S
            </p>
          </div>
        </div>
        <div className="col-9 mt-20">
          <div className="row claim-ref">
            <div className="col-8">
              <h2 className="refer-table text-color">My Referral</h2>
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
      <div
        className="row"
        onClick={() => {
          shareToTelegram();
        }}
      >
        <div className="col-12">
          <div className="invite-fri">
            <h2>invite Friends</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferPage;
