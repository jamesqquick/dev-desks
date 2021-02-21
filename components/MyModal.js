import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        border: 'none',
        background: 'none',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
    },
    overlay: {
        backgroundColor: 'rgba(255,255,255,0.95)',
    },
};

export default function MyModal(props) {
    Modal.setAppElement('#__next');

    return (
        <Modal style={customStyles} {...props}>
            {props.children}
        </Modal>
    );
}
