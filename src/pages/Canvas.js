import React,{useState,useEffect} from "react";
import PixelCanvas from "../components/PixelCanvas";
import TimeDisplay from "../components/TimeDisplay";
import {CompactPicker} from "react-color";
import { dragonforgedAPI } from '../util/apiCall';
import { useWeb3Context } from '../util/Web3Context';
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";


const ButtonWrapper = styled.button`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: "auto";
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 24px;
  padding: 10px 40px 10px 40px;
  border: 6px solid black;
  margin: "auto";
`;


export default function Canvas() {
  const [selectedColor, setSelectedColor] = useState('#f44336');
  const [freePixelTime, setFreePixelTime] = useState(null);
  const {currentAccount,checkWalletConnection, mintNFTs, buyPremiumPixels} = useWeb3Context();


  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await dragonforgedAPI.getFreePixelTime(currentAccount);
        if (res) {
          setFreePixelTime(res -  Date.now());
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

  const setNextPixelTime = (nextPixelTime) => {
    setFreePixelTime(nextPixelTime);
  };

  let imageData;

  const mintCanvas = async (imgData) => {
    imageData = imgData;
    let txn = await mintNFTs();
    console.log(txn);
    if(txn)
    {
    uploadData(txn);
    }
  }

  /*const buyPixels = async () => {
    let txn = await buyPremiumPixels();
    console.log(txn);
  }*/


const uploadData = async (tokenId) => {
  try {
    let res = await dragonforgedAPI.uploadData(tokenId, imageData);
    console.log("result is " + res);
    if (res) {
      console.log(res);
    }
  }
  catch (e) {
    alert(e);
  }
}


  return (
    <div id="editor">
    <h1 style={{fontSize: "5em", color: "lime"}}>Canto Canvas</h1>
    <p>by Dragonforged Games</p>
    <Col>
    <Row>
    <div style={{height: "20px"}}></div>
    <ButtonWrapper onClick={connectWalletHandler}>
        <p>{currentAccount ? currentAccount : "connect to wallet"}</p>
      </ButtonWrapper>
    </Row>
    <div style={{height: "20px"}}></div>
      <Row>
      <Col>
      <CompactPicker
        color={selectedColor} 
        onChangeComplete={changeColorHandler}
      />
      </Col>
      <Col>
        <TimeDisplay pixelTime={freePixelTime} />
      </Col>
      <div style={{height: "20px"}}></div>
      </Row>
      

      <PixelCanvas 
        selectedColor={selectedColor}
        MintNFT={mintCanvas}
        setNextPixelTime={setNextPixelTime}
      />
      
      </Col>
    </div> 
  )
}