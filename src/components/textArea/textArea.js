import React from "react";
import './textArea.css';

const TextArea = ({ children, onChange, value }) => {
    return (
        <div className='container'>
            <div className='outer'>
                <textarea
                    className='text-area inner'
                    onChange={e => onChange(e.target.value)}
                    value={value}>
                    {children}
                </textarea>
            </div>
        </div>
    );
};

export default TextArea;