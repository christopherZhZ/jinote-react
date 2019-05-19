import * as s from '@/services/share';

export default {
  namespace: 'share',

  state: {
    shareList: [],
  },

  effects: {
    *getMyShareList(_, { call, put }) {
      const res = yield call(s.queryMyShares);
      yield put({
        type: 'putShareList',
        payload: res,
      });
    },

    *getShareListByNote({ payload }, { call, put }) {
      const res = yield call(s.querySharesByNote, payload);
      yield put({
        type: 'putShareList',
        payload: res,
      })
    },

    *addShare({ payload }, { call, put }) {
      const res = yield call(s.queryAddShare, payload);
      yield put({
        type: 'appendShare',
        payload: res,
      });
      yield put({
        type: 'putCurrShare',
        payload: res,
      });
    },

    *removeShare({ payload }, { call, put }) {
      const res = yield call(s.queryRemoveShare, payload);
      if (res.status === 'success') {
        yield put({
          type: 'filterShare',
          payload,
        });
      }
      return res;
    },
  },

  reducers: {
    putCurrShare(state, action) {
      return {
        ...state,
        currShare: action.payload,
      };
    },

    putShareList(state, action) {
      return {
        ...state,
        shareList: action.payload,
      };
    },

    filterShare(state, action) {
      const removedId = action.payload.id;
      const removedList = state.shareList.filter(
        item => item.id !== removedId
      );
      const newCurrShare = state.currShare.id === removedId ? undefined : state.currShare;
      return {
        ...state,
        currShare: newCurrShare,
        ShareList: removedList,
      };
    },

    appendShare(state, action) {
      return {
        ...state,
        shareList: [].concat(action.payload).concat(state.shareList),
      }
    },
  },
}
