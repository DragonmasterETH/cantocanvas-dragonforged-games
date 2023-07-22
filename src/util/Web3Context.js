import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import ABI from "./cantoCanvas.json";

const contractAddress = "0x23f8aE0d4b9C122dC57328086677C37fEe0EC721";
//const ABI = contract.abi;
const Web3Context = createContext();

export const useWeb3Context = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(null);

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
    try{
      const { ethereum } = window;
      if(!ethereum) {
          console.log("You need to have Metamask installed!");
          return;
      } else {
          console.log("Metamask is installed.");
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("accounts: " + accounts);
      if(accounts.length > 0) {
          const account = accounts[0];
          setCurrentAccount(account);
          setProvider(new ethers.providers.Web3Provider(ethereum));
      }
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1E14' }],
     })
    }
    catch (e){
      console.log(e);
    }
  };

  const mintNFTs = async () => {
    let price = 1;
    try{
        const { ethereum } = window;
    if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, ABI, signer);
        let balanceInEth;
        try{
        await provider.getBalance(currentAccount).then((balance) => {
            balanceInEth = ethers.utils.formatEther(balance)
            console.log(`balance: ${balanceInEth} CANTO`)
        })
      }
      catch(e)
      {
        console.error(e)
      }
        
           if(balanceInEth >= parseFloat(price).toFixed(2))
           {
            let nftTxn = await nftContract.mintNFT({value: ethers.utils.parseEther(((price).toFixed(2)).toString()) });

            await nftTxn.wait();

            let totalMinted = await nftContract.totalSupply();
            return totalMinted - 1;
           }
           else{
            alert("Sorry, pal, I can't give credit. Come back when you're a little, mmm... RICHER!");
            console.log(ethers.utils.parseEther(((price).toFixed(2)).toString()));
            console.log(balanceInEth);
           }
           return null;
    }

    } catch(e) {
        console.log(e);
    }

}

const buyPremiumPixels = async () => {
  let price = 1;
  try{
      const { ethereum } = window;
  if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(contractAddress, ABI, signer);
      let balanceInEth;
      try{
      await provider.getBalance(currentAccount).then((balance) => {
          balanceInEth = ethers.utils.formatEther(balance)
          console.log(`balance: ${balanceInEth} CANTO`)
      })
    }
    catch(e)
    {
      console.error(e)
    }
      
         if(balanceInEth >= parseFloat(price).toFixed(2))
         {
          let nftTxn = await nftContract.buyPremiumPixels({value: ethers.utils.parseEther(((price).toFixed(2)).toString()) });

          let receipt = await nftTxn.wait();
          return receipt;
         }
         else{
          alert("Sorry, pal, I can't give credit. Come back when you're a little, mmm... RICHER!");
          console.log(ethers.utils.parseEther(((price).toFixed(2)).toString()));
          console.log(balanceInEth);
         }
         return null;
  }

  } catch(e) {
      console.log(e);
  }

}

  const web3ContextValue = {
    currentAccount,
    checkWalletConnection,
    signMessage,
    verifySignature,
    mintNFTs,
    buyPremiumPixels
  };

  return (
    <Web3Context.Provider value={web3ContextValue}>
      {children}
    </Web3Context.Provider>
  );
};