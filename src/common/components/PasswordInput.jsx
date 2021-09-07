import { useState } from 'react';
import styled from 'styled-components';

import Input from './Input';
import Icon from './Icon';

export default function PasswordInput(props) {
    const [passwordHidden, setPasswordHidden] = useState(true);

    return <InputWithIconWrapper>
        <Input 
            {...props}
            type={passwordHidden && 'password'}
        />
        <InputIcon
            iconName={passwordHidden ? 'close_eye' : 'opened_eye'}
            onClick={() => setPasswordHidden(!passwordHidden)}
        />
    </InputWithIconWrapper>;
}

const InputWithIconWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;

    > input {
        padding-right: 60px;
    }
`;

const InputIcon = styled(Icon)`
    position: absolute;
    right: 20px;
`;
