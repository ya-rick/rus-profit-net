import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../common/components/Icon';


const HandsLike = ({ currentMark, onHandClick }) => {
    const [hoveredMark, setHoveredMark] = useState(null);

    function onClick(e, mark) {
        e.stopPropagation();

        onHandClick(mark);
    }

    return (
        <HandsLikeContainer>
            {[1, 2, 3, 4, 5].map(mark => (
                <HandLike
                    iconName={'like'}
                    onClick={e => onClick(e, mark)}
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
    gap: 1rem;
`;

const HandLike = styled(Icon)`
    height: 2.25rem;
    width: 2.25rem;

    ${props => props.active && '> svg { fill: #97acda; }'}
`;
