import React from "react";
import './imgText.css';
import { useHistory } from 'react-router-dom';
import MainPageService from "../../services/mainPageService";


const ImgText = () => {
    const service = new MainPageService();
    const data = {
        title:'',
        image:'',
        error: false,
        description: ''
    }
    service.getMainPage().then((res)=>{
        data.error = res.data[0].error;
        data.description = res.data[0].description;
        data.title = res.data[0].options[0].block1_title;
        data.image = res.data[0].options[1].block1_image;
        console.log(res);
    }).then(()=>console.log(data));
    const history = useHistory();
    return (
        <div className='img-text'>
            <div className='col-xs-12 col-md-12 col-lg-6 main-page-img'>
                <div className='group-button'>
                    <button className='img-button col-xs-5 col-md-5 col-lg-5' onClick={()=>history.push('/searchWorker')}>
                        Найти работника
                    </button>
                    <button className='img-button col-xs-5 col-md-5 col-lg-5' onClick={()=>history.push('/searchWork')}>
                        Найти работу
                    </button>
                </div>
                <div className='text-block'>
                    <p className='text-block-text'>
                        Профессиональная сеть <br/> русскоговорящих специалистов
                    </p>
                </div>
            </div>
            <div className='col-xs-12 col-md-0 col-lg-3'>

            </div>
        </div>
    );
};

export default ImgText;