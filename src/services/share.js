import request from '@/utils/request';
import { stringify } from 'qs';

const BASE_URL = '/server/api/share';

export async function queryMyShares() {
  return request(`${BASE_URL}/listmine`, {
    method: 'GET',
  });
}

export async function querySharesByNote(params) {
  return request(`${BASE_URL}/listbynote?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryShare(params) {
  return request(`${BASE_URL}/get?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryAddShare(params) {
  return request(`${BASE_URL}/add?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function queryRemoveShare(params) {
  return request(`${BASE_URL}/del?${stringify(params)}`, {
    method: 'GET',
  });
}
