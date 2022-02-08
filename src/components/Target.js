import styled from 'styled-components';

const Circle = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  outline-width: thick;
  outline-style: solid;
`;

export const Target = ({ handleClick, randColor }) => {

  return (
    <Circle className="circle" onClick={(e) => handleClick(e)} 
      style={{
        "backgroundColor": randColor,
        "marginLeft": (-90 + Math.floor(Math.random() * (90 - -90)))+'%',
        "marginTop": (5 + Math.floor(Math.random() * (30 - 5)))+'%'
      }}>     
    </Circle>
  )
};