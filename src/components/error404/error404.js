import React, { useEffect, useState } from 'react';

import { requestWithParams } from '../../api/exchangeLayer';
import { LinkedButton } from '../../common/components/Buttons';
import { ButtonGroup, Layout, Numberedtitle, Title, Wrapper } from '../../common/components/BlockWithImage';


const Error404 = () => {
    const [data, setData] = useState({error: false, description: '', title: '', image: '', subtitle: '', subtitle2: ''});

    useEffect(() => {
        requestWithParams('get404PageData')
            .then(data => setData({
                image : data.options[0].block1_image,
                title : data.options[1].block1_title,
                subtitle : data.options[2].block1_subtitle,
                subtitle2 : data.options[3].block1_subtitle2
            }))
    }, []);

    // refactor as imgtext 
    return (
        <Wrapper image={data.image}>
            <Layout>
                <Numberedtitle>{data.title}</Numberedtitle>
                <Title>
                    {data.subtitle}
                    <br/>
                    {data.subtitle2}
                </Title>
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
};

export default Error404;
