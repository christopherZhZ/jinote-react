import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';
import NoteBoard from '@/components/Note/NoteBoard';
import NoteList from '@/components/Note/NoteList';
// import 'react-splitter-layout/lib/index.css';
import './index.css';

class Note extends Component {

  render() {
    return (
      <SplitterLayout
        percentage
        vertical={false}
        primaryMinSize={35}
        secondaryInitialSize={65}
      >
        <div><NoteList {...this.props} /></div>
        <div><NoteBoard {...this.props} /></div>
      </SplitterLayout>
    );
  }
}

export default Note;
