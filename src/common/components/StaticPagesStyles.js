import styled, { css } from 'styled-components';
import { forDevice } from '../commonAdaptiveStyles';

import { DefaultContainer } from './Layouts';
import { CommonText, Subtitle } from './Typography';


export const BorderedTitle = styled(Subtitle)`
    border: 2px solid #6F80A5;
    padding: .75rem;
    
    ${props => props.theme.smallBorderRadius};
`;

export const TwoLinkedButtonGroup =  styled(DefaultContainer)`
    display: grid;
    grid-template-columns: max-content;
    justify-content: center;

    gap: 2rem;

    ${forDevice.M(css`
        display: flex;

        > * {
            width: 300px;
        }
    `)}
`;

export const RegularTextWrapper = styled(CommonText)`
    white-space: break-spaces;
    line-height: 1.5rem;
`;