import React, {useState, useCallback} from "react";
import Cropper from "react-easy-crop";
import './react-easy-crop.css';
import './red-img.css';
import getCroppedImg from "./cropImage";
import RangeSlider from "../rangeSlider";

const RedImg = ({image, setPhoto}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage =
        useCallback(async () => {
            try {
                const croppedImage = await getCroppedImg(
                    image,
                    croppedAreaPixels,
                )
                console.log('donee', {croppedImage});
                setCroppedImage(croppedImage);
                setPhoto(croppedImage);

            } catch (e) {
                console.error(e)
            }
        }, [croppedAreaPixels]);

    const onChange = (value)=>{
        setZoom(value);
    }

    return (
        <div className='red-display'>
            <div className='modal-redact'>
                <Cropper
                    disableAutomaticStylesInjection={true}
                    image={image}
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
                <button className='img-button' onClick={showCroppedImage}>
                    Сохранить
                </button>
            </div>
        </div>
    )
};

export default RedImg;

