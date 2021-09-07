import { inject, observer } from "mobx-react";
import React from "react";
import './thanks-form.css';

const ThanksForm = ({ uiStore: { modalPayload } }) => {
    return(
        <div className='thanks-block'>
            <div className='center margin-bottom'>
                <p>{modalPayload.title}</p>
            </div>
            <div className='center margin-bottom'>
                <p className='p-text'>{modalPayload.description}</p>
            </div>
        </div>
    )
}

export default inject('uiStore')(observer(ThanksForm));