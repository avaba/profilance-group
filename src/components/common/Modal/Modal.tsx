import React from 'react';
import './Modal.scss'

interface IModal {
    active: boolean,
    setActive: (arg: boolean) => void,
    children: React.ReactNode
}

const Modal = ({active, setActive, children}: IModal) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;