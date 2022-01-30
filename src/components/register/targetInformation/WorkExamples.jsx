import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import styled, { css } from 'styled-components';

import { InfoWrapper } from '../generalInformation/styles';
import Icon from '../../../common/components/Icon';
import { AdditionalText, Subtitle } from '../../../common/components/Typography';
import { DefaultContainer } from '../../../common/components/Layouts';
import Background from '../../../common/components/Background';


function SingleExample({ src, onRemoveClicked, onResizeClicked, isActive, ...wrapperProps }) {
    return (
        <ExampleWrapper {...wrapperProps}>
            <ExampleImage
                src={typeof src === 'string' ? src : URL.createObjectURL(src)}
                alt={'Пример работ'}
                isActive={isActive}
            />

            {isActive && <ExampleOptionsContainer>
                <Icon
                    iconName={'resize'}
                    color={'white'}
                    onClick={() => onResizeClicked(src)}
                />

                <Icon
                    iconName={'garbage_collector'}
                    color={'#e43e62'}
                    onClick={() => onRemoveClicked(src)}
                />
            </ExampleOptionsContainer>}
        </ExampleWrapper>
    )
}

function WorkExample({ addImage, removeImage, files_images }) {
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
    const [fullSizedImage, setFullSizedImage] = useState(null);

    function closeImage() {
        setFullSizedImage(null);
    }

    function onImageMouseEnterBinder(index) {
        return () => setHoveredImageIndex(index);
    }

    function onImageMouseLeaveBinder() {
        return () => setHoveredImageIndex(null);
    }

    function onChoosePhotoes(e) {
        const files = e.target.files;

        if (files) {
            Array.prototype.forEach.call(files, (file => {
                addImage(file);
            }))
        }
    }

    return (
        <WorkExamplesContainer>
            <DefaultContainer>
                <Subtitle>Примеры работ</Subtitle>
            </DefaultContainer>

            <AddImageLayout>
                <InfoWrapper>
                    <input
                        id='file-in'
                        className='reg-dwn-img'
                        type='file'
                        style={{ display: 'none' }}
                        onClick={e => e.target.value = null}
                        onChange={onChoosePhotoes}
                        multiple
                    />

                    <WithBackgroundWrapper>
                        <label
                            for='file-in'
                        >
                            Добавьте фотографию
                        </label>
                    </WithBackgroundWrapper>

                    <Description>Размер файла не более 5 Мб</Description>
                </InfoWrapper>
            </AddImageLayout>
            
            {files_images.length > 0 && <ExamplesImageLayout>
                {files_images.map((image, index) => <SingleExample
                    onMouseEnter={onImageMouseEnterBinder(index)}
                    onMouseLeave={onImageMouseLeaveBinder()}
                    src={image}
                    isActive={hoveredImageIndex === index}
                    onRemoveClicked={removeImage}
                    onResizeClicked={setFullSizedImage}
                />)}
            </ExamplesImageLayout>}

            {fullSizedImage && <Background onClick={closeImage}>
                <FullSizeImage
                    src={fullSizedImage}
                    onClick={closeImage}
                />
            </Background>}

        </WorkExamplesContainer>
    );
}

export default inject('registrationStore')(observer(WorkExample));

const WorkExamplesContainer = styled.div``;

const AddImageLayout = styled.div`
    display: flex;
    justify-content: start;
    margin-bottom: 2rem;
`;

const ExamplesImageLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 140px));
    grid-auto-rows: minmax(100px, 140px);
    gap: 1rem;
`;

const ExampleWrapper = styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    cursor: pointer;
`;

const ExampleImage = styled.img`
    position: relative;

    width: 100%;
    height: 100%;
`;

const FullSizeImage = styled.img`
    max-height: 80%;
    max-width: 80%;

    cursor: pointer;
`;

const ExampleOptionsContainer = styled.div`
    position: absolute;

    width: 100%;
    height: 100%;

    top: 0;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;

    :hover {
        ::before {
            content: '';
    
            position: absolute;
            width: 100%;
            height: 100%;

            background-color: rgb(255, 255, 255, 0.6);
        }
    }
`;

const WithBackgroundWrapper = styled.div`
    background: #F7FBFC;
    padding: .5rem 1rem;
    text-align: center;

    ${props => props.theme.smallBorderRadius}
`;

const Description = styled(AdditionalText)`
    position: absolute;

    transform: translateY(200%);
`;
