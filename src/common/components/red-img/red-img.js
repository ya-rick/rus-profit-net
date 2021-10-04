import React, {useState, useCallback, useContext} from "react";
import Cropper from "react-easy-crop";

import './react-easy-crop.css';
import './red-img.css';

import getCroppedImg from "./cropImage";
import RangeSlider from "../rangeSlider";
import { CommonButton, LinkedButton } from "../Buttons";
import { inject, observer } from "mobx-react";

const RedImg = inject('uiStore')(observer(({
        uiStore: { modalPayload: { photo, onSuccessCallback }, closeModal }
    }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

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
        <div className='red-display'>
            <div className='modal-redact'>
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
            </div>
            <div className='margin-top-15'>
                <RangeSlider min={1} max={10} onChange={onChange} value={zoom} />
            </div>
            <div className='center margin-top-15'>
                <CommonButton onClick={showCroppedImage}>
                    Сохранить
                </CommonButton>
            </div>
        </div>
    )
}));

export default RedImg;
