import styled from 'styled-components';
import { useState } from 'react';

import Icon from './Icon';

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
                {title || 'Как работает сайт?'}
                <Icon iconName={'circle_plus'}/>
            </DropdownHeader>

            {isOpened && <DropdownContent>
                {content}
            </DropdownContent>}
        </DropdownWrapper>
    )
}

const DropdownWrapper = styled.div`

`;

const DropdownHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 17px 20px;
    border-radius: ${props => props.theme.borderRadius};
    border: 1px solid #6F80A5;
    cursor: pointer;
    font-weight: 600;
`;

const DropdownContent = styled.div`
    margin-top: 30px;
`;
