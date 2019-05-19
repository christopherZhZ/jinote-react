import request from '@/utils/request';
import { stringify } from 'qs';

const BASE_URL = '/server/api/notebook';

export async function queryNotebooks() {
  return request(`${BASE_URL}/list`, {
    method: 'GET',
  });
}

export async function queryNotebook(params) {
  return request(`${BASE_URL}/get?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryAddNotebook(params) {
  return request(`${BASE_URL}/add`, {
    method: 'POST',
    body: params,
  });
}

export async function queryRenameNotebook(params) {
  return request(`${BASE_URL}/rename?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function queryRemoveNotebook(params) {
  return request(`${BASE_URL}/del?${stringify(params)}`, {
    method: 'GET',
  });
}
