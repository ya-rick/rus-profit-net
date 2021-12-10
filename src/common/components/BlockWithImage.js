import styled from 'styled-components';
import { PageContentWrapper } from './Layouts';


export const Wrapper = styled.div`
    background-image: url(${props => props.image});
    background-position: center;
    background-size: cover;
    background-clip: border-box;
 `;

export const Layout = styled(PageContentWrapper)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 50px;
    height: 100%;
`;

export const Title = styled.h2`
    background: #F7FBFC;
    border-radius: 20px;
    font-size: 2em;
    font-weight: 600;
    text-align: center;
    padding-block: 2em;
    margin-block: 0;
    opacity: 0.9;
`;

export const Numberedtitle = styled(Title)`
    font-size: 10em;
    color: #FFFFFF;
    text-shadow: 6px 6px 10px rgba(0, 0, 0, 0.8);
    background-color: transparent;
    padding-block: 0;
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 50px;

    > * {
        margin: 0 auto;
    }
`;