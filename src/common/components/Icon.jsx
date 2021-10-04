import styled from 'styled-components';

import * as svgIcons from '../svgElements';

export default function Icon ({ iconName, text, ...props }) {
    return <Wrapper {...props}>
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
`;

const Text = styled.p`
    position: absolute;
    left: 50%;
    transform: translate(-50%);
`;
