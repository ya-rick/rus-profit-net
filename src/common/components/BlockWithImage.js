import styled from 'styled-components';
import { MainContainer } from './Layouts';
import { MainTitle } from './Typography';


export const Wrapper = styled.div`
    background-image: url(${props => props.image});
    background-position: center;
    background-size: cover;
    background-clip: border-box;
 `;

export const Layout = styled(MainContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 2rem;
    height: 100%;
`;

export const Title = styled(MainTitle)`
    background: #F7FBFC;
    opacity: 0.9;
    text-align: center;
    border-radius: 1rem;
    padding: 2rem 1rem;
`;

export const Numberedtitle = styled(Title)`
    font-size: 10em;
    color: #FFFFFF;
    text-shadow: 6px 6px 10px rgba(0, 0, 0, 0.8);
    background-color: transparent;
    padding-block: 0;
`;
