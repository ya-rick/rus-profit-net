import React, {Component} from "react";
import './authorization.css';
import registrationService from '../../services/registrationService';

export default class Authorization extends Component {

    state = {
        login: '',
        password: '',
        exception: true,
        description: ''
    };

    onClickForgot = () => {
        const {onGetID} = this.props;
        onGetID(1);
    }

    onLoginChange = (e) => {
        this.setState({login: e.target.value});
    }

    onPasswordChange = (e)=>{
        this.setState({password: e.target.value});
    }

    onException = () => {
        const {exception, description} = this.state;
        if (exception) {
            return (
                <p className='exception-message'>{description}</p>
            );
        }else {
            return (
                <></>
            );
        }
    };

    setLogin = (error, description) =>{
        if(error){
            this.setState({exception:error, description: description});
        }else{
            const {onGetID} = this.props;
            onGetID(1000);
        }
    }

    onSubmit = () => {
        const {login, password} = this.state;
        const authorization = new  registrationService();
        const data = {
            error: false,
            description: ''
        }
        authorization.login(login,password).then((res)=>{
            data.error = res.data[0].error;
            data.description = res.data[0].description;
        }).then(() =>
            this.setLogin(data.error, data.description)
        ).then(()=>console.log(data));
    }



    render() {
        const exception = this.onException();
        return (
            <div className='modal-children'>
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
                    <input className='input-author' onChange={this.onPasswordChange} type='password'/>
                    {exception}
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