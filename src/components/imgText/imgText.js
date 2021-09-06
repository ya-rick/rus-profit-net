import React, { useState, useEffect } from "react";
import './imgText.css';
import {useHistory} from 'react-router-dom';
import { requestWithParams } from "../../api/exchangeLayer";
import LinkedButton from "../../common/components/LinkedButton";


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
        backgroundImage: `url(${data.image})`
    }

    const history = useHistory();
    return (
        <div className='img-text' style={myStyle}>
            <div className='col-xs-12 col-md-12 col-lg-6 main-page-img'>
                <div className='group-button'>
                    <LinkedButton onClick={() => history.push('/searchWorker')}>
                        Найти работника
                    </LinkedButton>
                    <LinkedButton onClick={() => history.push('/searchWork')}>
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