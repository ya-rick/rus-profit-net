import React from "react";
import Exit from '../../images/modal-exit.svg';
import './modal.css';

const Modal = ({active, setActive, children})=>{
    return(
        <div className={active ?  'modal active' : 'modal'}>
            <div className={active ?  'modal-content active' : 'modal-content'} onClick={e => e.stopImmediatePropagation}>
                <div className='modal-exit'>
                    <button className='modal-button' onClick={()=>setActive(false)}>
                        <img className='modal-button-img' src={Exit} alt='exit'/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;