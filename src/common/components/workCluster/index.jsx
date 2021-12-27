// import { useState } from 'react';
import styled, { css } from 'styled-components';
import { forDevice } from '../../commonAdaptiveStyles';

import { FlyingButton } from '../Buttons';
import { AdditionalText } from '../Typography';


export default function WorkCluster({ currentCategory, categories, onCategoryChanged }) {
    return (
        <WorkClusterContainer>
            {categories?.map(category => <FlyingButton
                active={category.id === currentCategory?.id}
                onClick={() => onCategoryChanged(category)}>
                <AdditionalText>{category.name}</AdditionalText>
            </FlyingButton>)}
        </WorkClusterContainer>
    );
};

const WorkClusterContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    margin-bottom: 1rem;

    ${forDevice.M(css`
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    `)}

    ${forDevice.L(css`
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    `)}
`;
