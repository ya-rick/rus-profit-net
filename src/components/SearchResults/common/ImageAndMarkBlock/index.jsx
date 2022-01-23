import styled from 'styled-components';

import DefaultAvatar from '../../../../images/avatar.png';

import Background from '../../../../common/components/Background';
import HandsLike from './HandsLike';
import { useState } from 'react';

export default function ImageAndMarkBlock({ avatar = DefaultAvatar, mark, onMarkClick }) {
    const [fullSize, setFullSize] = useState(false);

    function onImageClick(e) {
        e.stopPropagation();

        if (avatar === DefaultAvatar) return;

        setFullSize(true);
    }

    function closeImage(e) {
        e.stopPropagation();

        setFullSize(false);
    }

    return (
        <>
            <ImageBlockWrapper>
                <AvatarImg
                    src={avatar}
                    onClick={onImageClick}
                />

                <HandsLike
                    currentMark={mark}
                    onHandClick={onMarkClick}
                />
            </ImageBlockWrapper>

            {fullSize && <Background onClick={closeImage}>
                <FullSizeImage
                    src={avatar}
                    onClick={closeImage}
                />
            </Background>}
        </>
    )
}

const ImageBlockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > * {
        flex-grow: 1;
    }
`;

const FullSizeImage = styled.img`
    max-width: 80%;
    max-height: 80%;

    cursor: pointer;
`;

const AvatarImg = styled.img`
    width: 100%;

    cursor: pointer;
`;
