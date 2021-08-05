import React, {Component} from "react";
import './forgot-password.css';

export default class ForgotPassword extends Component{
    state ={
        login: ''
    };

    onClickForgot = ()=>{
        const {onGetID} = this.props;
        onGetID(2);
    }

    render() {
        return(
            <div className='container modal-children'>
                <div className='center margin-bottom'>
                    <p>Забыли логин или пароль?</p>
                </div>
                <div>
                    <p className='name-input'>Введите ваш e-mail</p>
                    <input className='input-author' type='text'/>
                </div>
                <div className='center'>
                    <button className='button-log' onClick={this.onClickForgot}>
                        Отправить
                    </button>
                </div>
            </div>
        )
    }
}