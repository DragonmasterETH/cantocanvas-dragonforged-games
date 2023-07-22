import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useWeb3Context } from '../util/Web3Context';
import { dragonforgedAPI } from '../util/apiCall';

const PixelUnit = styled.div`
  width: 1vw;
  height: 1vw;
  cursor: pointer;
  backgroundColor: ${(props) => (props.color ? props.color : "#fff")}
`;

function Pixel({ pixelId, selectedColor, serverColor, setBoardPixel}) {
  const [pixelColor, setPixelColor] = useState(serverColor);
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);
  const {currentAccount, signMessage, verifySignature } = useWeb3Context();

  const applyColor = async () => {
    let message = "Confirm you are placing a new pixel at PixelId:"  + pixelId +
                  " with " + selectedColor + " Nonce: " + Math.random();
    let signature = await signMessage(message);
    if (await verifySignature(message, signature)) {
      let res = await dragonforgedAPI.placePixel(currentAccount, message, signature, pixelId, selectedColor);

      //TODO pass nextFreePixelTime back up to TimeDisplay
      if (res && res.nextFreePixelTime > 0)
      {
        setPixelColor(selectedColor);
        setCanChangeColor(false);
        setBoardPixel(pixelId-1, selectedColor, res.nextFreePixelTime)
      }
      else
      {
        alert("Pixel place failed.");
      }
    }
  };

  const changeColorOnHover = () => {
    setOldColor(pixelColor);  //making a reserved color to the old pixel color
    setPixelColor(selectedColor);
  };

  const resetColor = () => {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }

    setCanChangeColor(true);
  };


  const removeColor = () => {
    setPixelColor('#fff');
  };

  return (
    <PixelUnit 
      style={{backgroundColor: pixelColor}}
      onClick={applyColor} 
      onMouseEnter={changeColorOnHover} 
      onMouseLeave={resetColor}
      onDoubleClick={removeColor}
    >

    </PixelUnit>
  )
}

export default Pixel;