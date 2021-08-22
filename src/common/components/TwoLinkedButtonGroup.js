import styled from 'styled-components';

export default styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 600px) {
        flex-direction: row;

        a:first-child {
            margin-right: 75px;
        }

        a:last-child {
            margin-left: 75px;
        }
    }

    :last-child {
        margin-top: 70px;
    }
`;