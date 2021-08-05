import styled from 'styled-components';

export const SelectWrapper = styled.div`
    position: relative;
`;

export const SelectHeaderLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SelectHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    padding: 9px 16px 9px 20px;
    border: 2px solid ${props => props.theme.borderColor};
    border-radius: ${props => props.theme.borderRadius};

    cursor: pointer;
`;

export const SelectTitle = styled.div`
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 30px;
`;

export const SelectedItem = styled.div`
    height: 18px;
`;

export const SelectDropdownList = styled.ul`
    position: absolute;
    z-index: 5;
    top: 100%;
    width: 100%;

    padding: 0;
    border: 2px solid ${props => props.theme.borderColor};
    border-top: none;
    border-radius: ${props => `${props.theme.borderRadius} ${props.theme.borderRadius}`};
    background-color: white;

    cursor: pointer;
`;

export const SelectDropdownItem = styled.li`
    padding: 11px 16px 11px 20px;
    list-style: none;
`;

export const ArrowWrapper = styled.span`
    display: inline-block;
    width: 16px;
    height: 8px;

    ${props => props.isInverted && `transform: rotateX(180deg) translateY(-100%);`}
`;
