import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ModalContainer = styled.div`
    background-color: #f1f3f6;
    position: relative;
    overflow-y: auto;
    pointer-events: all;
    border-radius: 15px;
    width: 600px;
`;

export const ModalLayout = styled.div`
    margin: 80px;
`;

export const ModalCloseImgWrapper = styled.div`
    position: absolute;
    right: 40px;
    top: 40px;
`;

export const ModalContent = styled.div`
    margin: 70px 0;

    > h2 {
        margin-bottom: 30px;
        margin-top: 40px;
    }
`;

export const ModalLink = styled(Link)`
    display: block;
    margin-top: 15px;
    font-size: 15px;
    line-height: 18px;
    color: #4C5E8B;
    text-decoration: underline;
`;

export const ModalButtonWapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalTitle = styled.h2`
    font-size: 30px;
    line-height: 35px;
    font-weight: 600;
    margin: 0 auto;
    text-align: center;
`;

export const ModalSubtitle = styled.h2`
    font-size: 22px;
    line-height: 35px;
    margin: 0;
    font-weight: 600;
`;
