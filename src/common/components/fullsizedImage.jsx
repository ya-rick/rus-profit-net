import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Background from './Background';
import Icon from './Icon';


function FullSizedImage({
    uiStore: { hideImage, currentImage, hasPreviousImage, hasNextImage, goToNextImage, goToPreviousImage }
}) {

    function onNext(e) {
        e.stopPropagation();
        goToNextImage();
    }

    function onPrev(e) {
        e.stopPropagation();
        goToPreviousImage();
    }

    return <Background onClick={hideImage}>
        <ImageContainer>
            {hasPreviousImage && <PrevIcon
                iconName={'prev'}
                onClick={onPrev}
            />}
            <Image src={currentImage}/>
            {hasNextImage && <NextIcon
                iconName={'next'}
                onClick={onNext}
            />}
        </ImageContainer>
    </Background>
}

export default inject('uiStore')(observer(FullSizedImage));

const ImageContainer = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: minmax(20%, 50px) auto minmax(20%, 50px);
    grid-template-areas: 'prev img next';
`;

const Image = styled.img`
    position: relative;
    width: 100%;
    grid-area: img;
`;

const PrevIcon = styled(Icon)`
    grid-area: prev;
    align-self: center;
    justify-self: center;
`;

const NextIcon = styled(Icon)`
    grid-area: next;
    align-self: center;
    justify-self: center;
`;
