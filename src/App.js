import './App.css';
import { Target } from './components/Target';
import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
// Colors for Target component
const COLORS = ['green', 'blue', 'grey','red', 'orange', 'turquoise', 'brown', 'palevioletred', 'darkblue', 'darkred'];

const Title = styled.h1`
  font-size: 8em;
  text-align: center;
  color: palevioletred;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: papayawhip;
`;

const Timer = styled.div`
  font-size: 4em;
  color: palevioletred;
  margin-right: 70%;
  margin-top: -10%;
`
const Result = styled.div`
  font-size: 3em;
  color: brown;
  margin: 200px;
`

function App() {
  const [startClicked, setStartClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [missClick, setMissClick] = useState(false);
  const [timer, setTimer] = useState(null);

  const [randCol, setRandCol] = useState(COLORS.at(0));
  const [randPos, setRandPos] = useState({left: 0, top: 0})

  useEffect(() => {
    if(timer===0){
      console.log("TIME LEFT IS 0");
      setTimer(0);
      setStartClicked(false);
   }

   // exit early when we reach 0
   if (!timer) return;

   // save intervalId to clear the interval when the
   // component re-renders
   const intervalId = setInterval(() => {

     setTimer(timer - 1);
   }, 1000);

   // clear interval on re-render to avoid memory leaks
   return () => clearInterval(intervalId);
   // add timer as a dependency to re-rerun the effect
   // when we update it
 }, [timer]);

  const targetClick = (e) => {
    e.stopPropagation();
    setClickCount(clickCount+1);
    randomColor();
    randomPosition();
    // Every ten accurate clicks award 1 second
    if ((clickCount+1) % 10 === 0) {
      setTimer(timer+2);
    }
  }

  const backgroundClick = () => {
    if (startClicked){
      // When game is on, background click resets the game
      setStartClicked(false);
      setMissClick(true);
      setTimer(null);
    }
    else {
      // Background click starts the game
      setStartClicked(true)
      setMissClick(false);
      setClickCount(0);
      setTimer(10);

      randomPosition();
      randomColor();
    }
  }

  const randomColor = () => {
    // Randomized color for Target component
    const rand = Math.floor(Math.random() * (COLORS.length));
    setRandCol(COLORS.at(rand));
  }

  const randomPosition = () => {
    // Randomized positions for Target component
    setRandPos({left: -90 + Math.floor(Math.random() * (90 - -90)), top: 5 + Math.floor(Math.random() * (30 - 5))})
  }

  return (
    <Background className='background' onClick={backgroundClick}>
      <Title> Click! </Title>
      <Timer>Time left: {timer}</Timer>
      {startClicked &&
        <Target handleClick={targetClick} randColor={randCol} position={randPos}></Target>
      }
      {missClick &&
        <Result>Accurate clicks before missclick: {clickCount}</Result>
      }
      {timer === 0 &&
        <Result>Accurate clicks before time ran out: {clickCount}</Result>
      }
    </Background>
  );
}

export default App;
