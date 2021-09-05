import styled from 'styled-components';
import { activeButtonStyleMixin, buttonStylesMixin } from './mixins';

export default styled.button`
    ${buttonStylesMixin};
    ${activeButtonStyleMixin};
    outline: none;
`;