import http from "../http-common";
import { handleApiError, handleResponse } from "../helpers/http-handlers";
import { getHeaders } from '../helpers/auth-headers';

export const CardService = {
  getCards,
  getCard,
  updateCard,
  deleteCard
};

function getCards(parameters) {
  return http.get("/cards", { headers: getHeaders(), params: parameters })
    .catch(err => { return handleApiError(err); });
}

function getCard(id) {
  return http.get(`/cards/${id}`, { headers: getHeaders() })
    .catch(err => { return handleApiError(err); });
}

function createCard(data) {
  return http.post(`/cards`, data, { headers: getHeaders() })
    .catch(err => { return handleApiError(err); });
}

function updateCard(id, data) {
  return http.put(`/cards/${id}`, data, { headers: getHeaders() })
    .catch(err => { return handleApiError(err); });
}

function deleteCard(id) {
  return http.delete(`/cards/${id}`, null, { headers: getHeaders() })
    .catch(err => { return handleApiError(err); });
}