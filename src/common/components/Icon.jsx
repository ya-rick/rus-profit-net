import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import * as svgIcons from '../svgElements';

function mapSize(size) {
    switch(size) {
        case 'xl': return '7rem';
        case 'md': return '5rem';
        case 'xxs': return '1rem';
        default: return '2rem';
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

    > svg > path {
        stroke: black;
        stroke-width: 2px;

        ${props => props.color && css`fill: ${props.color};`}
    }

    :hover {
        > svg > path {
            stroke-width: 3px;
        }
    }
`;

const Text = styled.span`
    position: absolute;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;
