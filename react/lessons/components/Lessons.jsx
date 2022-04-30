import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import * as service from '../../services/lessonService';
import * as names from './durationEnum';
import Lesson from './Lesson';
import toastr from '../../utils/toastr.js';
import './css/lessons.css';
import debug from 'sabio-debug';

const _logger = debug.extend('Lessons');

function Lessons() {
    const [pageData, setPageData] = useState({
        lessons: [],
        lessonsComponents: [],
        isShown: false,
        isCurrent: false,
        current: 1,
        index: 0,
        size: 6,
        items: [],
        searchInput: '',
    });
    const [header, setHeader] = useState({
        header: '',
    });

    useEffect(() => {
        if (!pageData.isCurrent) {
            setHeader((prevState) => {
                return { ...prevState, header: 'All Lessons' };
            });
            if (pageData.searchInput) {
                getBySearch(pageData.searchInput);
            } else {
                get(pageData);
            }
        } else {
            setHeader((prevState) => {
                return { ...prevState, header: 'My Lessons' };
            });
            getByCreatedBy(pageData);
        }
    }, [pageData.isCurrent, pageData.current, pageData.searchInput]);

    const get = (currentPage) => {
        service.get(currentPage.index, currentPage.size).then(onGetSuccess).catch(onGetError);
    };

    const getByCreatedBy = (currentPage) => {
        service.getByCreatedBy(currentPage.index, currentPage.size).then(onGetSuccess).catch(onGetError);
    };

    const getBySearch = (searchString) => {
        service.getBySearch(pageData.index, pageData.size, searchString).then(onGetSuccess).catch(onGetError);
    };

    const onGetSuccess = (response) => {
        let pd = response.item;
        let lessons = pd.pagedItems;

        setPageData((prevState) => {
            let newCurrent = [];
            for (let number = 1; number <= pd.totalPages; number++) {
                newCurrent.push(
                    <Pagination.Item active={number === pageData.current} onClick={onPageClick} key={number}>
                        {number}
                    </Pagination.Item>
                );
            }
            return { ...prevState, lessons: lessons, lessonsComponents: lessons.map(mapLesson), items: newCurrent };
        });
    };

    const onInputChange = (e) => {
        const target = e.target;
        const searchInput = target.value;
        setPageData((prevState) => ({ ...prevState, searchInput }));
    };

    const mapLesson = (lesson) => {
        _logger('lesson to be mapped', lesson);
        return (
            <Lesson
                lesson={lesson}
                key={lesson.id}
                isCurrent={pageData.isCurrent}
                onDeleteClicked={onRemoveRequested}
                onUpdateSubmit={onUpdateRequested}
            />
        );
    };

    const onPageClick = (e) => {
        let newCurrent = parseInt(e.target.text);
        setPageData((prevState) => {
            return { ...prevState, index: newCurrent - 1, current: newCurrent };
        });
    };
    const onPrevClick = () => {
        setPageData((prevState) => {
            let pd = { ...prevState };
            pd.current = prevState.current - 1;
            pd.index = prevState.index - 1;
            return pd;
        });
    };
    const onNextClick = () => {
        setPageData((prevState) => {
            let pd = { ...prevState };
            pd.current = prevState.current + 1;
            pd.index = prevState.index + 1;
            return pd;
        });
    };

    const onRemoveRequested = useCallback((currentLesson, eObj) => {
        _logger(currentLesson.id, eObj);
        const handler = getSuccessHandler(currentLesson);
        service.remove(currentLesson.id).then(handler).catch(onRemoveError);
    }, []);

    const getSuccessHandler = (currentLesson) => {
        return () => {
            setPageData((prevState) => {
                const pd = { ...prevState, isCurrent: true };
                const lessons = pd.lessons;
                const idxOf = lessons.findIndex((lesson) => lesson.id === currentLesson.id);

                if (idxOf >= 0) {
                    lessons.splice(idxOf, 1);
                    pd.lessonsComponents = lessons.map(mapLesson);
                }
                return pd;
            });
            toastr.success(`${currentLesson.title} has been deleted.`);
        };
    };

    const onUpdateRequested = (values, lessonId) => {
        service.update(values, lessonId).then(onUpdateSuccess).catch(onUpdateError);
    };
    const onUpdateSuccess = (response) => {
        toastr.success('Update successful.');
        setPageData((prevState) => {
            const pd = { ...prevState };
            const lessons = pd.lessons;
            const idxOf = lessons.findIndex((lesson) => lesson.id === response.id);
            lessons[idxOf] = response;
            let nameValue = lessons[idxOf].durationTypeId;
            lessons[idxOf].type.name = names.durationNames[nameValue];
            pd.lessonsComponents = lessons.map(mapLesson);
            return pd;
        });
    };

    const getCurrent = (option) => {
        setPageData((prevState) => ({ ...prevState, isCurrent: option, index: 0, current: 1 }));
    };

    const onGetError = (err) => {
        toastr.error(err);
    };

    const onUpdateError = (err) => {
        toastr.error(err);
    };

    const onRemoveError = (err) => {
        toastr.error(err);
    };

    return (
        <React.Fragment>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
            <div className="container-fluid lessons-container">
                <h4 className="lessons-header">{header.header}</h4>

                {!pageData.isCurrent && (
                    <div className="search-container">
                        <div className="input-group">
                            <div className="form-outline search-outline">
                                <input
                                    placeholder="Search..."
                                    type="search"
                                    id="form1"
                                    className="form-control search-bar"
                                    onChange={onInputChange}
                                    value={pageData.searchInput}
                                />
                            </div>
                            <i className="bi bi-search"></i>
                        </div>
                    </div>
                )}

                {!pageData.isCurrent ? (
                    <button className="btn lessons-btn" onClick={() => getCurrent(true)}>
                        <i className="bi bi-journal-bookmark-fill"></i>
                        To My Lessons
                    </button>
                ) : (
                    <>
                        <button className="btn lessons-btn" onClick={() => getCurrent(false)}>
                            <i className="bi bi-house-fill"></i>
                            To All Lessons
                        </button>
                        <Link className="new-lesson" to="/lessons/new">
                            <i className="bi bi-plus"></i>
                            New
                        </Link>
                    </>
                )}

                <div className="row page-data">
                    {pageData.lessonsComponents}

                    <Pagination>
                        <Pagination.Prev onClick={onPrevClick} />
                        {pageData.items}
                        <Pagination.Next onClick={onNextClick} />
                    </Pagination>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Lessons;
