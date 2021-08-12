import React, {useState} from "react";
import './register.css';
import {useHistory} from 'react-router-dom';
import MainPageService from "../../services/mainPageService";
import Logo from "../../images/logo_outcome_Artboard_6_1.png";
import HeaderRegister from "../header-reg";


const Register = () => {
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
        <div className='img-reg' style={myStyle}>
            <HeaderRegister/>
            <div className='col-xs-12 col-md-12 col-lg-6 main-page-img'>
                <div className='group-button'>
                    <button className='img-reg-button col-xs-5 col-md-5 col-lg-5'
                            onClick={() => history.push('/registerVacancies')}>
                        Регистрация вакансии
                    </button>
                    <button className='img-reg-button col-xs-5 col-md-5 col-lg-5'
                            onClick={() => history.push('/registerQuestionaries')}>
                        Регистрация анкеты
                    </button>
                </div>
                <div className='text-block'>
                    <p className='text-block-text'>
                        {data.title}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;