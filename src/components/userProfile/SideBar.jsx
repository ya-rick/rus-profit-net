import styled from 'styled-components'
import { useLocation } from 'react-router-dom';

import { LinkedButton } from '../../common/components/Buttons';
import { CommonText } from '../../common/components/Typography';

export default function SideBar({ children = [], onTablClickCallback = () => {} }) {
    const { pathname } = useLocation();

    return (
        <SideBarContainer>
            {children.map(tab => <SideBarTab
                key={tab.to}
                to={tab.to}
                onClick={() => onTablClickCallback(tab.onClickType)}
                active={pathname === tab.to}
            >
                <CommonText>{tab.name}</CommonText>
            </SideBarTab>)}
        </SideBarContainer>
    );
}

const SideBarContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;

    margin-block: 1rem;

    ${props => props.theme.smallBorderRadius}
`;

const SideBarTab = styled(LinkedButton)`
    box-shadow: none;
    background-color: #f7fbfc !important;
    border: none;
    font-weight: 400;
    padding: .25rem .5rem;

    ${props => props.active && 'box-shadow: 4px 4px 10px #4C5E8B;'}

    :hover {
        box-shadow: 4px 4px 10px #4C5E8B;
    }
`;
