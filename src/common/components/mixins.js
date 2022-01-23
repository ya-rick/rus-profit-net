import { css } from 'styled-components';
import { commonPadding, forDevice } from '../commonAdaptiveStyles';
import { fontWeight } from './Typography';

export const HeaderButtonTextMixin = css`
    ${fontWeight}
    font-size: 1rem;
    padding: .5rem 1rem;
`;

export const ActionButtonTextMixin = css`
    ${fontWeight}

    font-size:  1.1rem;

    ${forDevice.M(css`
      font-size:  1.25rem;
    `)}
`;

export const buttonStylesMixin = css`
  min-width: max-content;
  background: #F7FBFC;
  border: 2px solid #6F80A5;

  padding: .5rem 1rem;
  
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.8);
  
  :hover {
    box-shadow: inset 0 6px 10px rgba(0, 0, 0, 0.8);
    background: #E9F0FF;
  }
  
  ${ActionButtonTextMixin}
  ${props => props.theme.smallBorderRadius};

  ${forDevice.M(css`
    ${commonPadding}
  `)}
`;

export const activeButtonStyleMixin = css`
  ${props => props.active && css`
    box-shadow: inset 0 6px 10px rgba(0, 0, 0, 0.8);
    background: #E9F0FF;
  `}
`;

export const inputMixins = css`
  font-size: .75rem;
  border: 2px solid #6F80A5;
  width: 100%;
  padding: .5rem 1rem;
  
  ::placeholder {
    color: rgb(0, 0, 0, 0.5)
  }
  
  ${props => props.disabled && css`
    color: #4C5E8B;
    border-color: #7a86a1;
  `}

  ${props => props.theme.smallBorderRadius};
`;

export const flexAlignCenter = css`
  display: flex;
  align-items: center;
  align-content: center;
`;
