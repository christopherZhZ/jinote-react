import request from '@/utils/request';
import { stringify } from 'qs';

const BASE_URL = '/server/api/note';

export async function queryNotesByNotebook(params) {
  return request(`${BASE_URL}/list?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryNotesByUser() {
  return request(`${BASE_URL}/listall`, {
    method: 'GET',
  });
}

export async function queryNote(params) {
  return request(`${BASE_URL}/get?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryAddNote(params) {
  return request(`${BASE_URL}/add`, {
    method: 'POST',
    body: params,
  });
}

export async function queryUpdateNote(params) {
  return request(`${BASE_URL}/set`, {
    method: 'POST',
    body: params,
  });
}

export async function queryRemoveNote(params) {
  return request(`${BASE_URL}/del?${stringify(params)}`, {
    method: 'GET',
  });
}
