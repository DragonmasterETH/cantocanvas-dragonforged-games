import React from 'react';
import Pixel from './Pixel';
import styled from "styled-components";
import { Container } from 'react-bootstrap';

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RowContainer = styled.div`
  display: flex;
  width: fitContent;
`;

export default function Grid ({width, color}){
  let pixels = [];
  let rows = [];
  for (let i = 0; i < width; i++)
  {
    for (let j = 0; j < width; i++)
    {
      pixels.push(<Pixel color={color}/>);
    }
    rows.push(<RowContainer>{pixels}</RowContainer>)
    pixels = [];
  }
  return (
    <GridContainer>{rows}</GridContainer>
  );
};

