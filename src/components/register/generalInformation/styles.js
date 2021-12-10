import styled from 'styled-components';


export const GeneralInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 50px;

    > * {
        flex: 1 1 50%;
        max-width: 300px;
    }

    @media (max-width: 1020px) {
        flex-wrap: wrap;
    }
`;

export const Image = styled.img`
    width: 100%;
    min-width: 250px;
    max-width: 300px;
    height: auto;
    border: 3px solid #6f80a5;
    border-radius: 15px;
`;

export const InfoWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;

    cursor: default;
`;
