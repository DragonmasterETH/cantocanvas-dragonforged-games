import React,{useState,useEffect} from "react";
import PixelCanvas from "../components/PixelCanvas";
import TimeDisplay from "../components/TimeDisplay";
import {CompactPicker} from "react-color";
import { dragonforgedAPI } from '../util/apiCall';
import { useWeb3Context } from '../util/Web3Context';

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
  const [selectedColor, setSelectedColor] = useState('#f44336');
  const [freePixelTime, setFreePixelTime] = useState(null);
  //const [currentAccount, setCurrentAccount] = useState(Web3Context.currentAccount);
  const {currentAccount,checkWalletConnection} = useWeb3Context();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = null;//await dragonforgedAPI.getFreePixelTime(currentAccount);

        if (res) {
          setFreePixelTime(res.time -  Date.now());
        }
      }
      catch (e) {
        alert(e);
      }
   };
   fetchData();

  }, [currentAccount]);

  const changeColorHandler = (color) => {
    setSelectedColor(color.hex);
  };
  
  const connectWalletHandler = async () => {
    await checkWalletConnection();
  }

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
        selectedColor={selectedColor}
      />
      <TimeDisplay pixelTime={freePixelTime} />
    </div> 
  )
}