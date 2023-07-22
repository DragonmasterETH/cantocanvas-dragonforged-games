import Canvas from "./pages/Canvas";
import logo from './logo.svg';
import { Web3Provider } from './util/Web3Context';
import './App.css';

import React, { useEffect } from 'react';
import { Supabase } from './supabase'
import Gallery from "./pages/Gallery";
//import dotenv from 'dotenv'

function App() {
  document.body.style = 'background: #0b3b28; color: #fff';
  /*
  //dotenv.config();

  useEffect(() => {
    const fetchData = async () => {

      const account = '100ssssa2';
      const { data: wallet, error } = await Supabase.client
        .from('wallets')
        .select()
        .eq('address', account)
        .maybeSingle();
        
      let freePixelTime = Date.now();
      if (wallet == null)
      {
        const { error } = await Supabase.client
          .from('wallets')
          .insert({ address: account, lastFreePixelTime: freePixelTime })
      }
      else
      {
        freePixelTime = wallet.lastFreePixelTime;
      }
      return {"lastFreePixelTime": wallet.lastFreePixelTime}

   };
   fetchData();

  }, []);


  return (<></>)
  */
 return (
  <Web3Provider>
  <Canvas />
  </Web3Provider>
);

}

export default App;
