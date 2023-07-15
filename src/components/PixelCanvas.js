import React, { useRef } from 'react';
import Pixel from './Pixel';
import { styled } from 'styled-components';

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


function DrawingPanel({ width, height, selectedColor }) {
  const componentRef = useRef();
  let pixels = [];
  let rows = [];

  for (let i = 0; i < height; i++) {
    for (let i = 0; i < width; i++) {
      pixels.push(<Pixel key={i} selectedColor={selectedColor} />);
    }
    rows.push(<PixelRow key={i}>{pixels}</PixelRow>)
    pixels = [];
  }

  return (
    <Panel>
      <div ref={componentRef}>
        {rows}
      </div>
    </Panel>
  )
}

export default DrawingPanel;