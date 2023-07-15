import React, { useState } from 'react';
import { styled } from 'styled-components';

const PixelUnit = styled.div`
  width: 2vw;
  height: 2vw;
  cursor: pointer;
  backgroundColor: ${(props) => (props.color ? props.color : "#fff")}
`;

function Pixel({ selectedColor }) {
  const [pixelColor, setPixelColor] = useState('#fff');
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);

  const applyColor = () => {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
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