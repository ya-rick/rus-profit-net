import styled from 'styled-components'

export const PageContentWrapper = styled.div`
    padding: 3% 2%;

    @media (min-width: 1320px) {
        width: 1320px;
        margin: 0 auto;
    }
`;

export const PageInfoBlockWithTitle = styled.div`
    
`;

export const Centerer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
`;

export const AdaptiveGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.cols}, 1fr);
    gap: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;
