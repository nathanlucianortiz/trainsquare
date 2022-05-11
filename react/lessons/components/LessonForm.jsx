import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Dropzone from '../files/Dropzone';
import lookup from '../../services/lookupService';
import lessonSchema from '../../schema/lessonSchema';
import * as service from '../../services/lessonService';
import PropTypes from 'prop-types';
import toastr from '../../utils/toastr.js';
import './css/new-lesson.css';

function LessonForm(props) {
    const modalFormData = props.formData;
    const [mappedDurations, setDurations] = useState([]);

    const [newFormState, setNewFormState] = useState({
        formData: {
            id: 0,
            title: '',
            description: '',
            durationTypeId: 0,
            imageUrl: '',
            fileUrl: '',
            sortOrder: '',
        },
        isUpdateForm: false,
    });

    const setImgFormData = (fileData) => {
        let imageFile = fileData[0].url;

        setNewFormState((prevState) => {
            const fs = { ...prevState };
            fs.formData.imageUrl = imageFile;
            return fs;
        });
    };

    const getUploadImgReturn = (fileData) => {
        setImgFormData(fileData);
    };

    const getUploadFileReturn = (fileData) => {
        setFileFormData(fileData);
    };

    const setFileFormData = (fileData) => {
        let newFile = fileData[0].url;

        setNewFormState((prevState) => {
            const fs = { ...prevState };
            fs.formData.fileUrl = newFile;
            return fs;
        });
    };

    const onLookupSuccess = (response) => {
        let mappedDurations = response.item.lessonDuration?.map(mapADuration);
        setDurations(mappedDurations);
    };

    const mapADuration = (item, index) => (
        <option value={item.id} key={`${item}_${index}`}>
            {parseInt(item.name) / 60}
            {' hours '}
        </option>
    );
    const onLookupError = (err) => {
        toastr.error(err);
    };

    useEffect(() => {
        lookup(['LessonDuration']).then(onLookupSuccess).catch(onLookupError);
        if (modalFormData) {
            setNewFormState((prevState) => {
                return {
                    ...prevState,
                    formData: {
                        id: modalFormData.id,
                        title: modalFormData.title,
                        description: modalFormData.description,
                        durationTypeId: modalFormData.type.id,
                        imageUrl: modalFormData.imageUrl,
                        fileUrl: modalFormData.fileUrl,
                        sortOrder: modalFormData.sortOrder,
                        durationName: modalFormData.type.name,
                    },
                    isUpdateForm: true,
                };
            });
        }
    }, []);

    const handleSubmit = (values, { resetForm }) => {
        parseInt(values.sortOrder);
        values.type = {
            id: values.durationTypeId,
            name: values.durationName,
        };

        if (newFormState.isUpdateForm === false) {
            resetForm();
            service.create(values).then(onCreateSuccess).catch(onCreateError);
        } else {
            props.onHide();
            props.onUpdateSubmit(values, props.lessonId);
        }
    };

    const onCreateSuccess = (response) => {
        toastr.success(`${response.title} added!`);
        setNewFormState((prevState) => {
            const fs = { ...prevState };
            fs.formData.imageUrl = '';
            fs.formData.fileUrl = '';
            return fs;
        });
    };
    const onCreateError = (err) => {
        toastr.error(err);
    };

    return (
        <React.Fragment>
            <div className="file-upload-container">
                <div className="dropzone-form">
                    <div className="drop img-drop">
                        <label className="upload-label">Upload Lesson Image</label>
                        <Dropzone uploadedFiles={getUploadImgReturn} />
                    </div>
                    <div className="drop file-drop">
                        <label className="upload-label">Upload Misc File</label>
                        <Dropzone uploadedFiles={getUploadFileReturn} />
                    </div>
                </div>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={newFormState.formData}
                onSubmit={handleSubmit}
                validationSchema={lessonSchema}>
                <Form>
                    <div className="form-group form-new">
                        <label htmlFor="title">Title</label>
                        <Field type="text" name="title" className="form-control" />
                        <ErrorMessage name="title" component="div" className="err-message" />
                    </div>
                    <div className="form-group form-new">
                        <label htmlFor="sortOrder">Sort Order</label>
                        <Field type="text" name="sortOrder" className="form-control"></Field>
                        <ErrorMessage name="sortOrder" component="div" className="err-message" />
                    </div>
                    <div className="form-group form-new">
                        <label htmlFor="description">Description</label>
                        <Field component="textarea" name="description" className="form-control" />
                        <ErrorMessage name="description" component="div" className="err-message" />
                    </div>
                    <div className="form-group form-new">
                        <label htmlFor="durationTypeId">Time Duration</label>
                        <Field as="select" name="durationTypeId" className="form-control">
                            <option>Select a duration</option>
                            {mappedDurations}
                        </Field>
                        <ErrorMessage name="durationTypeId" component="div" className="err-message" />
                    </div>

                    <button type="submit" className="btn btn-primary form-submit">
                        Submit
                    </button>
                </Form>
            </Formik>
        </React.Fragment>
    );
}
LessonForm.propTypes = {
    formData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
        imageUrl: PropTypes.string,
        fileUrl: PropTypes.string.isRequired,
        sortOrder: PropTypes.number.isRequired,
    }),
    lessonId: PropTypes.number,
    onUpdateSubmit: PropTypes.func,
    onHide: PropTypes.func,
};

export default LessonForm;
