import React, { useEffect, useState } from 'react';

import './error404.css';

import { requestWithParams } from '../../api/exchangeLayer';
import { LinkedButton } from '../../common/components/Buttons';


const Error404 = () => {
    const [data, setData] = useState({error: false, description: '', title: '', image: '', subtitle: '', subtitle2: ''});

    useEffect(() => {
        requestWithParams('get404PageData')
            .then(data => setData({
                image : data.options[0].block1_image,
                title : data.options[1].block1_title,
                subtitle : data.options[2].block1_subtitle,
                subtitle2 : data.options[3].block1_subtitle2
            }))
    }, []);

    const myStyle = {
        backgroundSize: 'recover',
        backgroundPositionX: 'center',
        width: '100%',
        backgroundImage: `url(${data.image})`
    }

    return (
        <div className='img-text' style={myStyle}>
            <div className='col-xs-12 col-md-12 col-lg-6 page-error-img'>
                <div>
                    <p className='number-error'>
                        {data.title}
                    </p>
                </div>
                <div className='text-block-error'>
                    <p className='text-error'>
                        {data.subtitle}
                    </p>
                    <p className='text-error'>
                        {data.subtitle2}
                    </p>
                </div>
                <div className='group-error-button'>
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
            </div>
        </div>
    );
};

export default Error404;