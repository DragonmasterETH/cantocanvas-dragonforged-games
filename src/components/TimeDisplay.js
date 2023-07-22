import React, { useState, useEffect } from 'react';

export default function TimeDisplay({pixelTime}) {
  //const [freePixelTime, setFreePixelTime] = useState(pixelTime);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
  let secondsStr = "0";

  function getTimeRemaining() {
    if (pixelTime){
      const currentTime = new Date();
      const timeDiff = pixelTime - currentTime;
      const minutes = Math.floor(timeDiff / (1000 * 60));
      const seconds = Math.floor((timeDiff / 1000) % 60);
      return { minutes, seconds };
    }
    else
    {
      return null;
    }
  }

  //useEffect(() => {setFreePixelTime(Date.now() + 5 * 60000)},[]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [pixelTime]);

  return (
    <div>
          {timeRemaining ? ((timeRemaining.seconds > 1)
            ? <h1>Free pixel in {timeRemaining.minutes}:{timeRemaining.seconds < 10 ? "0" + timeRemaining.seconds : timeRemaining.seconds}</h1> : <h1><span style={{color:"green"}}><b>Ready to place</b></span></h1>)
          :
          <h2>Connect Wallet to Place Pixels</h2>
          }
    </div> 
  )
}
