import React from "react";
import { Link, useLocation } from 'react-router-dom';
import styled from "styled-components";

import BigLogo from '../../images/2021RusProfiNetFooterLogo.svg';

const Footer = () => {
    const { pathname } = useLocation();

    function isRoot() {
        return pathname === '/'
    }

    return (
        isRoot() ? null
        :   <FooterWrapper>
            <FooterInfoWrapper>
                <div>
                    <FooterLinkAsBlock href='/#'>+7 916 500 50 50</FooterLinkAsBlock>
                    <FooterLinkAsBlock href='https://google.com'>Напишите нам</FooterLinkAsBlock>
                    <FooterLinkAsBlock href='http://localhost:3000'>Рекламодателям</FooterLinkAsBlock>
                </div>
                <div>
                    <FooterLinkAsBlock href='http://127.0.0.1:3000'>FAQ</FooterLinkAsBlock>
                    <FooterLinkAsBlock to={'/userAgreement'}>Условия использования</FooterLinkAsBlock>
                </div>
                <div>

                </div>
                <div>
                    <img src={BigLogo} alt='logo'/>
                </div>
            </FooterInfoWrapper>

            <div style={{ textAlign: 'center', color: '#153D70', fontSize: '15px' }}>
                2021 RusProfiNet. Все права защищены
            </div>
        </FooterWrapper>
    );
};

export default Footer;

const FooterWrapper = styled.div`
    background: #B9C3D8;
    
    padding: 50px 70px 20px;

    
`;

const FooterInfoWrapper = styled.div`
    display: flex;    
    justify-content: space-between;
    align-items: flex-start;
    align-content: center;
    gap: 30px;

    margin-bottom: 50px;

    > *::last-child {
        margin-right: 0;
        margin-left: auto;
    }

    > div a {
        margin-bottom: 20px;

        :hover {
            text-decoration: underline;
        }
    }

    > div img {
        align-self: center;
    }

    @media (max-width: 800px) {
        flex-wrap: wrap;
    }
`;

const FooterLinkAsBlock = styled(Link)`
    display: block;
`;
