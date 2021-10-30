import { inject } from 'mobx-react';
import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import { PageContentWrapper } from '../../common/components/Layouts';
import { ModalVariants } from '../../common/consts';

import BigLogo from '../../images/2021RusProfiNetFooterLogo.svg';

const layoutGap = '30px';

const Footer = inject('uiStore')(({ uiStore: { openModal } }) => {
    const { pathname } = useLocation();

    function isRoot() {
        return pathname === '/'
    }

    return isRoot() ? null
        : <FooterWrapper>
            <PageContentWrapper>
                <FooterRowsLayout>
                    <ContactsRows area={'contacts1'}>
                        <ContactBlock>+7 916 500 50 50</ContactBlock>
                        <ContactBlock>
                            <LinLikeButton onClick={() => openModal(ModalVariants.FAQ)}>Напишите нам</LinLikeButton>
                        </ContactBlock>
                        <ContactBlock>
                            <Link to={'/advertMen'}>Рекламодателям</Link>
                        </ContactBlock>
                        
                    </ContactsRows>
                    <ContactsRows area={'contacts2'}>
                        <ContactBlock>
                            <Link to={'/faq'}>FAQ</Link>
                        </ContactBlock>
                        <ContactBlock>
                            <Link to={'/userAgreement'}>Пользовательское соглашение</Link>
                        </ContactBlock>
                    </ContactsRows>
                    <div style={{ justifySelf: 'end', gridArea: 'logo' }}>
                        <img src={BigLogo} alt='logo'/>
                    </div>
                </FooterRowsLayout>

                <div style={{ textAlign: 'center', color: '#153D70', fontSize: '13px' }}>
                    2021 RusProfiNet. Все права защищены
                </div>
            </PageContentWrapper>
        </FooterWrapper>
});

export default Footer;

const FooterWrapper = styled.div`
    background: #B9C3D8;

    ${PageContentWrapper} {
        padding-bottom: 1%;
    }
`;

const LinLikeButton = styled.button`
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 0;

    :hover {
        text-decoration: underline;
    }
`;

const FooterRowsLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr) 2fr;
    grid-template-areas: 'contacts1 contacts2 logo';

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

    @media (max-width: 680px) {
        grid-template-columns: 1fr;
        grid-row-gap: ${layoutGap};
        grid-template-areas: 'contacts1' 'contacts2' 'logo';
    }
`;

const ContactsRows = styled.div`
    grid-area: ${props => props.area};

    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    grid-row-gap: ${layoutGap};

    @media (max-width: 680px) {
        align-items: center;

        > * {
            text-align: center;
        }
    }
`;

const ContactBlock = styled.address`

`;
