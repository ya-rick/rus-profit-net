import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import * as svgIcons from '../svgElements';

function mapSize(size) {
    switch(size) {
        case 'xl': return '150px';
        case 'md': return '100px';
        default: return '40px';
    }
}

export default function Icon ({ iconName, text, disabled = false, size = 'xs', cursorDefault = false, ...props }) {

    return <Wrapper
        {...props}
        size={size}
        disabled={disabled}
        cursorDefault={cursorDefault}
    >
        {svgIcons[iconName]}
        <Text>{text}</Text>
    </Wrapper>
}

Icon.propTypes = {
    iconName: PropTypes.oneOf(Object.keys(svgIcons)),
    size: PropTypes.oneOf(['xs', 'xl']),
    text: PropTypes.string,
    disabled: PropTypes.bool
}

const Wrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    max-width: ${props => mapSize(props.size)};
    max-height: ${props => mapSize(props.size)};

    ${props => props.cursorDefault && css`cursor: pointer;`}

    ${props => props.disabled && css`
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
