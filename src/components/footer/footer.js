import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';

import BigLogo from '../../images/2021RusProfiNetFooterLogo.svg';

const Footer = () => {
    const { pathname } = useLocation();

    function isRoot() {
        return pathname === '/'
    }

    return isRoot() ? null
        : <FooterWrapper>
            <FooterInfoWrapper>
                <div>
                    <FooterLinkAsBlock to={'/userAgreement'}></FooterLinkAsBlock>
                    <FooterLinkAsBlock to={'/userAgreement'}>Напишите нам</FooterLinkAsBlock>
                    <FooterLinkAsBlock to={'/userAgreement'}>Рекламодателям</FooterLinkAsBlock>
                </div>
                <div>
                    <FooterLinkAsBlock to={'/userAgreement'}>FAQ</FooterLinkAsBlock>
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
};

export default Footer;

const FooterWrapper = styled.div`
    background: #B9C3D8;
    padding: 5% 2% 3%;
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
