import styled from 'styled-components';

import * as svgIcons from '../svgElements';

export default function Icon ({ iconName, ...props }) {
    return <Wrapper {...props}>
        {svgIcons[iconName]}
    </Wrapper>
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 40px;
    max-height: 40px;
    cursor: pointer;
`;
