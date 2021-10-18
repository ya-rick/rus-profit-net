import styled from 'styled-components'
import { useLocation } from 'react-router-dom';

import { LinkedButton } from '../../common/components/Buttons';

export default function SideBar({ children = [], onTablClickCallback = () => {} }) {
    const { pathname } = useLocation();

    return <SideBarContainer>
        {children.map(tab => <SideBarTab
            key={tab.to}
            to={tab.to}
            onClick={() => onTablClickCallback(tab.onClickType)}
            active={pathname === tab.to}
        >{tab.name}</SideBarTab>)}
    </SideBarContainer>
}

const SideBarContainer = styled.div`
    grid-area: sidebar;
    padding: 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    box-shadow: 0 0 10px rgb(0, 0, 0, 0.5);
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
