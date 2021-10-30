import React, { useState, useEffect, memo } from "react";

import './imgText.css';
import { requestWithParams } from "../../api/exchangeLayer";
import { LinkedButton } from "../../common/components/Buttons";
import styled from "styled-components";


const ImgText = memo(() => {
    const [data, setData] = useState({error: false, description: '', title: '', image: ''});
    
    useEffect(() => {
        requestWithParams('getMainPageData').then(data => setData({    
            title: data.options[0].block1_title,
            image: data.options[1].block1_image
        }));
    }, [])
    
    return (
        <Layout image={data.image}>
            <div className='text-block'>
                <p className='text-block-text'>
                    {data.title}
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
});

export default ImgText;

const Layout = styled.div`
    display: grid;
    grid-template-rows: 3fr 1fr;
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
