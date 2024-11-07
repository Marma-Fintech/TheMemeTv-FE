import React from "react";
import "./ConnectWallet.css";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import { TonConnectButton, TonConnectUIProvider } from "@tonconnect/ui-react";
import useUserInfo from "../../Hooks/useUserInfo";
import ConnectWalletPage from "../../Pages/ConnectWallet/ConnectWalletPage";
import Tv from "../Tv/Tv";
import cancelIcon from "../../assets/Task/cancelicon.png";

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
        className="menupointer"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
          marginTop: "100px",
          flexDirection: "column",
          pointerEvents: "all",
        }}
        onClick={() => {
          goToThePage(ConnectWallet, "ConnectWalletPage");
        }}
      >
        <div
          style={{
            maxWidth: "380px",
          }}
        >
          <TonConnectUIProvider manifestUrl="https://sapphire-large-cougar-300.mypinata.cloud/ipfs/QmYaJ9J2XgrPVsj6hQc5M2M23Wf41DwRvJptcKPKQXmr8N">
            <div className="phase-details">
              {/* <h4 className="airdrop-tasks">AIRDROP TASKS</h4>
              <h4 className="airdrop">
                Get ready for upcoming tasks! Soon, you'll see a list of
                challenges below. Complete them to qualify for the Airdrop
              </h4>
              <br />
              <h1 className="taskList">TASK LIST</h1> */}
              <ConnectWalletPage></ConnectWalletPage>
            </div>
          </TonConnectUIProvider>
        </div>
      </div>
    </div>
  );
};

export default Info;
