import React, { useState, useEffect } from "react";
import './imgText.css';
import { useHistory } from 'react-router-dom';
import { requestWithParams } from "../../api/exchangeLayer";
import { LinkedButton } from "../../common/components/Buttons";


const ImgText = () => {
    const [data, setData] = useState({error: false, description: '', title: '', image: ''});
    
    useEffect(() => {
        requestWithParams('getMainPageData').then(data => setData({    
            title: data.options[0].block1_title,
            image: data.options[1].block1_image
        }));
    }, [])
    

    const myStyle = {
        backgroundSize: 'recover',
        backgroundPositionX: 'center',
        width: '100%',
        minHeight: '100%',
        backgroundImage: `url(${data.image})`
    }

    return (
        <div className='img-text' style={myStyle}>
            <div className='main-page-img'>
                <div className='group-button'>
                    <LinkedButton
                        to={'/searchWorker'}
                    >
                        Найти работника
                    </LinkedButton>
                    <LinkedButton
                        to={'/searchWork'}
                    >
                        Найти работу
                    </LinkedButton>
                </div>
                <div className='text-block'>
                    <p className='text-block-text'>
                        {data.title}
                    </p>
                </div>
            </div>
            <div className='col-xs-12 col-md-0 col-lg-3'>

            </div>
        </div>
    );
};

export default ImgText;