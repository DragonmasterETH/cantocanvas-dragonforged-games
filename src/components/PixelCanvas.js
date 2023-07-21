import React, { useState, useEffect, useRef } from 'react';
import Pixel from './Pixel';
import { dragonforgedAPI } from '../util/apiCall';
import { styled } from 'styled-components';

const objectHash = require('object-hash');

const PixelRow = styled.div`
  display: flex;
  width: fit-content;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
`

export default function PixelCanvas({ selectedColor }) {
  const componentRef = useRef();
  const [board, setBoard] = useState([]);
  const [grid, setGrid] = useState(<></>);

  const setBoardPixel = (pixelId,color) => {
    const newBoard = board; 
    newBoard[pixelId].color = color;
    setBoard(newBoard)
  };

  useEffect(() => {
    const fetchData = async () => {
      if (document.hasFocus()) {
        const hash = objectHash(board);
        try {
          //let res = await dragonforgedAPI.getGrid(hash);
          let res = [{"color": '#123456'}, {"color": '#123fed'}, {"color": '#654321'}, {"color": '#abcdef'}];
          //res[0] = {"color": '#DDD'};
          setBoard(res);

          //TODO if res null if hash same
          if (res) {
            //setBoard(res);
          }
        }
        catch (e) {
          alert(e);
        }
      }
    };

    fetchData();

    //setInterval(function() {
    //  fetchData();
    //}, 30000);
  }, []);
  
  
  let rows = [];
  useEffect(() => {
    let key = 10000;
    let height = Math.sqrt(board.length);
    let width = height;
    console.log("useEffect2: " + board.length);
    for (let i = 0; i < height; i++) {
      let pixels = [];
      for (let j = 0; j < width; j++) {
        
        let pixelId = i*width + j;
        console.log("pixelId=" + pixelId);
        let currentColor = board[pixelId].color;
        pixels.push(<Pixel pixelId={pixelId} key={++key} selectedColor={selectedColor} serverColor={currentColor} setBoardPixel={setBoardPixel} />);
      }
      console.log("pixels=" + pixels);
      rows.push(<PixelRow key={++key}>{pixels}</PixelRow>)
    }
    console.log("rows=" + rows);
    setGrid(rows);
  }, [board]);

  return (
    <Panel>
      <div ref={componentRef}>
        {grid}
      </div>
    </Panel>
  )
}
