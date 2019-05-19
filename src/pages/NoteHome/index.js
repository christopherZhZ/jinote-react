import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import NoteView from '@/components/Note';

@connect(({ note, notebook, share, loading }) => ({
  currNote: note.currNote,
  currNotebook: notebook.currNotebook,
  noteList: note.noteList,
  notebookList: notebook.notebookList,
  shareList: share.shareList,
  noteLoading: loading.models.note,
}))
class NoteHome extends Component {

  componentDidMount() {
    // this.fetchNotebookList();
    // todo
  }

  fetchNotebookList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'notebook/getNotebookList'
    });
  };

  handleSetCurrNote = (note) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'note/setCurrNote',
      payload: note,
    });
  };

  handleDeleteNote = (noteid, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'note/removeNote',
      payload: { noteid },
    }).then(callback);
  };

  handleUpdateNote = (contents, callback) => {
    const { dispatch, currNote } = this.props;
    dispatch({
      type: 'note/updateNote',
      payload: {
        ...currNote,
        contents,
      },
    }).then(callback);
  };

  // todo: more dispatch functions

  render() {

    const funcProps = {
      handleSetCurrNote: this.handleSetCurrNote,
      handleDeleteNote: this.handleDeleteNote,
      handleUpdateNote: this.handleUpdateNote,
      // ..
    };

    const allProps = {
      ...funcProps,
      ...this.props,
    };

    return (
      <div>
        <NoteView {...allProps} />
      </div>
    );
  }
}

export default NoteHome;
