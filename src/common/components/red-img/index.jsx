import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import './react-easy-crop.css';

import getCroppedImg from './cropImage';
import { RangeSlider} from '../rangeSlider';
import { CommonButton } from '../Buttons';


const RedImg = inject('uiStore')(observer(({
    uiStore: { modalPayload, closeModal }
}) => {
    const { photo, onSuccessCallback } = modalPayload;

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    async function showCroppedImage() {
        try {
            const croppedImage = await getCroppedImg(
                photo,
                croppedAreaPixels,
            )
            onSuccessCallback(croppedImage);
            closeModal();

        } catch (e) {
            console.error(e)
        }
    }

    const onChange = (value)=>{
        setZoom(value);
    }

    return (
        <FormWrapper>
            <CropperLayout>
                <Cropper
                    disableAutomaticStylesInjection={true}
                    image={photo}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />

                <SliderWrapper>
                    <RangeSlider min={1} max={10} onChange={onChange} value={zoom}/>
                </SliderWrapper>
            </CropperLayout>


            <CommonButton onClick={showCroppedImage}>
                Сохранить
            </CommonButton>
        </FormWrapper>
    )
}));

export default RedImg;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
`;

const CropperLayout = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 300px;
`;

const SliderWrapper = styled.div`
    width: 300px;

    margin-top: auto;
    margin-bottom: 0;
`;
