import request from '@/utils/request';
import { stringify } from 'qs';

const BASE_URL = '/server/api/user';

export async function signup(params) {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    body: params,
  });
}

export async function login(params) {
  return request(`${BASE_URL}/login?${stringify(params)}`, {
    method: 'GET',
  });
}
