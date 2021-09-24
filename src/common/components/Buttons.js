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
    ${buttonStylesMixin};
    outline: none;

    box-shadow: none;
    background-color: #f7fbfc !important;
    border: none;
    font-weight: 300;

    ${props => props.active && 'box-shadow: 4px 4px 10px #4C5E8B;'}

    :hover {
        box-shadow: 4px 4px 10px #4C5E8B;
    }

`;
