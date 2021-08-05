import React, {Component} from "react";
import './authorization.css';
import registrationService from '../../services/registrationService';

export default class Authorization extends Component {

    state = {
        login: '',
        password: '',
        exception: false,
        description: ''
    };

    onClickForgot = () => {
        const {onGetID} = this.props;
        onGetID(1);
    }

    onLoginChange = (e) => {
        this.setState({login: e.target.value});
        if (e.target.value.length === 0) {
            this.setState({exception: true})
        }
    }

    onException = () => {
        const {exception, description} = this.state;
        if (exception) {
            return (
                <p className='exception-message'>{description}</p>
            );
        }
    };

    onSubmit = () => {
        const {login, password} = this.state;
        const authorization = new registrationService();
        const data = authorization.login(login, password);
        console.log(data);
    }



    render() {
        const exception = this.onException();
        return (
            <div className='container modal-children'>
                <div className='center margin-bottom'>
                    <p>Вход на сайт</p>
                </div>
                <div>
                    <p className='name-input'>E-mail</p>
                    <input className='input-author' onChange={this.onLoginChange} type='text'/>
                    {exception}
                </div>
                <div>
                    <p className='name-input'>Пароль</p>
                    <input className='input-author' type='text'/>
                </div>
                <div className='margin-bottom'>
                    <button className='a-style' onClick={this.onClickForgot}>Забыли логин или пароль?</button>
                </div>
                <div className='center'>
                    <button className='button-log' onClick={this.onSubmit}>
                        Войти
                    </button>
                </div>
            </div>
        )
    }
}