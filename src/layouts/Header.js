import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Layout } from 'antd';
import TopNav from '@/components/TopNav'
import styles from './Header.less';

const { Header } = Layout;

@connect(({ user }) => ({
  currUser: user.currUser,
}))
class HeaderView extends PureComponent {

  onRightHeaderMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'accountInfo') {
      router.push('/jinote/account');
    }
    if (key === 'logout') {
      dispatch({ type: 'user/logout' });
    }
  };

  render() {
    return (
      <Header
        // style={{ position: 'fixed', zIndex: 1, width: '100%' }}
        className={styles.fixedHeader}
      >
        <TopNav {...this.props} onMenuClick={this.onRightHeaderMenuClick} />
      </Header>
    );
  }
}

export default HeaderView;
