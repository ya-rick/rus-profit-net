import React, { useState, useEffect, memo } from 'react';

import { requestWithParams } from '../../api/exchangeLayer';
import { LinkedButton } from '../../common/components/Buttons';
import { Layout, ButtonGroup, Title, Wrapper } from '../../common/components/BlockWithImage';


const ImgText = memo(() => {
    const [data, setData] = useState({error: false, description: '', title: '', image: ''});
    
    useEffect(() => {
        requestWithParams('getMainPageData').then(data => setData({    
            title: data.options[0].block1_title,
            image: data.options[1].block1_image
        }));
    }, [])
    
    return (
        <Wrapper image={data.image}>
            <Layout>
                <Title>{data.title}</Title>
                <ButtonGroup>
                    <LinkedButton
                        to={'/searchWorker'}
                    >
                        Найти работника
                    </LinkedButton>
                    <LinkedButton
                        to={'/searchWork'}
                    >
                        Найти работу
                    </LinkedButton>
                </ButtonGroup>
            </Layout>
        </Wrapper>
        
    );
});

export default ImgText;
