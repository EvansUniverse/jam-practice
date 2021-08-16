import http from "../http-common";
import { handleApiError, handleResponse } from "../helpers/http-handlers";
import { getHeaders } from '../helpers/auth-headers';

export const AdminService = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
};

function getUsers(parameters) {
  return http.get("/admin/users", { headers: getHeaders(), params: parameters })
    .catch(err => { return handleApiError(err); });
}

function getUser(id) {
  return http.get(`/admin/users/${id}`, { headers: getHeaders() })
    .catch(err => { return handleApiError(err); });
}

function updateUser(id, data) {
  return http.put(`/admin/users/${id}/update`, data, { headers: getHeaders() })
    .catch(err => { return handleApiError(err); });
}

function deleteUser(id) {
  return http.post(`/admin/users/${id}/delete`, null, { headers: getHeaders() })
    .catch(err => { return handleApiError(err); });
}