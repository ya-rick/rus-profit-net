import styled from 'styled-components';
import { useState } from 'react';

import Icon from './Icon';
import { RegularTextWrapper } from './StaticPagesStyles';
import { Subtitle } from './Typography';

export default function Dropdown ({ content, title }) {
    const [isOpened, setIsOpened] = useState(false);

    function toggleIsOpened(value) {
        if (value === true) {
            setIsOpened(true);
        } else if (value === false) {
            setIsOpened(false);
        } else {
            setIsOpened(prevVal => !prevVal);
        }
    }

    return (
        <DropdownWrapper>
            <DropdownHeader onClick={toggleIsOpened}>
                <Subtitle>{title ?? 'Как работает сайт?'}</Subtitle>
                <Icon iconName={'circle_plus'}/>
            </DropdownHeader>

            {isOpened && <DropdownContent>
                <RegularTextWrapper>{content}</RegularTextWrapper>
            </DropdownContent>}
        </DropdownWrapper>
    )
}

const DropdownWrapper = styled.div`

`;

const DropdownHeader = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;

    column-gap: .5rem;
    width: 100%;

    border: 1px solid #6F80A5;
    padding: .25rem .5rem;

    ${props => props.theme.smallBorderRadius}
`;

const DropdownContent = styled.div`
    margin-top: 30px;
`;
