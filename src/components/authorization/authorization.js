import React, {Component} from "react";
import './authorization.css';
import registrationService from '../../services/registrationService';
import { ModalButtonWapper, ModalContent, ModalLink, ModalSubtitle, ModalTitle } from "../../common/components/ModalStyles";
import CommonButton from "../../common/components/CommonButton";
import Input from "../../common/components/Input";

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
        );
    }



    render() {
        const exception = this.onException();
        return (
            <>
                <ModalTitle>Вход на сайт</ModalTitle>

                <ModalContent>

                    <ModalSubtitle>E-mail</ModalSubtitle>
                    <Input
                        placeholder={'maria@mail.ru'}
                        onChange={this.onLoginChange}
                    />

                    <ModalSubtitle>Пароль</ModalSubtitle>
                    <Input
                        type={'password'}
                        onChange={this.onPasswordChange}
                    />

                    <ModalLink onClick-={this.onClickForgot}>Забыли логин или пароль?</ModalLink>

                </ModalContent>

                <ModalButtonWapper>
                    <CommonButton onClick={this.onSubmit}>Войти</CommonButton>
                </ModalButtonWapper>
            </>
        )
    }
}