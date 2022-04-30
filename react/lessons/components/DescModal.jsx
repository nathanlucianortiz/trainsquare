import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './css/lesson.css';

function DescModal(props) {
    const lessonDesc = props.description;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
            <button className="btn " onClick={handleShow} style={{ fontSize: '20px' }}>
                <i className="bi bi-chevron-double-right"></i>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>{lessonDesc}</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

DescModal.propTypes = {
    description: PropTypes.string.isRequired,
};

export default DescModal;
