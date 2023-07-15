import React,{useState,useEffect} from "react";
import PixelCanvas from "../components/PixelCanvas";
import {CompactPicker} from "react-color";

import styled from "styled-components";

const ButtonWrapper = styled.button`
  width: ${(props) => (props.width ? props.width : "30%")};
  height: "auto";
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 24px;
  padding: 20px 40px 20px 40px;
  border: 2px solid black;
  margin: "auto";
`;


export default function Canvas() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#f44336');

  const changeColorHandler = (color) => {
    setSelectedColor(color.hex);
  };
  
  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if(!ethereum) {
        console.log("You need to have Metamask installed!");
    } 

    try {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        setCurrentAccount(accounts[0]);
    } catch (e) {
        console.log(e);
    }
}
  const checkWalletConnection = async () => {
    const { ethereum } = window;
    if (!ethereum)
    {
        console.log("You need to have Metamask installed!");
        return;
    }
    else
    {
        console.log("Metamask is installed.");
    }
  
    const accounts = await ethereum.request({method: "eth_accounts" });
  
    if (accounts.length > 0)
    {
        const account = accounts[0];
        setCurrentAccount(account);
    }
  }

  useEffect(() => {
    checkWalletConnection();
  }, [])


  return (
    <div id="editor">
      <ButtonWrapper onClick={connectWalletHandler}>
        <p>{currentAccount ? currentAccount : "connect to wallet"}</p>
      </ButtonWrapper>
          <CompactPicker 
            color={selectedColor} 
            onChangeComplete={changeColorHandler}
          />

          <PixelCanvas 
            width={32}
            height={32}
            selectedColor={selectedColor}
          />  
    </div> 
  )
}