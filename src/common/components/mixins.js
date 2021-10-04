import {css} from 'styled-components';

export const buttonStylesMixin = css`

  min-width: 300px;
  background: #F7FBFC;
  padding: 13px 22px 14px 23px;
  border: 2px solid #6F80A5;
  border-radius: 15px;

  font-weight: 700;
  font-size: 17px;
  line-height: 25px;

  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-align: center;
  
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.8);

  :hover {
    box-shadow: inset 0 6px 10px rgba(0, 0, 0, 0.8);
    background: #E9F0FF;
  }
  
  :link, :visited{
    text-decoration: none;
    color: #000000;
  }
  
`;

export const activeButtonStyleMixin = css`
  ${props => props.active && `
    box-shadow: inset 0 6px 10px rgba(0, 0, 0, 0.8);
    background: #E9F0FF;
  `}
`;

export const inputMixins = css`
  font-size: 15px;
  line-height: 18px;
  padding: 11px 20px;
  border: 2px solid #6F80A5;
  border-radius: 15px;
  outline: none;
  width: 100%;

  ::placeholder {
    color: #4C5E8B;
  }
`;
export const flexAlignCenter = css`
  display: flex;
  align-items: center;
  align-content: center;
`;
