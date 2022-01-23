import styled, { css } from 'styled-components'
import { forDevice } from '../commonAdaptiveStyles';


export const DefaultContainer = styled.div`
    padding-block: 2%;
`;

export const MainContainer = styled(DefaultContainer)`
    padding-inline: 4%;
    width: 100%;
    
    ${forDevice.XL(css`
        margin: 0 auto;
        width: 1580px;
    `)}
`;

export const Centerer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
`;

export const AdaptiveGrid = styled.div`
    display: grid;
    gap: .5rem;
    grid-auto-columns: 1fr;
    grid-template-areas:
        'country'    'city'
        'salary'     'search'
        'experience' 'age'
    ;

    ${forDevice.M(css`
        grid-template-areas:
            'country    salary'
            'city       search'
            'experience age';
    `)}

    ${forDevice.L(css`
        grid-template-areas:
            'country salary experience ${props => props.isBigger && 'age'}'
            'city    search experience ${props => props.isBigger && 'age'}'
        ;
    `)}
`;

export const FlexSpaceBetweenContainer = styled.div`
    display: flex;
    justify-content: space-between;
    aiign-items: center;
`;
