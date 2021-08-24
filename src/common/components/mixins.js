import {css} from 'styled-components';

export const buttonStylesMixin = css`

  background: #F7FBFC;
  padding: 13px 22px 14px 23px;
  border: 2px solid #6F80A5;
  border-radius: 15px;
  margin: 0 20px;

  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 25px;

  width: 240px;
  height: 60px;

  color: #000000;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.8);

  :hover, :active {
    box-shadow: inset 0 6px 10px rgba(0, 0, 0, 0.8);
    background: #E9F0FF;
  }
`;

export const inputMixins = css`
  font-size: 15px;
  line-height: 18px;
  padding: 11px 20px;
  border: 2px solid #6F80A5;
  border-radius: 15px;
  outline: none;

  ::placeholder {
    color: #4C5E8B;
  }
`;
