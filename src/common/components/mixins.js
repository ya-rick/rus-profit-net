import { css } from 'styled-components';

export const buttonStylesMixin = css`
  min-width: 300px;
  background: #F7FBFC;
  padding: 1em 2em;
  border: 2px solid #6F80A5;
  border-radius: 15px;

  font-weight: 700;
  font-size: 17px;

  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.8);

  cursor: pointer;

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
  ${props => props.active && css`
    box-shadow: inset 0 6px 10px rgba(0, 0, 0, 0.8);
    background: #E9F0FF;
  `}
`;

export const inputMixins = css`
  font-size: 15px;
  padding: 11px 20px;
  border: 2px solid #6F80A5;
  border-radius: 15px;
  outline: none;
  width: 100%;
  height: 42px;

  ::placeholder {
    color: #4C5E8B;
  }

  ${props => props.disabled && css`
    color: #4C5E8B;
    border-color: #7a86a1;
  `}
`;

export const flexAlignCenter = css`
  display: flex;
  align-items: center;
  align-content: center;
`;
