import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3Context = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);

  // Signature For ChangeColor
  const signMessage = async (message) => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("You need to have Metamask installed!");
        return null;
      }

      await checkWalletConnection();

      const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
      const signature = await signer.signMessage(message);

      return signature;
    } catch (error) {
      console.error("Error signing message:", error);
      return null;
    }
  };

  // Verification
  const verifySignature = async (message, signature) => {
    try {
      const messageHash = ethers.utils.hashMessage(message);
      const signer = ethers.utils.verifyMessage(message, signature).toLowerCase();
      return signer == currentAccount;
    } catch (error) {
      console.error("Error verifying signature:", error);
      return false;
    }
  };

  const checkWalletConnection = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("You need to have Metamask installed!");
      return;
    } else {
      console.log("Metamask is installed.");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    }
  };

  const web3ContextValue = {
    currentAccount,
    checkWalletConnection,
    signMessage,
    verifySignature
  };

  return (
    <Web3Context.Provider value={web3ContextValue}>
      {children}
    </Web3Context.Provider>
  );
};