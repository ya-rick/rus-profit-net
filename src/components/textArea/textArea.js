import React from "react";
import './textArea.css';

const TextArea = ({children}) => {
    return (
        <div className='container'>
            <div className='outer'>
                <textarea className='text-area inner'>
                    {children}
                </textarea>
            </div>
        </div>
    );
};

export default TextArea;