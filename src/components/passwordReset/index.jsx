import { inject, observer } from 'mobx-react';
import { useEffect } from 'react'
import { useParams } from 'react-router'

import { ModalVariants } from '../../common/consts';

export default inject('uiStore')(observer(function PasswordReset({ uiStore: { openModal } }) {
    const { id } = useParams();

    useEffect(() => {
        openModal(ModalVariants.PasswordResetModal, { id })
    }, [id])

    return null;
}))
