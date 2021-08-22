import styled from 'styled-components';

import * as svgIcons from '../svgElements';

export default function Icon ({ iconName }) {
    return <Wrapper>
        {svgIcons[iconName]}
    </Wrapper>
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
`;
