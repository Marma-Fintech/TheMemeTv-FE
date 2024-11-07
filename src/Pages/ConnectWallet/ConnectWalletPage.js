import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { toUserFriendlyAddress } from "@tonconnect/sdk";
import React, { useCallback, useEffect, useState } from "react";
import "./ConnectWallet.css";
import { userWalletAddress } from "../../apis/user";
import useUserInfo from "../../Hooks/useUserInfo";

export default function ConnectWalletPage() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { userDetails } = useUserInfo();

  const handleWalletConnection = useCallback((address) => {
    setTonWalletAddress(address);
    console.log("Wallet Connected Successfully! = " + address);
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress("");
    console.log("Wallet Disconnected Successfully!");
    setIsLoading(false);
    updateWalletAddress(" ");
  }, []);

  const updateWalletAddress = async (walletAddressString) => {
    // const userFriendlyAddress = toUserFriendlyAddress(tonWalletAddress);

    const data = {
      userWalletAddress: walletAddressString,
    };
    // update wallet address
    const response = await userWalletAddress(
      userDetails.userDetails.telegramId,
      data
    );
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };
    checkWalletConnection();

    const unSubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unSubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address) => {
    const userFriendlyAddress = toUserFriendlyAddress(address);
    updateWalletAddress(userFriendlyAddress);
    return `${userFriendlyAddress.slice(0, 4)}...${userFriendlyAddress.slice(
      -4
    )}`;
  };

  if (isLoading) {
    return (
      <main className="container">
        <div className="loading-text">Loading...</div>
      </main>
    );
  }

  return (
    <React.Fragment>
      <main className="container">
        {tonWalletAddress ? (
          <div>
            <p className="wallet-address">
              Connected: {formatAddress(tonWalletAddress)}
            </p>
            <button
              className="connectWallet-button"
              onClick={handleWalletAction}
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <div>
            <button
              className="connectWallet-button"
              onClick={handleWalletAction}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </main>
    </React.Fragment>
  );
}
