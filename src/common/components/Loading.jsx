import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
    from {
        transform: rotateZ(0);
    }
    to {
        transform: rotateZ(360deg);
    }
`;

export default styled.div`
    width: 100px;
    height: 100px;
    border: 2px solid #6f80a5;
    border-top: none;
    border-bottom: none;
    border-radius: 50%;
    margin: 0 auto;

    animation: ${rotation} infinite 1s;
`;
