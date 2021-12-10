import styled from 'styled-components';


export const SelectWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

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

export const SelectHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px 12px;
    border-radius: ${props => props.theme.borderRadius};
    border-radius: 15px;
    background: #FFFFFF;
    ${props => !props.noBorders && 'border: 2px solid #6F80A5;'}
    
    cursor: pointer;
`;

export const SelectTitle = styled.div`
    margin-bottom: 30px;
`;

export const SelectedItem = styled.div`
    height: 18px;
    font-size: 13px;
`;

export const SelectDropdownLayout = styled.div`
    margin-top: 0;
    position: absolute;
    z-index: 5;
    top: 100%;
    width: 100%;

    border: 2px solid ${props => props.theme.borderColor};
    border-top: none;
    border-radius: ${props => `${props.theme.borderRadius} ${props.theme.borderRadius}`};
    border-radius: 15px;
    background-color: #FFFFFF;
`;

export const SelectDropdownList = styled.ul`
    padding: 0;
    margin: 5px;
    max-height: 100px;
    overflow-y: auto;

    cursor: pointer;
`;

export const SelectDropdownItem = styled.li`
    padding: 10px 12px;
    list-style: none;
    font-size: 13px;
`;

export const ArrowWrapper = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    ${props => props.isInverted && `transform: rotateX(180deg);`}
`;
