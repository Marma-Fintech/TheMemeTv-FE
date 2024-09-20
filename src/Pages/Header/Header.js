import React, { useEffect, useState } from "react";
import Info from "../Info/Info";
import "./Header.css";
import useUserInfo from "../../Hooks/useUserInfo";
import Introimg from "../../assets/images/introLogo.png";
import mtvLogo from "../../assets/images/logo.png";

const Header = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
  const [refId, setRefId] = useState("");
  useEffect(() => {
    // Parse the URL to get the referral code
    const urlParams = new URLSearchParams(window.location.search);
    const referredIdFromUrl = urlParams.get("start");
    setRefId(referredIdFromUrl);
  }, []);

  useEffect(() => {
    // Initialize the Telegram WebApp
    window.Telegram.WebApp.ready();

    // Fetch user details
    const userData = window.Telegram.WebApp.initDataUnsafe.user;

    if (userData) {
      updateUserInfo((prev) => {
        return {
          ...prev,
          ...{
            telegramDetails: userData,
          },
        };
      });
    } else {
    }
  }, []);

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
    <div>
      <div className="header-part">
        <div className="row topbar-menu">
          <div className="col-3">
            <div className="header-logo">
              <img src={Introimg} style={{ width: "100px" }} />
            </div>
          </div>
          <div className="col-9">
            <ul className="top-bar align-items-center d-flex gap-2">
              <li
                className="nav-bar"
                onClick={() => {
                  goToThePage(Info, "InfoPage");
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1550_1471)">
                    <path
                      d="M9.99935 1.66602C5.39935 1.66602 1.66602 5.39935 1.66602 9.99935C1.66602 14.5993 5.39935 18.3327 9.99935 18.3327C14.5993 18.3327 18.3327 14.5993 18.3327 9.99935C18.3327 5.39935 14.5993 1.66602 9.99935 1.66602ZM9.99935 14.166C9.54102 14.166 9.16602 13.791 9.16602 13.3327V9.99935C9.16602 9.54102 9.54102 9.16602 9.99935 9.16602C10.4577 9.16602 10.8327 9.54102 10.8327 9.99935V13.3327C10.8327 13.791 10.4577 14.166 9.99935 14.166ZM10.8327 7.49935H9.16602V5.83268H10.8327V7.49935Z"
                      fill="#B2BA0D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1550_1471">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </li>
              <li className="nav-bar token">
                <img
                  src={mtvLogo}
                  style={{ width: "30px", fontSize: "10px" }}
                />
                {/* &nbsp;2536 Mtv */}
                {userDetails.telegramDetails.id}
                {refId}
              </li>
              <li className="nav-bar profile">
                <img src={mtvLogo} style={{ width: "35px" }} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
