import styled from 'styled-components'

export const DropdownContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const Col = styled.div`
    width: 47%;
    display: flex;
    flex-direction: column;
    justify-content: start;

    > button {
        align-self: center;
    }

    > * {
        margin-bottom: 40px;

        :last-child {
            margin-bottom: 0;
        }
    }
`;

export const ModalFormWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    > 
`;
