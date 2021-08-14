import React, {useState} from "react";
import './imgText.css';
import {useHistory} from 'react-router-dom';
import MainPageService from "../../services/mainPageService";


const ImgText = () => {
    const service = new MainPageService();
    const [data, setData] = useState({error: false, description: '', title: '', image: ''});
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        service.getMainPage().then((res) => setData({
            error: res.data[0].error,
            description: res.data[0].description,
            title: res.data[0].options[0].block1_title,
            image: res.data[0].options[1].block1_image
        }));
        setLoaded(true);
    }

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
                    <button className='img-button col-xs-5 col-md-5 col-lg-5'
                            onClick={() => history.push('/searchWorker')}>
                        Найти работника
                    </button>
                    <button className='img-button col-xs-5 col-md-5 col-lg-5'
                            onClick={() => history.push('/searchWork')}>
                        Найти работу
                    </button>
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