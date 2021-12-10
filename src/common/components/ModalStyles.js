import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Icon from './Icon';


export const ModalContainer = styled.div`
    position: relative;
    background-color: #f1f3f6;
    border-radius: 15px;
    overflow: auto;
    overflow-x: hidden;
`;

export const ModalLayout = styled.div`
    margin-right: -15px;
    padding: 3em;
    min-width: 500px;
    max-height: 70vh;
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
    font-size: 15px;
    color: #4C5E8B;
    text-decoration: underline;
`;

export const ModalButtonWapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block-start: 20px;
`;

export const ModalTitle = styled.h2`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 30px;
    font-weight: 600;
`;

export const ModalSubtitle = styled.h2`
    position: relative;

    font-size: 22px;
    margin-block: 20px;
    font-weight: 500;
`;

export const ReplacedIcon = styled(Icon)`
    position: absolute;

    right: 20px;
    top: 20px;
`;
