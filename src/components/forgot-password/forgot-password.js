import React, {Component} from "react";
import './forgot-password.css';
import registrationService from "../../services/registrationService";

export default class ForgotPassword extends Component {
    state = {
        login: '',
        error: false,
        description: ''
    };

    onClickForgot = () => {
        const {error, description} = this.state;
        if(!error && description !== ''){
            const {onGetID} = this.props;
            onGetID(2);
            console.log('1')
        }
    };

    onChange = (e) => {
        this.setState({login: e.target.value});
    };

    onSubmit = () => {
        const {login} = this.state;
        const authorization = new registrationService();
        const data = {
            error: false,
            description: ''
        }
        authorization.recovery(login).then((res) => {
            data.error = res.data[0].error;
            data.description = res.data[0].description;
        }).then(() => {
                this.setState({error: data.error, description: data.description});
            }
        ).then(()=> this.onClickForgot());
    };

    onException = () => {
        const {error, description} = this.state;
        if (error) {
            return (
                <p className='exception-message'>{description}</p>
            );
        } else {
            return (
                <></>
            );
        }
    };


    render() {
        this.onClickForgot();
        const exception = this.onException();
        return (
            <div className='modal-children'>
                <div className='center margin-bottom'>
                    <p>Забыли логин или пароль?</p>
                </div>
                <div>
                    <p className='name-input'>Введите ваш e-mail</p>
                    <input className='input-author' onChange={this.onChange} type='text'/>
                    {exception}
                </div>
                <div className='center'>
                    <button className='button-log' onClick={this.onSubmit}>
                        Отправить
                    </button>
                </div>
            </div>
        )
    }
}