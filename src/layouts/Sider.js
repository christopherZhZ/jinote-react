import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, Alert, message } from 'antd';
import { Notes, Note, Share } from '@material-ui/icons';
import { primaryColor } from '@/defaultUISettings';
import { newEmptyNoteContent } from '@/utils/utils';
import { getUserIdOrEmpty } from '@/utils/authentication';
import styles from './Sider.less';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

@connect(({ notebook }) => ({
  notebookList: notebook.notebookList,
  currNotebook: notebook.currNotebook,
}))
class SiderView extends PureComponent {

  onMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'all-notes') {
      dispatch({
        type: 'note/getNoteListByUser',
      });
    } else if (key.startsWith('nb-')) {
      const notebookid = key.split('nb-')[1];
      dispatch({
        type: 'notebook/getNotebook',
        payload: { notebookid },
      }).then(() => {
        dispatch({
          type: 'note/getNoteListByNotebook',
          payload: { notebookid },
        });
      });
    } else if (key === 'shared') {
      dispatch({
        type: 'share/getMyShareList',
      });
    }
  };

  onNewNoteClick = () => {
    const { dispatch, currNotebook } = this.props;
    if (currNotebook === undefined) {
      message.info('Please select a notebook first!');
      return;
    }

    const newEmptyNote = {
      notebookid: currNotebook.id,
      userid: getUserIdOrEmpty(),
      title: 'untitled',
      content: newEmptyNoteContent(),
    };
    dispatch({
      type: 'note/addNote',
      payload: newEmptyNote,
    });
  };

  onNotebooksExpand = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'notebook/getNotebookList',
    });
  };

  render() {
    const { notebookList } = this.props;

    const AddNoteView = (
      <div onClick={this.onNewNoteClick}>
        <Alert
          className={styles.newNote}
          type="success"
          message={(
            <div>
              <Icon type="plus-circle" theme="filled" className={styles.menuIcon} />
              <span>New Note</span>
            </div>
          )}
        />

      </div>
    );

    const notebookItems = notebookList.map(nb => (
      <Item key={`nb-${nb.id}`}><span>{nb.title}</span></Item>
    ));

    return (
      <Sider style={{ background: primaryColor }}>
        {AddNoteView}
        <Menu
          style={{ backgroundColor: primaryColor }}
          defaultSelectedKeys={["all-notes"]}
          defaultOpenKeys={[]}
          mode="inline"
          onClick={this.onMenuClick}
        >
          <Item key="all-notes">
            <span>
              <Notes />
              <span className={styles.menuTitle}>All My Notes</span>
            </span>
          </Item>
          <SubMenu
            key="notebooks"
            onTitleClick={this.onNotebooksExpand}
            title={(
              <span>
                <Note />
                <span className={styles.menuTitle}>Notebooks</span>
              </span>
            )}
          >
            {notebookItems}
          </SubMenu>
          <Item key="shared">
            <span>
              <Share />
              <span className={styles.menuTitle}>Shared To Me</span>
            </span>
          </Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderView;
