import React, { useState, useEffect } from 'react';

export default function TimeDisplay({pixelTime}) {
  const [freePixelTime, setFreePixelTime] = useState(pixelTime);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  function getTimeRemaining() {
    if(freePixelTime){
    const currentTime = new Date();
    const timeDiff = freePixelTime - currentTime;
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const seconds = Math.floor((timeDiff / 1000) % 60);
    return { minutes, seconds };
    }
    else
    {
      return null;
    }
  }

  useEffect(() => {setFreePixelTime(Date.now() + 5 * 60000)},[]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [freePixelTime]);

  return (
    <div>
          {timeRemaining ? <p>Free pixel in {timeRemaining.minutes}:{timeRemaining.seconds}</p>
          :
          <p>Connect Wallet to check</p>
          }
    </div> 
  )
}
