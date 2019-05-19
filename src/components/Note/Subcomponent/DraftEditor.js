import React, { Component } from 'react'
import RichEditor from '@/components/RichEditor';

class DraftEditor extends Component {
  onChange = editorState => {
    const { flipDirtyBit, setEditorState } = this.props;
    setEditorState(editorState, () => flipDirtyBit(true));
  };

  render() {
    return (
      <div ref={editorNode => {
        this.editorNode = editorNode;
      }}>
        <RichEditor {...this.props} onChange={this.onChange} />
      </div>
    );
  }
}

export default DraftEditor;

