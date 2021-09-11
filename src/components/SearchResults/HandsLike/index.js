import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../common/components/Icon';


const HandsLike = ({ currentMark, onHandClick }) => {
    const [hoveredMark, setHoveredMark] = useState(null);

    return (
        <HandsLikeContainer>
            {[1, 2, 3, 4, 5].map(mark => (
                <HandLike
                    iconName={'like'}
                    onClick={() => onHandClick(mark)}
                    onMouseEnter={() => setHoveredMark(mark)}
                    onMouseLeave={() => setHoveredMark(null)}
                    active={(mark <= currentMark) || (mark <= hoveredMark)}
                />
            ))}
        </HandsLikeContainer>
    );
};

export default HandsLike;

const HandsLikeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const HandLike = styled(Icon)`
    height: 28px;
    width: 28px;

    ${props => props.active && '> svg { fill: #97acda; }'}
`;
