import styled, { css } from 'styled-components'
import { forDevice } from '../../common/commonAdaptiveStyles';

export const DropdownContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    ${forDevice.M(css`
        grid-template-columns: repeat(2, 1fr);
    `)}

    > :last-child {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
