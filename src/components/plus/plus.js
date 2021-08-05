import React from 'react';
import './plus.css';

const Plus = () =>{
    return(
        <svg className='plus' width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.2143 2H8.78571C5.03807 2 2 5.03807 2 8.78571V35.2143C2 38.9619 5.03807 42 8.78571 42H35.2143C38.9619 42 42 38.9619 42 35.2143V8.78571C42 5.03807 38.9619 2 35.2143 2Z" stroke="#6F80A5" stroke-width="3" stroke-linejoin="round"/>
            <path d="M22.5 13V32M32 22.5H13" stroke="#6F80A5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default Plus;