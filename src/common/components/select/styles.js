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

    padding: 0.8em 1.3em 0.8em 1.5em;
    border-radius: ${props => props.theme.borderRadius};
    height: 40px;
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
    line-height: 23px;
  `;

export const SelectDropdownList = styled.ul`
    position: absolute;
    z-index: 5;
    top: 100%;
    width: 100%;
    max-height: 100px;
    overflow-y: scroll;

    padding: 0;
    border: 2px solid ${props => props.theme.borderColor};
    border-top: none;
    border-radius: ${props => `${props.theme.borderRadius} ${props.theme.borderRadius}`};
    background-color: white;
    border-radius: 15px;
    border-left: 2px solid #6F80A5;
    border-bottom: 2px solid #6F80A5;
    border-right: 2px solid #6F80A5;
    cursor: pointer;
  `;

export const SelectDropdownItem = styled.li`
    padding: 0.9em 1.3em 0.9em 1.5em;
    list-style: none;
    font-size: 13px;
    line-height: 23px;
  `;

export const ArrowWrapper = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 15px;

    ${props => props.isInverted && `transform: rotateX(180deg);`}
`;
