import React from 'react';

import './modal.scss';

const Modal = ({children, open, closeModal}) => (
    <div className={open ? 'modal-wrapper open' : 'modal-wrapper'}>

        <div className='modal'>
            <div className='modal-body'>
                <span className='close-icon' onClick={closeModal}>x</span>
                {children}
            </div>
        </div>
    </div>
);

export default Modal;
