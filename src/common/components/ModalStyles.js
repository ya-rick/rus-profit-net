import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Icon from './Icon';
import { MainSubtitle, Subtitle } from './Typography';
import HeaderButton from '../../components/header/headerButton';


export const ModalContainer = styled.div`
    position: relative;
    background-color: #f1f3f6;
    overflow: auto;
    overflow-x: hidden;

    ${props => props.theme.smallBorderRadius}
`;

export const ModalLayout = styled.div`
    margin-right: -15px;
    padding: 3em;
    max-height: 70vh;
    max-width: 1080px;
    overflow-y: scroll;
`;

export const ModalCloseImgWrapper = styled.div`
    position: absolute;
    right: 40px;
    top: 40px;
`;

export const ModalContent = styled.div`
    > h2 {
        margin-bottom: 30px;
        margin-top: 40px;
    }
`;

export const ModalLink = styled(Link)`
    display: block;

    margin-top: 15px;
    font-size: .75rem;
    
    color: #4C5E8B;
    text-decoration: underline;
`;

export const ModalButtonWapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block-start: 20px;
`;

export const ModalTitle = styled(MainSubtitle)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 1rem;
`;

export const ModalSubtitle = styled(Subtitle)`
    position: relative;

    margin-block: 20px;
`;

export const ReplacedIcon = styled(Icon)`
    position: absolute;

    right: 20px;
    top: 20px;
`;

export const ModalButton = styled(HeaderButton)`
    ${props => props.theme.smallBorderRadius}
`;
