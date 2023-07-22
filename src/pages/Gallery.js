import React,{useState,useEffect} from "react";
import {Col, Nav, Row} from "react-bootstrap";
import { useWeb3Context } from '../util/Web3Context';
import { BrowserView, MobileView } from "react-device-detect";
import { ethers } from "ethers";
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


export default function Gallery() {
    const [nftList, setNftList] = useState([]);

    const getNFTs = async () => {
        let endOfList = false;
        let newNftList = [];
        for(let id = 1; id < 4; id++)
        {
            newNftList.push(
                <Col>
                    <img src={"https://firebasestorage.googleapis.com/v0/b/cantocanvas-f5005.appspot.com/o/images%2F" + id + ".png?alt=media"} style={{cursor: "pointer"}} width={"100%"}/>
                </Col>
            )
        }
        let rows = [];
        let cols = [];

        for(let i = 0; i < newNftList.length; i++)
        {
            cols.push(newNftList[i]);

            if(cols.length == 5)
            {
                rows.push(
                    <Row>
                        {cols}
                    </Row>);
                cols = [];
            }

        }
        for(let j = cols.length; j < 5; j++)
        {
            cols.push(<Col></Col>);
        }
        rows.push(<Row>{cols}</Row>);
        setNftList(<div>{rows}</div>);
    }

useEffect(() => {
    getNFTs();
},[]);

    return(
        <>
        <BrowserView>
        
            <div style={{width: "60%", backgroundColor:"rgba(255,255,255,0.4", margin:"auto", height: "auto", position:"absolute", top: "0px", left: "20%"}}>
            <div style={{padding: "25px"}}>
                <Col>
                    <Col>
                            <div style={{ padding: "5px", backgroundColor: "#C0D6A2", width: "80%", height: "15%", margin: "auto"}}>

                                    {nftList ? <div>{nftList}</div> : <p>Looks like there are no Golferz NFTs in this wallet! Try a different one or putchase a Golferz NFT to use this feature!</p>}
                            </div>
                        </Col>
                       
                   </Col>
            </div>
            </div>
            </BrowserView>
    </>
)
}
