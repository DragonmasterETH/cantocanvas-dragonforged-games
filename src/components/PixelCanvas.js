import React, { useState, useEffect, useRef } from 'react';
import Pixel from './Pixel';
import { dragonforgedAPI } from '../util/apiCall';
import { styled } from 'styled-components';
import html2canvas from 'html2canvas';

const objectHash = require('object-hash');

const ButtonWrapper = styled.button`
  width: ${(props) => (props.width ? props.width : "70%")};
  height: "auto";
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 24px;
  padding: 10px 20px 10px 20px;
  border: 6px solid black;
  margin: "auto";
`;

const PixelRow = styled.div`
  display: flex;
  width: fit-content;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 10px solid black;
`

export default function PixelCanvas({ selectedColor, setNextPixelTime, MintNFT }) {
  const componentRef = useRef();
  const [board, setBoard] = useState([]);
  const [grid, setGrid] = useState(<></>);
  
  async function convertToDataURI(){
    const element = componentRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');
    console.log(data);
    MintNFT(data);
  };

  const setBoardPixel = (pixelId,color,nextPixelTime) => {
    const newBoard = board; 
    newBoard[pixelId].currentColor = color;
    setBoard(newBoard);
    updateGrid();
    setNextPixelTime(nextPixelTime);
  };

  const getCurrentColor = () => {
    return selectedColor;
  };

  let rows = [];
  const updateGrid = async () => {
    if (board){
      rows = []
      let key = 10000;
      let height = Math.sqrt(board.length);
      let width = height;
      //console.log("useEffect2: " + board.length);
      for (let i = 0; i < height; i++) {
        let pixels = [];
        for (let j = 0; j < width; j++) {
          
          let pixelId = i*width + j;
          //console.log("pixelId=" + pixelId);
          let currentColor = board[pixelId].currentColor;
          //console.log("---currentColor is " + currentColor);

          pixels.push(<Pixel pixelId={pixelId+1} key={++key} selectedColor={selectedColor} serverColor={currentColor} setBoardPixel={setBoardPixel} getCurrentColor={getCurrentColor}/>);
        }
        //console.log("pixels=" + pixels);
        rows.push(<PixelRow key={++key}>{pixels}</PixelRow>)
      }
      //console.log("Updated grid");
      setGrid(rows);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (document.hasFocus()) {
        const hash = objectHash(board);

        try {
          let res = await dragonforgedAPI.getGrid(hash);
          console.log("getGrid returned: " + res);
          if (res && res.board) {
            res.board.sort((a, b) => a.pixelId - b.pixelId);
            console.log("getGrid if res");
            setBoard(res.board);
            updateGrid();
          }
        }
        catch (e) {
          alert(e);
        }
      }
    };

    fetchData();

    setInterval(function() {
      fetchData();
    }, 15000);

  }, []);
  
  
  useEffect(() => {
    updateGrid();
  }, [board,selectedColor]);

  return (
    <>
    <ButtonWrapper onClick={convertToDataURI}>
        <p>Mint Canvas as NFT for 25 Canto</p>
      </ButtonWrapper>
      <div style={{height: "20px"}}>
      </div>
    <Panel>
      <div ref={componentRef}>
        {grid}
      </div>
    </Panel>
    
    
      </>
  )
}
