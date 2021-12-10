import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import * as svgIcons from '../svgElements';

function mapSize(size) {
    switch(size) {
        case 'xl': return '150px';
        case 'md': return '100px';
        case 'xxs': return '20px';
        default: return '40px';
    }
}

export default function Icon ({ iconName, text, disabled, size, cursorDefault, ...props }) {

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
    size: PropTypes.oneOf(['xs', 'xl', 'md', 'xxs']),
    text: PropTypes.string,
    disabled: PropTypes.bool
}

Icon.defaultProps = {
    size: 'xs',
    cursorDefault: false,
    disabled: false
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

const Text = styled.span`
    position: absolute;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;
