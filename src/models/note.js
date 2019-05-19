import * as s from '@/services/note';

const mockNoteList = [
    {
      "id": "5cd72b27163c0b7087f4c02f",
      "createdDate": "2019-05-11T20:05:59.919+0000",
      "lastModifiedDate": "2019-05-11T20:05:59.919+0000",
      "notebookid": "5cd72b08163c0b7087f4c02e",
      "userid": "5cd2f92a80bd042e2af51704",
      "title": "note_1",
      "contents": {
        "entityMap": {},
        "blocks": [
          {
            "key": "fr3rp",
            "text": "Testing1",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
          }
        ]
      }
    },
    {
      "id": "5cd72b27163c0b7087f4c02g",
      "createdDate": "2019-05-11T20:05:59.919+0000",
      "lastModifiedDate": "2019-05-11T20:05:59.919+0000",
      "notebookid": "5cd72b08163c0b7087f4c02e",
      "userid": "5cd2f92a80bd042e2af51704",
      "title": "note_2",
      "contents": {
        "entityMap": {},
        "blocks": [
          {
            "key": "fr3rp",
            "text": "Testing2",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
          }
          ]
      }
    },
    {
      "id": "5cd72b27163c0b7087f4c02h",
      "createdDate": "2019-05-11T20:05:59.919+0000",
      "lastModifiedDate": "2019-05-11T20:05:59.919+0000",
      "notebookid": "5cd72b08163c0b7087f4c02e",
      "userid": "5cd2f92a80bd042e2af51704",
      "title": "note_3",
      "contents": {
        "entityMap": {},
        "blocks": [
          {
            "key": "fr3rp",
            "text": "Write two parts of the layout as direct children of your element. NMSL x CLOT by mata`chuan. Hahaha",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
          }
          ]
      }
    }
];
const mockCurrNote = {
  "id": "5cd72b27163c0b7087f4c02g",
  "createdDate": "2019-05-11T20:05:59.919+0000",
  "lastModifiedDate": "2019-05-11T20:05:59.919+0000",
  "notebookid": "5cd72b08163c0b7087f4c02e",
  "userid": "5cd2f92a80bd042e2af51704",
  "title": "note_2",
  "contents": {
    "entityMap": {},
    "blocks": [
      {
        "key": "fr3rp",
        "text": "Testing2",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }
    ]
  }
};

export default {
  namespace: 'note',

  state: {
    noteList: [],
    currNote: undefined,
    // noteList: mockNoteList,
    // currNote: mockCurrNote,
  },

  effects: {
    *setCurrNote({ payload }, { put }) {
      yield put({
        type: 'putCurrNote',
        payload,
      });
    },

    *getNoteListByNotebook({ payload }, { call, put }) {
      const res = yield call(s.queryNotesByNotebook, payload);
      yield put({
        type: 'putNoteList',
        payload: res,
      });
    },

    *getNoteListByUser(_, { call, put }) {
      const res = yield call(s.queryNotesByUser);
      yield put({
        type: 'putNoteList',
        payload: res,
      })
    },

    *addNote({ payload }, { call, put }) {
      const res = yield call(s.queryAddNote, payload);
      yield put({
        type: 'appendNote',
        payload: res,
      });
      yield put({
        type: 'putCurrNote',
        payload: res,
      });
    },

    *updateNote({ payload }, { call, put }) {
      const res = yield call(s.queryUpdateNote, payload);
      yield put({
        type: 'updateNote',
        payload: res,
      });
    },

    *removeNote({ payload }, { call, put }) {
      const res = yield call(s.queryRemoveNote, payload);
      if (res.status === 'success') {
        yield put({
          type: 'filterNote',
          payload,
        });
      }
      return res;
    },
  },

  reducers: {
    putCurrNote(state, action) {
      return {
        ...state,
        currNote: action.payload,
      };
    },

    putNoteList(state, action) {
      return {
        ...state,
        noteList: action.payload,
      };
    },

    filterNote(state, action) {
      const removedId = action.payload.id;
      const removedList = state.noteList.filter(
        item => item.id !== removedId
      );
      const newCurrNote = state.currNote.id === removedId ? undefined : state.currNote;
      return {
        ...state,
        currNote: newCurrNote,
        NoteList: removedList,
      };
    },

    appendNote(state, action) {
      return {
        ...state,
        noteList: [].concat(action.payload).concat(state.noteList),
      }
    },

    updateNote(state, action) {
      const updatedList = state.noteList.map(item => {
        if (item.id === action.payload.id) {
          return { ...action.payload };
        }
        return item;
      });
      let newCurrNote = state.currNote;
      if (action.payload.id === newCurrNote.id) {
        newCurrNote = action.payload;
      }
      return {
        ...state,
        noteList: updatedList,
        currNote: newCurrNote,
      };
    },
  },
}
