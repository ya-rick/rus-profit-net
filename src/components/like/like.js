import React from 'react';
import './like.css';

const Like = ({clazz, click}) => {

    const svgStyle = clazz ? 'heart-fill' : 'heart';
    return (
        <div onClick={() => click()}>
            <svg width="44" height="40" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={svgStyle}
                      d="M7.69682 27.1149L7.69698 27.1151C11.2214 31.2244 15.8141 34.1957 19.9844 36.8937C20.6252 37.3083 21.2559 37.7164 21.8713 38.1211L7.69682 27.1149ZM7.69682 27.1149C3.41933 22.1293 1.45018 17.1214 1.50096 11.7524C1.55955 6.08893 6.17356 1.5 11.7493 1.5C16.2123 1.5 19.2154 4.05068 20.8542 5.99003L21.9999 7.34588L23.1456 5.99003C24.7844 4.05068 27.7875 1.5 32.2506 1.5C37.8267 1.5 42.4405 6.08941 42.4989 11.7497C42.5537 17.1211 40.5851 22.1255 36.3035 27.1113L36.3026 27.1124C32.7777 31.2248 28.1841 34.1967 24.0133 36.8951C23.3733 37.3092 22.7432 37.7168 22.1285 38.1211L7.69682 27.1149ZM21.9999 38.2056L21.8723 38.1218L21.9999 38.2056ZM21.9999 38.2056L22.1275 38.1218L21.9999 38.2056Z"
                      fill="#FFF5F2" stroke="#CC363B" strokeWidth="3"/>
            </svg>
        </div>
    );
};

export default Like;