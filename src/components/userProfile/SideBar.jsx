import styled from 'styled-components'
import { useLocation } from 'react-router-dom';

import { LinkedButton } from '../../common/components/Buttons';

export default function SideBar({ children = [] }) {
    const { pathname } = useLocation();

    return <SideBarContainer>
        {children.map(tab => <SideBarTab
            key={tab.to}
            to={tab.to}
            active={pathname === tab.to}
        >{tab.name}</SideBarTab>)}
    </SideBarContainer>
}

const SideBarContainer = styled.div`
    grid-area: sidebar;
    border: 2px solid #6F80A5;
    padding: 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SideBarTab = styled(LinkedButton)`
    min-width: auto;
    margin: 0;
    outline: none;
    box-shadow: none;
    background-color: #f7fbfc !important;
    border: none;
    font-weight: 300;
    white-space: nowrap;

    ${props => props.active && 'box-shadow: 4px 4px 10px #4C5E8B;'}

    :hover {
        box-shadow: 4px 4px 10px #4C5E8B;
    }
`;
