import styled from 'styled-components'

export const DropdownContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;

    > :last-child {
        width: min-content;
        height: min-content;
        align-self: center;
        justify-self: center;
    }
`;
