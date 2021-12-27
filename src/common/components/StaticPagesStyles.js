import styled, { css } from 'styled-components';
import { commonPadding, forDevice } from '../commonAdaptiveStyles';

import { DefaultContainer } from './Layouts';
import { CommonText, MainSubtitle } from './Typography';


export const BorderedTitle = styled(MainSubtitle)`
    border: 2px solid #6F80A5;
    ${props => props.theme.smallBorderRadius};
    ${commonPadding};
`;

export const TwoLinkedButtonGroup =  styled(DefaultContainer)`
    margin-block: 2rem;

    display: grid;
    grid-template-columns: max-content;
    justify-content: center;

    gap: 2rem;

    ${forDevice.M(css`
        grid-template-columns: repeat(2, 15rem);
    `)}
`;

export const RegularTextWrapper = styled(CommonText)`
    white-space: break-spaces;
    line-height: 1.5rem;
`;