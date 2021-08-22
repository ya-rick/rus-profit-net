import React, {Component} from "react";
import './forgot-password.css';
import registrationService from "../../services/registrationService";
import { ModalButtonWapper, ModalContent, ModalSubtitle, ModalTitle } from "../../common/components/ModalStyles";
import Input from "../../common/components/Input";
import CommonButton from "../../common/components/CommonButton";

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
            <>
            
                <ModalTitle>Забыли логин или пароль?</ModalTitle>

                <ModalContent>

                    <ModalSubtitle>Введите ваш e-mail</ModalSubtitle>
                    <Input
                        placeholder={'maria@mail.ru'}
                        onChange={this.onChange}
                    />

                </ModalContent>

                <ModalButtonWapper>
                    <CommonButton onClick={this.onSubmit}>Отправить</CommonButton>
                </ModalButtonWapper>

            </>
        )
    }
}