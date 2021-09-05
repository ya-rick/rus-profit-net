import React, {Component} from "react";
import './authorization.css';
import registrationService from '../../services/registrationService';
import { ModalButtonWapper, ModalContent, ModalLink, ModalSubtitle, ModalTitle } from "../../common/components/ModalStyles";
import CommonButton from "../../common/components/CommonButton";
import Input from "../../common/components/Input";
import ErrorMessage from "../../common/components/ErrorMessage";
import { UserContext } from "../mainPage/contexts";
import PasswordInput from "../../common/components/PasswordInput";

class Authorization extends Component {

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
    }

    onPasswordChange = (e)=>{
        this.setState({password: e.target.value});
    }

    setLogin = (error, description, userID) =>{
        if(error){
            this.setState({exception:error, description: description});
        }else{
            this.context.setUserId(userID);
            this.props.closeModal();
        }
    }

    onSubmit = () => {
        const {login, password} = this.state;
        const authorization = new  registrationService();

        authorization.login(login,password).then((res)=> ({
            error: res.data[0].error === true ? true : false,
            description: res.data[0].description,
            userID: res.data[0].id
        })).then(({ error, description, userID }) => {
            this.setLogin(error, description, userID);
        });
    }



    render() {
        return (
            <>
                <ModalTitle>Вход на сайт</ModalTitle>

                <ModalContent>

                    <ModalSubtitle>E-mail</ModalSubtitle>
                    <Input
                        placeholder={'example@example.ru'}
                        onChange={this.onLoginChange}
                    />
                    {this.state.exception && <ErrorMessage>{this.state.description}</ErrorMessage>}

                    <ModalSubtitle>Пароль</ModalSubtitle>
                    <PasswordInput
                        onChange={this.onPasswordChange}
                    />
                    {this.state.exception && <ErrorMessage>{this.state.description}</ErrorMessage>}

                    <ModalLink onClick-={this.onClickForgot}>Забыли логин или пароль?</ModalLink>

                </ModalContent>

                <ModalButtonWapper>
                    <CommonButton onClick={this.onSubmit}>Войти</CommonButton>
                </ModalButtonWapper>
            </>
        )
    }
}

Authorization.contextType = UserContext;

export default Authorization;
