import React from 'react';
import './like.css';

const Like = ({clazz, click}) => {

    const svgStyle = clazz ? 'heart-fill' : 'heart';
    return (
        <div onClick={() => click()}>

            <svg width="35" height="35" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={svgStyle}
                      d="M22,7.35,20.84,6a11.89,11.89,0,0,0-9.1-4.49A10.34,10.34,0,0,0,1.49,11.75C1.43,17.12,3.4,22.13,7.68,27.11,11.21,31.22,15.8,34.2,20,36.9c.64.41,1.41.89,2,1.29l2-1.29c4.17-2.7,8.77-5.68,12.29-9.79,4.29-5,6.25-10,6.2-15.36A10.34,10.34,0,0,0,32.25,1.5,11.87,11.87,0,0,0,23.15,6Z"
                      fill="#FFF5F2" stroke="#CC363B" strokeWidth="3"/>
            </svg>
        </div>
    );
};

export default Like;