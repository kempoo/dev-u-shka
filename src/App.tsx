import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [meme, setMeme] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<any>(null);

  useEffect(() => {
    getMeme();
  }, [])

  const getElapsedTime = () => {
    var endTime = new Date();
    var startTime = new Date(2023, 6, 19, 9, 0, 0);
    // time difference in ms
    var timeDiff = endTime.getTime() - startTime.getTime();

    // strip the ms
    timeDiff /= 1000;

    // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
    var seconds = Math.round(timeDiff % 60);

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    var minutes = Math.round(timeDiff % 60);

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    var hours = Math.round(timeDiff % 24);

    // remove hours from the date
    timeDiff = Math.floor(timeDiff / 24);

    // the rest of timeDiff is number of days
    var days = timeDiff;

    setElapsedTime({
      days,
      hours,
      minutes,
      seconds
    });
  }

  setTimeout(() => getElapsedTime(), 1000)

  const getMeme = async () => {
    const options = {
      method: 'GET',
      url: 'https://programming-memes-images.p.rapidapi.com/v1/memes',
      headers: {
        'X-RapidAPI-Key': 'e930e25418msh26902d289a82893p17a50djsn5e43f844db56',
        'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    };
    try {
      const response = await axios.request(options);
      setMeme(response.data[0].image);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="header">
        <div className="inner-header flex">
          <h1>Hey, Dev' <svg className="heart" viewBox="0 0 32 29.6">
            <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
          </svg> 'shka!</h1>
          <img width={400} height={400} className={`responsive-img smooth-image image-${meme ? 'visible' : 'hidden'}`} src={meme ?? ''} alt='Loading meme'>
          </img>
        </div>
        <div>
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
      <div className="content flex">
        <p>Congrats on being software developer for:</p>
        <div>{elapsedTime?.days} Days {elapsedTime?.hours} Hours {elapsedTime?.minutes} Minutes {elapsedTime?.seconds} Seconds!</div>
      </div>
    </>
  );
}

export default App;
