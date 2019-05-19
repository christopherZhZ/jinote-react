import React, { PureComponent } from 'react';
import { Layout, Breadcrumb, Button, Row, Col, Divider } from 'antd';
import DraftEditor from '@/components/Note/Subcomponent/DraftEditor';
import { editorStateToRawJson, getEditorStateWithRawJson } from '@/components/Note/Subcomponent/draftEditorUtils';
import styles from './NoteBoard.less';
import { EditorState } from 'draft-js';

const { Content } = Layout;
const { Item } = Breadcrumb;

class NoteBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dirtyBit: false,
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    const { currNote } = this.props;
    if (currNote) this.setEditorState(getEditorStateWithRawJson(currNote.contents));
  }

  componentDidUpdate(prevProps) {
    const { currNote } = this.props;
    if (currNote && prevProps.currNote && prevProps.currNote.id !== currNote.id) {
      this.setEditorState(getEditorStateWithRawJson(currNote.contents));
    }
  }

  onSave = () => {
    const { handleUpdateNote } = this.props;
    const { editorState } = this.state;
    const contentsJson = editorStateToRawJson(editorState);
    console.log(JSON.stringify(contentsJson),null,2);// .
    handleUpdateNote(contentsJson, () => this.flipDirtyBit(false));
  };

  setEditorState = (editorState, callback) => {
    this.setState({ editorState }, callback);
  };

  flipDirtyBit = dirtyBit => {
    this.setState({ dirtyBit });
  };

  render() {
    const { currNote, currNotebook } = this.props;
    const { dirtyBit, editorState } = this.state;

    return (
      <Layout>
        <Row style={{ margin: '16px 0' }}>
          <Col span={16}>
            <Breadcrumb style={{ paddingLeft: '16px' }}>
              <Item>{currNotebook ? currNotebook.title : 'All notes'}</Item>
              <Item>{currNote && currNote.title}</Item>
            </Breadcrumb>
          </Col>
          <Col className={styles.btnGroup}>
            <Button
              size="small"
              className={styles.saveButton}
              disabled={dirtyBit === false}
              onClick={this.onSave}
            >
              Save
            </Button>
            <Divider type="vertical" />
            <Button
              size="small"
              className={styles.shareButton}
              // onClick={this.onSave}
            >
              Share
            </Button>
          </Col>
        </Row>
        <Content className={styles.editorPanel}>
          <DraftEditor
            {...this.props}
            flipDirtyBit={this.flipDirtyBit}
            editorState={editorState}
            setEditorState={this.setEditorState}
          />
        </Content>
      </Layout>
    );
  }
}

export default NoteBoard;
