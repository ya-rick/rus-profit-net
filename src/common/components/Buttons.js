import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';

import { activeButtonStyleMixin, buttonStylesMixin, HeaderButtonTextMixin } from './mixins';
import { commonPadding, forDevice } from '../commonAdaptiveStyles';
import { useCallback } from 'react';


export const CommonButton = styled.button`
    ${buttonStylesMixin};
    ${activeButtonStyleMixin};
`;

export const LinkedButton = ({to, onClick = () => {}, ...rest}) => {
    const history = useHistory();

    const localOnClick = useCallback(e => {
        onClick(e);

        history.push(to);
    }, [onClick]);

    return <CommonButton
        {...rest}
        onClick={localOnClick}
    />
}

export const FlyingButton = styled.button`
    background-color: #f7fbfc;
    padding: .5rem .1rem;

    ${props => props.active && 'box-shadow: 4px 4px 10px #4C5E8B;'}

    :hover {
        box-shadow: 4px 4px 10px #4C5E8B;
    }

    ${forDevice.M(css`
        ${commonPadding};
    `)}
    
    ${props => props.theme.smallBorderRadius};
`;

export const SecondaryButton = styled(CommonButton)`
  box-shadow: none;
  column-gap: .75rem;
  min-width: auto;
  border-radius: 1rem;

  ${HeaderButtonTextMixin}
`
