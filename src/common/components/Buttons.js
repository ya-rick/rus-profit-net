import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { activeButtonStyleMixin, buttonStylesMixin } from './mixins';


export const CommonButton = styled.button`
    ${buttonStylesMixin};
    ${activeButtonStyleMixin};
    outline: none;
`;

export const LinkedButton = styled(Link)`
    ${buttonStylesMixin};
    ${activeButtonStyleMixin};
`;

export const FlyingButton = styled.button`
    outline: none;
    background-color: #f7fbfc;
    border: none;
    border-radius: 15px;
    padding: 0.8em 1em;
    font-weight: 300;

    ${props => props.active && 'box-shadow: 4px 4px 10px #4C5E8B;'}

    :hover {
        box-shadow: 4px 4px 10px #4C5E8B;
    }
`;

export const SecondaryButton = styled(CommonButton)`
  box-shadow: none;
  column-gap: 15px;
  min-width: auto;
  border-radius: 20px;
`
