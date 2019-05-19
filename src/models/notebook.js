import * as s from '@/services/notebook';

const mockNotebookList = [
    {
      "id": "5cd2fe3f80bd042fcf637129",
      "createdDate": "2019-05-08T16:05:19.184+0000",
      "lastModifiedDate": "2019-05-08T16:05:33.762+0000",
      "userid": "5cd2f92a80bd042e2af51704",
      "title": "notebook_1"
    },
    {
      "id": "5cd72b08163c0b7087f4c02e",
      "createdDate": "2019-05-11T20:05:28.812+0000",
      "lastModifiedDate": "2019-05-11T20:05:28.812+0000",
      "userid": "5cd2f92a80bd042e2af51704",
      "title": "notebook_2"
    }
];
const mockCurrNotebook = {
  "id": "5cd72b08163c0b7087f4c02e",
  "createdDate": "2019-05-11T20:05:28.812+0000",
  "lastModifiedDate": "2019-05-11T20:05:28.812+0000",
  "userid": "5cd2f92a80bd042e2af51704",
  "title": "notebook_2"
};

export default {
  namespace: 'notebook',

  state: {
    notebookList: [],
    currNotebook: undefined,
    // notebookList: mockNotebookList,
    // currNotebook: mockCurrNotebook,
  },

  effects: {
/*
    *setCurrNotebook(_, { put }) {
      yield put({
        type: 'putCurrNotebook',
        payload,
      });
    },
*/

    *getNotebook({ payload }, { call, put }) {
      const res = yield call(s.queryNotebook, payload);
      yield put({
        type: 'putCurrNotebook',
        res,
      });
    },

    *getNotebookList(_, { call, put }) {
      const res = yield call(s.queryNotebooks);
      yield put({
        type: 'putNotebookList',
        payload: res,
      });
    },

    *addNotebook({ payload }, { call, put }) {
      const res = yield call(s.queryAddNotebook, payload);
      yield put({
        type: 'appendNotebook',
        payload: res,
      });
      yield put({
        type: 'putCurrNotebook',
        payload: res,
      });
    },

    *renameNotebook({ payload }, { call, put }) {
      const res = yield call(s.queryRenameNotebook, payload);
      yield put({
        type: 'updateNotebook',
        payload: res,
      });
    },

    *removeNotebook({ payload }, { call, put }) {
      const res = yield call(s.queryRenameNotebook, payload);
      if (res.status === 'success') {
        yield put({
          type: 'filterNotebook',
          payload,
        });
      }
      return res;
    },
  },

  reducers: {
    putCurrNotebook(state, action) {
      return {
        ...state,
        currNotebook: action.payload,
      };
    },

    putNotebookList(state, action) {
      return {
        ...state,
        notebookList: action.payload,
      };
    },

    filterNotebook(state, action) {
      const removedId = action.payload.id;
      const removedList = state.notebookList.filter(
        item => item.id !== removedId
      );
      const newCurrNotebook = state.currNotebook.id === removedId ? undefined : state.currNotebook;
      return {
        ...state,
        currNotebook: newCurrNotebook,
        notebookList: removedList,
      };
    },

    appendNotebook(state, action) {
      return {
        ...state,
        notebookList: [].concat(action.payload).concat(state.notebookList),
      }
    },

    updateNotebook(state, action) {
      const updatedList = state.notebookList.map(item => {
        if (item.id === action.payload.id) {
          return { ...action.payload };
        }
        return item;
      });
      let newCurrNotebook = state.currNotebook;
      if (action.payload.id === newCurrNotebook.id) {
        newCurrNotebook = action.payload;
      }
      return {
        ...state,
        notebookList: updatedList,
        currNotebook: newCurrNotebook,
      };
    },
  },

}
