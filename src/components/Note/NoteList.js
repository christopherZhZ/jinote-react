import React, { PureComponent } from 'react';
import { Spin, Popover, List, Input, Row, Col, Icon, Divider, Avatar } from 'antd';
import { getNoteAbbreviationText, formatDate } from '@/utils/utils';
import classNames from 'classnames';
import styles from './NoteList.less';

class NoteList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      optionsVisibleId: undefined,
      renamingId: undefined,
      renamingText: '',
    };
  }

  onOptionsVisibleChange = (visible, noteid) => {
    if (visible) {
      this.setState({ optionsVisibleId: noteid });
    } else {
      this.setState({ optionsVisibleId: undefined });
    }
  };

  // TODO: renaming click outside

  onRenamingStart = noteid => {
    this.setState({ renamingId: noteid });
  };

  onRenamingChange = renamingText => {
    this.setState({ renamingText });
  };

  render() {
    const {
      currNote,
      noteList,
      noteLoading,
      handleSetCurrNote,
      handleDeleteNote,
    } = this.props;
    const { optionsVisibleId } = this.state;

    const ListView = (
      <List
        size="large"
        dataSource={noteList}
        renderItem={item => (
          <List.Item
            key={item.id}
            className={classNames(styles.listItem, {
              [styles.active]: currNote && item.id === currNote.id,
            })}
            onClick={() => handleSetCurrNote(item)}
            actions={[(
              <Popover
                placement="bottomLeft"
                content={(
                  <div>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.onRenamingStart(item.id);
                      }}
                    >
                      Edit title
                    </a>
                    <Divider type="vertical"/>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteNote(item.id);
                      }}
                    >
                      Delete
                    </a>
                  </div>
                )}
                trigger="click"
                visible={optionsVisibleId === item.id}
                onVisibleChange={visible => this.onOptionsVisibleChange(visible, item.id)}
              >
                <a
                  style={{
                    position: 'absolute',
                    right: '16px',
                    bottom: '3px',
                  }}
                >
                  <Icon type="ellipsis"/>
                </a>
              </Popover>
            )]}
          >
            <List.Item.Meta
              avatar={<Avatar icon="form"/>}
              title={<span>{item.title}</span>}
              description={formatDate(item.lastModifiedDate)}
            />
            <p className={styles.textAbbreviation}>
              {getNoteAbbreviationText(item.contents)}
            </p>
          </List.Item>
        )}
      />
    );

    return (
      <div>
        {noteLoading
          ? <Spin tip="Loading.." />
          : ListView
        }
      </div>
    );
  }
}

export default NoteList;
