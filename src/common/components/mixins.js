import { css } from 'styled-components';

export const buttonStylesMixin = css`
    font-size: 25px;
    line-height: 29px;
    padding: 25px 44px;
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.8);
    border-radius: 20px;
    background: #F7FBFC;
    border: 2px solid #6F80A5;

    :hover, :active {
        box-shadow: inset 0px 6px 10px rgba(0, 0, 0, 0.8);
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
