import axios from 'axios';
import * as helper from './serviceHelpers';
import _logger from '../components/lessons/NewLesson';

let lessonService = {
    endpoint: `${helper.API_HOST_PREFIX}/api/lessons`,
};

const create = (payload) => {
    _logger(payload);
    const config = {
        method: 'POST',
        url: lessonService.endpoint,
        withCredentials: true,
        data: payload,
        crossdomain: true,
        headers: { 'Content-type': 'application/json' },
    };
    return axios(config)
        .then(() => {
            return {
                ...payload,
            };
        })
        .catch(helper.onGlobalError);
};

const update = (payload, id) => {
    _logger('update ajax', payload, id);
    const config = {
        method: 'PUT',
        url: `${lessonService.endpoint}/${id}`,
        withCredentials: true,
        data: payload,
        crossdomain: true,
        headers: { 'Content-type': 'application/json' },
    };
    return axios(config)
        .then(() => {
            return {
                ...payload,
                id,
            };
        })
        .catch(helper.onGlobalError);
};

const get = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${lessonService.endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getById = (id) => {
    const config = {
        method: 'GET',
        url: `${lessonService.endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then((response) => {
        return response.data.item;
    });
};

const getByCreatedBy = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${lessonService.endpoint}/creator/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getBySearch = (pageIndex, pageSize, searchString) => {
    const config = {
        method: 'GET',
        url: `${lessonService.endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${searchString}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const remove = (id) => {
    const config = {
        method: 'DELETE',
        url: `${lessonService.endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

export { create, get, getById, getByCreatedBy, getBySearch, update, remove };
