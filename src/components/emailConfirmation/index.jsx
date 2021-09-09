import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Redirect } from 'react-router-dom'

import { requestWithParams } from '../../api/exchangeLayer';
import { ModalVariants } from '../../common/consts';

export default inject('uiStore')(observer(function EmailConfirmation({ uiStore: { openModal } }) {
    const { id } = useParams();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        let timeOut;

        (async () => {
            if (!id) {
                setIsRedirecting(true);
            } else {
                try {
                    await requestWithParams('setAccess', {
                        access_token: id
                    })
    
                    openModal(ModalVariants.InfoModal, {
                        title: 'Поздравляем!!!',
                        description: 'Вы успешно завершили регистрацию. Ваша заявка будет рассмотрена и подтверждена модерацией в течении 24 часов'
                    })
    
                    timeOut = setTimeout(() => setIsRedirecting(true), 3000)
                } catch (e) {
                    setIsRedirecting(true);

                    openModal(ModalVariants.InfoModal, {
                        title: 'Произошла ошибка!',
                        description: 'Пользователь с таким почтовым ящиком уже существует в системе.'
                    })
                }
            }
        })()

        return () => timeOut && clearTimeout(timeOut)
    })

    return isRedirecting && <Redirect to={'/'}/>;
}))
