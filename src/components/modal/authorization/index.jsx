import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';

import { ModalButton, ModalButtonWapper, ModalContent, ModalLink, ModalSubtitle, ModalTitle } from '../../../common/components/ModalStyles';
import Input from '../../../common/components/Input';
import ErrorMessage from '../../../common/components/ErrorMessage';
import PasswordInput from '../../../common/components/PasswordInput';
import { ModalVariants } from '../../../common/consts';
import { DefaultContainer } from '../../../common/components/Layouts';
import { withRouter } from 'react-router-dom';


class Authorization extends Component {

    state = {
        exception: false,
        description: '',
        email: '',
        password: ''
    };

    onClickForgot = () => {
        this.props.uiStore.openModal(ModalVariants.ForgotPassword);
    }

    onLoginChange = (e) => {
        this.setState({ email: e.target.value });
    }

    onPasswordChange = (e)=>{
        this.setState({ password: e.target.value });
    }

    onSubmit = async () => {
        try {
            const { email, password } = this.state;

            await this.props.uiStore.userModel.userLogin(email, password);

            this.props.uiStore.closeModal();
        } catch (e) {
            this.setState({
                exception: true,
                description: this.props.localeService.getByKey(e.message)
            });
        }
    }

    render() {
        return (
            <>
                <DefaultContainer>
                    <ModalTitle>Вход на сайт</ModalTitle>
                </DefaultContainer>

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

                    <ModalLink onClick={this.onClickForgot}>Забыли логин или пароль?</ModalLink>

                </ModalContent>

                <ModalButtonWapper>
                    <ModalButton onClick={this.onSubmit}>Войти</ModalButton>
                </ModalButtonWapper>
            </>
        )
    }
}

export default inject('uiStore', 'localeService')(observer(withRouter(Authorization)));
