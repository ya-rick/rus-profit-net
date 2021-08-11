import React, {useState} from "react";
import './error404.css';
import {useHistory} from 'react-router-dom';
import MainPageService from "../../services/mainPageService";
import * as url from "url";


const Error404 = () => {
    const service = new MainPageService();
    const [data, setData] = useState({error: false, description: '', title: '', image: '', subtitle: '', subtitle2: ''});
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        service.getErrorPage().then((res) => setData({
            description : res.data[0].description,
            error : res.data[0].error,
            image : res.data[0].options[0].block1_image,
            title : res.data[0].options[1].block1_title,
            subtitle : res.data[0].options[2].block1_subtitle,
            subtitle2 : res.data[0].options[3].block1_subtitle2
        }));
        setLoaded(true);
    }
    const history = useHistory();

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
                    <button className='img-button col-xs-5 col-md-5 col-lg-5'
                            onClick={() => history.push('/searchWorker')}>
                        Найти работника
                    </button>
                    <button className='img-button col-xs-5 col-md-5 col-lg-5'
                            onClick={() => history.push('/searchWork')}>
                        Найти работу
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Error404;