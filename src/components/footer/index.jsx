import { inject } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { forDevice } from '../../common/commonAdaptiveStyles';
import { MainContainer } from '../../common/components/Layouts';
import { FooterText } from '../../common/components/Typography';
import { ModalVariants } from '../../common/consts';

import BigLogo from '../../images/2021RusProfiNetFooterLogo.svg';

const layoutGap = '30px';

const Footer = inject('uiStore')(({ uiStore: { openModal } }) => <FooterWrapper>
    <MainContainer>
        <FooterRowsLayout>
            <ContactsRows area={'contacts1'}>
                <FooterText>+7 916 500 50 50</FooterText>

                <LinkLikeButton onClick={() => openModal(ModalVariants.FAQ)}>
                    <FooterText>Напишите нам</FooterText>
                </LinkLikeButton>
                
                <Link to={'/advertMen'}>
                    <FooterText>Рекламодателям</FooterText>
                </Link>
            </ContactsRows>

            <ContactsRows area={'contacts2'}>
                <Link to={'/faq'}>
                    <FooterText>FAQ</FooterText>
                </Link>
                
                <Link to={'/userAgreement'}>
                    <FooterText>Пользовательское соглашение</FooterText>
                </Link>
            </ContactsRows>

            <LogoWrapper src={BigLogo} alt='logo'/>
        </FooterRowsLayout>

        <RightsText>
            2021 RusProfiNet. Все права защищены
        </RightsText>
    </MainContainer>
</FooterWrapper>);

export default Footer;

const FooterWrapper = styled.div`
    background: #B9C3D8;
`;

const LinkLikeButton = styled.button`
    padding: 0;
    text-align: start;
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
    grid-auto-rows: min-content;
    grid-row-gap: ${layoutGap};
    

    @media (max-width: 680px) {
        align-items: center;

        > * {
            text-align: center;
        }
    }
`;

const LogoWrapper = styled.img`
    justify-self: center;
    grid-area: logo;

    ${forDevice.M(css`
        justify-self: end;
    `)}
`;

const RightsText = styled.div`
    color: #153D70;
    font-size: .6rem;
    text-align: center;
`;