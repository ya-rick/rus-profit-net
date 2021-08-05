import React from "react";
import './imgText.css';
import { useHistory } from 'react-router-dom';


const ImgText = () => {
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