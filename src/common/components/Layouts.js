import styled from 'styled-components'

export const PageContentWrapper = styled.div`
    padding: 70px 15px 100px;

    @media (min-width: 1320px) {
        width: 1320px;
        margin: 0 auto;
    }
`;

export const Centerer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AdaptiveCenterer = styled(Centerer)`
    > * {
        flex-basis: 100%;
    }

    @media (max-width: 1320px) {
        flex-wrap: wrap;

        > * {
            flex: 1 1 40%;
        }
    }
    
    @media (max-width: 650px) {
        > * {
            flex: 1 1 100%;
        }
    }
`;

export const GapedAdaptiveCenterer = styled(AdaptiveCenterer)`
    column-gap: 50px;
    row-gap: 70px;
`;
