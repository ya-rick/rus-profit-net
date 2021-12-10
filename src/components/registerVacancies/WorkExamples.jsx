import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import { InfoWrapper } from '../register/generalInformation/styles';
import Icon from '../../common/components/Icon';
import { PageSubtitle } from '../../common/components/TitleVariants';


function WorkExample({ addImage, removeImage, files_images }) {
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

    function onImageMouseEnter(index) {
        return () => setHoveredImageIndex(index);
    }

    function onImageMouseLeave() {
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

    return <WorkExamplesContainer>
        <div>
            <PageSubtitle>Примеры работ</PageSubtitle>
        </div>

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
                <label for='file-in' className='reg-dwn-img'>Добавьте фотографию</label>
                <p className='reg-subtext'>Размер файла не более 5 Мб</p>
            </InfoWrapper>
        </AddImageLayout>
        
        {files_images.length > 0 && <ExamplesImageLayout>
            {files_images.map((image, index) => <ImageContainer
                onMouseEnter={onImageMouseEnter(index)}
                onMouseLeave={onImageMouseLeave()}
            >
                <StyledImage src={typeof image === 'string' ? image : URL.createObjectURL(image)}/>
                {hoveredImageIndex === index && <RemoveImageIcon
                    iconName={'garbage_collector'}
                    onClick={() => removeImage(image)}
                />}
            </ImageContainer>)}
        </ExamplesImageLayout>}

    </WorkExamplesContainer>
}

export default inject('registrationStore')(observer(WorkExample));

const WorkExamplesContainer = styled.div`

`;

const AddImageLayout = styled.div`
    display: flex;
    justify-content: start;
    margin-bottom: 40px;
`;

const ExamplesImageLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 140px));
    grid-gap: 15px;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 140px;
    height: 140px;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
`;

const RemoveImageIcon = styled(Icon)`
    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ${ImageContainer}:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgb(255, 255, 255, 0.7);
    }
`;
