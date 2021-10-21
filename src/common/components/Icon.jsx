import styled, { css } from 'styled-components';

import * as svgIcons from '../svgElements';

export default function Icon ({ iconName, text, disabled = false, ...props }) {
    return <Wrapper
        {...props}
        disabled={disabled}
    >
        {svgIcons[iconName]}
        <Text>{text}</Text>
    </Wrapper>
}

const Wrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 40px;
    max-height: 40px;
    cursor: pointer;

    ${props => props.disable && css`
        filter: opacity(0.5);
        cursor: default;
        pointer-events: none;
    `};
`;

const Text = styled.p`
    position: absolute;
    left: 50%;
    transform: translate(-50%);
`;
