import styled from 'styled-components';
import { AdditionalText } from '../Typography';


export const SelectWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    > input:first-child {
        width: 200%;
    }
`;

export const LeftItemWrapper = styled.div`
    width: 100%;
`;

export const SelectLayout = styled.div`
    position: relative;
    width: 100%;
  `;

export const SelectHeader = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    gap: 1rem;

    padding: .5rem .75rem;
    background: #FFFFFF;

    ${props => !props.noBorders && 'border: 2px solid #6F80A5;'}
    ${props => props.theme.smallBorderRadius};
`;

export const SelectTitle = styled.div`
    margin-bottom: 1.5rem;
`;

export const SelectedItem = styled(AdditionalText)`
    height: 18px;
`;

export const SelectDropdownLayout = styled.div`
    margin-top: 0;
    position: absolute;
    z-index: 5;
    top: 100%;
    width: 100%;

    border: 2px solid ${props => props.theme.borderColor};
    border-top: none;
    background-color: #FFFFFF;

    ${props => props.theme.smallBorderRadius}
`;

export const SelectDropdownList = styled.ul`
    padding: 0;
    margin: 5px;
    max-height: 100px;
    overflow-y: auto;

    cursor: pointer;
`;

export const SelectDropdownItem = styled.li`
    padding: .5rem .75rem;
    list-style: none;
    font-size: .75rem;
`;

export const ArrowWrapper = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    ${props => props.isInverted && `transform: rotateX(180deg);`}
`;
