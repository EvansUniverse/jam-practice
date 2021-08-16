import http from "../http-common";
import { handleApiError, handleResponse } from "../helpers/http-handlers";
import { getHeaders } from '../helpers/auth-headers';

export const UserService = {
  update,
  get
};

function get() {
  return http.get(`/user`, { headers: getHeaders() })
    .catch(err => { return handleApiError(err); });
}

function update(data) {
  return http.put(`/user/update`, data, { headers: getHeaders() })
    .catch(err => { return handleApiError(err); });
}