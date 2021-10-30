import React, { useEffect, useState } from 'react';

import './error404.css';

import { requestWithParams } from '../../api/exchangeLayer';
import { LinkedButton } from '../../common/components/Buttons';
import styled from 'styled-components';


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
        <Layout image={data.image}>
            <p className='number-error'>
                {data.title}
            </p>
            <div className='text-block'>
                <p className='text-block-text'>
                    {data.subtitle}
                </p>
                <p className='text-block-text'>
                    {data.subtitle2}
                </p>
            </div>
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
    );
};

export default Error404;

const Layout = styled.div`
    display: grid;
    background-image: url(${props => props.image});
    background-position: center;
    background-size: cover;
    background-clip: content-box;
    justify-content: center;
    align-items: end;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    margin: 50px 0;

    > * {
        margin: 0 auto;
    }
`;
