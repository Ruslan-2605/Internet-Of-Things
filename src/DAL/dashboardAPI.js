import { instance } from '../utils/DAL-helpers/instance';

export const dashboardAPI = {

    getProjectsPage(username, token, page) {
        return instance
            .get(`pagination/project/${page}?username=${username}`,
                { 'headers': { 'Authorization': token } })
            .then((response) => {
                return response.data
            })
    },

    createProject(projectForm, token) {
        return instance
            .post("crud/project", projectForm, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    deleteProject(id, token) {
        return instance
            .delete(`crud/project/${id}`,
                { 'headers': { 'Authorization': token } })
            .then((response) => {
                return response
            })
    },

    updateProject(projectForm, token, id) {
        return instance
            .put(`crud/project/${id}`, projectForm, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    getProject(id, token) {
        return instance
            .get(`crud/project/${id}`, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

    getPagination(username, token) {
        return instance
            .get(`pagination/project?username=${username}`, { 'headers': { 'Authorization': token } })
            .then((response) => response.data);
    },

};
