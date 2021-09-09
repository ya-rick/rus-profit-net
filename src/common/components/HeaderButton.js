import styled from 'styled-components';
import {Link} from 'react-router-dom';


export default styled(Link)`
  box-shadow: none;
  font-size: 15px;
  line-height: 20px;
  
  border-radius: 15px;
  background: #F7FBFC;
  border: 2px solid #6F80A5;
  margin-left: 25px;
  
  padding: 10px 15px;

  font-weight: 700;
  
  display: flex;
  align-items: center;
  gap: 5px;

  :hover, :active {
    box-shadow: inset 0 6px 10px rgba(0, 0, 0, 0.8);
    background: #E9F0FF;
  }
`