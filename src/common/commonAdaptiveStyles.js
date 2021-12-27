import { css } from 'styled-components';


export const forDevice = {
    M: someCss => css`
      @media (min-width: 640px) {
        ${someCss}
      }
    `,
    L: someCss => css`
      @media (min-width: 1080px) {
        ${someCss}
      }
    `,
    XL: someCss => css`
      @media (min-width: 1580px) {
        ${someCss}
      }
    `,
  }
  
  export const commonPadding = css`
    padding: 1rem 2rem;
  `;