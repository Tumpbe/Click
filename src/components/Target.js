import styled from 'styled-components';

const Circle = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  outline-width: thick;
  outline-style: solid;
`;

export const Target = ({ handleClick, randColor, position }) => {

  return (
    <Circle className="circle" onClick={(e) => handleClick(e)} 
      style={{
        "backgroundColor": randColor,
        "marginLeft": (position.left)+'%',
        "marginTop": (position.top)+'%'
      }}>     
    </Circle>
  )
};