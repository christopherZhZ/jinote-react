import { routerRedux } from 'dva/router';
import {
  login,
  signup,
} from '@/services/user';
import { stringify } from 'qs';
import { setUser } from '@/utils/authentication';

export default {
  namespace: 'user',

  state: {
    currUser: null,
    // currUser: { name: 'temp_u' }// . // mock
  },

  effects: {
    *signup({ payload }, { call, put }) {
      const res = yield call(signup, payload);
      if (res.status === 500) return res;
      yield put(routerRedux.replace('/jinote/login'));
      return { status: 'success' };
    },

    *login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      if (res.status === 500) return res;
      yield put({
        type: 'setCurrUser',
        payload: res,
      });
      return { status: 'success' };
    },

    *logout(_, { put }) {
      yield put({
        type: 'setCurrUser',
        payload: null,
      });
      yield put(
        routerRedux.replace({
          pathname: '/jinote-user/login',
/*
          search: stringify({
            redirect: window.location.href,
          }),
*/
        })
      );
    },

  },

  reducers: {
    setCurrUser(state, { payload }) {
      console.log('setUser',payload);// .
      const u = payload;
      setUser(u);
      return {
        ...state,
        currUser: u,
      }
    },
  },

}
