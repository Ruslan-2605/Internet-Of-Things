import { instance } from '../utils/DAL-helpers/instance';

export const thingsAPI = {

    getThings(id, page, token) {
        return instance
            .get(`/pagination/thing/${id}/${page}`, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    createDevice(deviceForm, token) {
        return instance
            .post(`crud/device`, deviceForm, { 'headers': { 'Authorization': token } })
            .then((response) => response);
    },

    updateDevice(deviceForm, token, id) {
        return instance
            .put(`crud/device/${id}`, deviceForm, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    deleteDevice(id, token) {
        return instance
            .delete(`crud/device/${id}`,
                { 'headers': { 'Authorization': token } })
            .then((response) => {
                return response
            })
    },

    setDeviceState(state, token) {
        return instance
            .post(`deviceState/${token}?state=${state}`)
            .then((response) => response);
    },

    createSensor(sensorForm, token) {
        return instance
            .post(`crud/sensor`, sensorForm, { 'headers': { 'Authorization': token } })
            .then((response) => response);
    },

    updateSensor(sensorForm, token, id) {
        return instance
            .put(`crud/sensor/${id}`, sensorForm, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    deleteSensor(id, token) {
        return instance
            .delete(`crud/sensor/${id}`,
                { 'headers': { 'Authorization': token } })
            .then((response) => {
                return response
            })
    },

    getPiece(token, fromTime, toTime) {
        return instance
            .get(`sensor/value/${token}?from=${fromTime}&to=${toTime}`)
            .then((response) => response.data);
    },

    getPaginationInfo(project, token) {
        return instance
            .get(`/pagination/thing/${project}`, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

};