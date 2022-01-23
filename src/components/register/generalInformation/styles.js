import styled, { css } from 'styled-components';
import { forDevice } from '../../../common/commonAdaptiveStyles';
import { AdditionalText } from '../../../common/components/Typography';


export const GeneralInfoWrapper = styled.div`
    display: grid;
    grid-template-columns: max-content;
    grid-template-rows: max-content;

    justify-content: center;
    
    gap: 1rem;
    
    ${forDevice.M(css`
        justify-items: stretch;
        grid-template-columns: repeat(2, 1fr);
    `)}

    ${forDevice.L(css`
        grid-template-columns: repeat(4, 1fr);
    `)}
`;

export const Image = styled.img`
    height: 100%;
    min-width: 250px;
    max-width: 300px;
    height: auto;
    border: 3px solid #6f80a5;
    border-radius: 15px;
`;

export const InfoWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    row-gap: 30px;

    cursor: default;
`;

export const Description = styled(AdditionalText)`
    position: absolute;

    transform: translateY(120%);

    text-align: center;
`;
