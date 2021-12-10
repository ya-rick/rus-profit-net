import { inject, observer } from 'mobx-react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { requestWithParams } from '../../api/exchangeLayer';
import { ModalVariants } from '../../common/consts';


export default inject('uiStore')(observer(function PasswordReset({ uiStore: { openModal } }) {
    const { id } = useParams();

    useEffect(() => {
        openModal(ModalVariants.PasswordResetModal, {
                request: (new_password) => requestWithParams('changePasswordRecovery', {
                    recovery_token: id,
                    new_password
                }),
                isReset: true
        })
    }, [id]);

    return null;
}))
