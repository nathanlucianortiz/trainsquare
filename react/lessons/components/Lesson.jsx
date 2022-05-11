import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Card, Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import DescModal from './DescModal';
import LessonForm from './LessonForm';
import PropTypes from 'prop-types';
import './css/lesson.css';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Lesson(props) {
    const aLesson = props.lesson;
    let durationName = parseInt(aLesson.type.name) / 60;

    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const toggleShowToast = () => setShowToast(!showToast);

    const onHide = () => {
        setShowModal(false);
    };

    const onLocalDeleteClicked = () => {
        props.onDeleteClicked(props.lesson);
    };

    return (
        <React.Fragment>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
            <Card className="d-block lesson-card">
                {aLesson.sortOrder === 1 && (
                    <Badge pill bg="primary" className="lesson-badge">
                        Beginner
                    </Badge>
                )}
                {aLesson.sortOrder === 2 && (
                    <Badge pill bg="warning" className="lesson-badge">
                        Intermediate
                    </Badge>
                )}
                {aLesson.sortOrder === 3 && (
                    <Badge pill bg="danger" className="lesson-badge">
                        Advanced
                    </Badge>
                )}

                {aLesson.imageUrl ? (
                    <img className="card-img-top lesson-img" src={aLesson.imageUrl} alt="" />
                ) : (
                    <img
                        className="card-img-top lesson-img"
                        src="https://st4.depositphotos.com/17828278/24401/v/380/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg?forcejpeg=true"
                        alt="placeholder"
                    />
                )}

                <Card.Body className={aLesson.imageUrl ? 'position-relative' : ''}>
                    {!props.currentUser.roles.includes('User') && (
                        <Dropdown className="card-widgets" align="end">
                            <Dropdown.Toggle
                                variant="link"
                                tag="a"
                                className="card-drop arrow-none cursor-pointer p-0 shadow-none">
                                <i className="bi bi-chevron-compact-down"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu-animated">
                                <Dropdown.Item
                                    onClick={() => {
                                        setShowModal(true);
                                    }}>
                                    <i className="bi bi-pencil-fill"></i>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item onClick={toggleShowToast}>
                                    <i className="bi bi-trash3-fill"></i>Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}

                    {!props.currentUser.roles.includes('User') && (
                        <Modal
                            size="lg"
                            show={showModal}
                            onHide={onHide}
                            aria-labelledby="example-modal-sizes-title-lg">
                            <Modal.Header closeButton>
                                <Modal.Title id="modal-title-lg" className="edit-title">
                                    Edit Lesson
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <LessonForm
                                    onHide={onHide}
                                    onUpdateSubmit={props.onUpdateSubmit}
                                    formData={props.lesson}
                                    lessonId={props.lesson.id}
                                />
                            </Modal.Body>
                        </Modal>
                    )}

                    {aLesson.title.length > 20 ? (
                        <h4 className="mt-0">{`${aLesson.title.substring(0, 15)}...`}</h4>
                    ) : (
                        <h4 className="mt-0">{aLesson.title}</h4>
                    )}

                    <p className="text-muted font-13  ">
                        {`${aLesson.description.substring(0, 42)}...`} <DescModal description={aLesson.description} />
                    </p>

                    <p className="mb-1">
                        <span className="pe-2 text-nowrap mb-2 d-inline-block">
                            <i className="bi bi-hourglass-split"></i>
                            {durationName > 1 ? <b>{durationName} hours</b> : <b>{durationName} hour</b>}
                        </span>
                    </p>
                </Card.Body>
                <ToastContainer position="middle-end">
                    <Toast show={showToast} className="toast-display">
                        <Toast.Body>
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            <h6 className="toast-h">
                                Are you sure you want to delete this lesson? <br /> You will not be able to recover it
                                later.
                            </h6>
                            <button className="btn btn-yes" onClick={onLocalDeleteClicked}>
                                <p className="btn-p">Trash it.</p>
                            </button>
                            <button className="btn btn-no" onClick={toggleShowToast}>
                                <p className="btn-p">No, keep it.</p>
                            </button>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </Card>
        </React.Fragment>
    );
}
Lesson.propTypes = {
    lesson: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
        imageUrl: PropTypes.string,
        fileUrl: PropTypes.string.isRequired,
        sortOrder: PropTypes.number.isRequired,
        createdBy: PropTypes.number,
        modifiedBy: PropTypes.number,
    }),
    currentUser: PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        roles: PropTypes.arrayOf(PropTypes.string).isRequired,
        profilePic: PropTypes.string,
    }),
    onDeleteClicked: PropTypes.func.isRequired,
    onUpdateSubmit: PropTypes.func.isRequired,
};
export default React.memo(Lesson);
