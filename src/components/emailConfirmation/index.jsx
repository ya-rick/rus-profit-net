import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { requestWithParams } from '../../api/exchangeLayer';
import { ModalVariants } from '../../common/consts';

export default inject('uiStore', 'localeService')(observer(function EmailConfirmation({
    uiStore: { openModal },
    localeService
}) {
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
                        title: 'Ошибка!',
                        description: localeService.getByKey(e.message)
                    })
                }
            }
        })()

        return () => timeOut && clearTimeout(timeOut)
    }, [id])

    if (isRedirecting) return <Redirect to={'/'}/>;

    return <div></div>;
}))
