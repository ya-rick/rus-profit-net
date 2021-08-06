import React from "react";
import './thanks-form.css';

const ThanksForm = ()=>{
    return(
        <div className='thanks-block'>
            <div className='center margin-bottom'>
                <p>Спасибо!</p>
            </div>
            <div className='center margin-bottom'>
                <p className='p-text'>Данные для входа были отправлены на почту</p>
            </div>
        </div>
    )
}

export default ThanksForm;