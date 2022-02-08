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
  margin-right: 2000px;
  margin-top: -200px;
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

  const [randCol, setRandCol] = useState(COLORS.at(0));
  const [timer, setTimer] = useState(10);

  /*useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer])*/

  const targetClick = (e) => {
    e.stopPropagation();
    setClickCount(clickCount+1);
    randomColor();
  }

  const backgroundClick = () => {
    if (startClicked){
      // When game is on, background click resets the game
      setStartClicked(false)
      setMissClick(true);
    }
    else {
      // Background click starts the game
      setStartClicked(true)
      setMissClick(false);
      setClickCount(0);
    }
  }

  const randomColor = () => {
    // Randomized color for Target component
    const rand = Math.floor(Math.random() * (COLORS.length));
    setRandCol(COLORS.at(rand));
  }

  return (
    <Background className='background' onClick={backgroundClick}>
      <Title> Click! </Title>
      <Timer>Time left: {timer}</Timer>
      {startClicked &&
        <Target handleClick={targetClick} randColor={randCol}></Target>
      }
      {missClick &&
        <Result>Total click count before missclick: {clickCount}</Result>
      }
    </Background>
  );
}

export default App;
