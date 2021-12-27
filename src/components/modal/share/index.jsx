import React from 'react';
import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    OKIcon,
    OKShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    ViberIcon,
    ViberShareButton,
    VKIcon,
    VKShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';
import styled from 'styled-components';

const shareButtons = [
    {
        ButtonComponent: FacebookShareButton,
        Icon: FacebookIcon
    },
    {
        ButtonComponent: ViberShareButton,
        Icon: ViberIcon
    },
    {
        ButtonComponent: FacebookMessengerShareButton,
        Icon: FacebookMessengerIcon
    },
    {
        ButtonComponent: TelegramShareButton,
        Icon: TelegramIcon
    },
    {
        ButtonComponent: VKShareButton,
        Icon: VKIcon
    },
    {
        ButtonComponent: TwitterShareButton,
        Icon: TwitterIcon
    },
    {
        ButtonComponent: WhatsappShareButton,
        Icon: WhatsappIcon
    },
    {
        ButtonComponent: OKShareButton,
        Icon: OKIcon
    }
]

export default function Share() {
    return <Layout>
        {shareButtons.map(button => <button.ButtonComponent
            url={window.location.href}
        >
                <button.Icon borderRadius={20}/>
        </button.ButtonComponent>)}
    </Layout>
}

const Layout = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
`;
