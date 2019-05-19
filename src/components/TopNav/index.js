import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { Menu, Icon, Dropdown, Avatar, Input } from 'antd';
import { getUser } from '@/utils/authentication';
import userDefaultAvatar from '../../assets/user-default-avatar.svg';
import { primaryColor } from '@/defaultUISettings';
import styles from './index.less';

const { Item, Divider } = Menu;

class TopNav extends PureComponent {

  handleSearch = ({ key }) => {
    if (key === 'Enter') {
      // ...
    }
  };

  render() {
    const { contentWidth, logo, onMenuCLick } = this.props;

    const currUser = getUser();

    const LogoView = (
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
    );

    const RightHeaderMenu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuCLick}>
        <Item key="accountInfo" disabled>
          <Icon type="user" />
          Account
        </Item>
        <Divider />
        <Item key="logout">
          <Icon type="logout" />
          Sign out {currUser && currUser.name}
        </Item>
      </Menu>
    );

    const RightHeaderSearch = (
      <span className={`${styles.action} ${styles.search} ${styles.headerSearch}`}>
        <Icon type="search" />
        <Input
          ref={node => {
            this.input = node;
          }}
          placeholder="Search all notes..."
          // onKeyDown={this.handleSearch}
        />
      </span>
    );

    return (
      <div className={styles.head}>
        <div
          className={`${styles.main} ${styles.wide}`}
          style={{ display: 'flex', flex: 1 }}
        >
          <div className={styles.left}>
            {LogoView}
          </div>
          <div className={`${styles.right} ${styles.dark}`}>
            <Dropdown overlay={RightHeaderMenu} disabled={currUser === null}>
              <span className={`${styles.action} ${styles.account}`}>
                {currUser ? (
                  <Avatar
                    size="small"
                    className={styles.avatar}
                    src={userDefaultAvatar}
                  />
                ) : (
                  <Avatar
                    size="small"
                    className={styles.avatar}
                    icon="user"
                    style={{ backgroundColor: primaryColor }}
                  />
                )}
                <span>{currUser && currUser.name}</span>
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default TopNav;
