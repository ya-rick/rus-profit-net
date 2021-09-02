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
    width: min(40px, 100%);
    height: min(40px, 100%);
    cursor: pointer;
`;
