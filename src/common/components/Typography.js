import styled, { css } from 'styled-components';

export const fontWeight = css`font-weight: 600;`;

export const MainTitle = styled.h1`
    font-size: 1.6rem;

    margin: 0;

    ${fontWeight}
`;

export const MainSubtitle = styled.h2`
    font-size: 1.4rem;

    margin: 0;

    ${fontWeight}
`;

export const Subtitle = styled.h3`
    display: flex;
    align-items: center;
    column-gap: 5px;

    font-size: 1.15rem;

    margin: 0;

    ${fontWeight}
`;

export const SmallSubtitle = styled.h4`
    font-size: 1rem;

    margin: 0;

    ${fontWeight}
`;

export const CommonText = styled.span`
    font-size: 1rem;
`;

export const RegularTitle = styled(CommonText)`
    display: block;

    width: max-content;

    margin-block-end: 1rem;
`;

export const AdditionalText = styled.div`
    font-size: .75rem;
    color: #4C5E8B;
`;

export const FooterText = styled.span`
    font-size: .9rem;
`;

export const FormTitle = styled.h4`
    font-size: 1.1rem;

    ${fontWeight}
`;
