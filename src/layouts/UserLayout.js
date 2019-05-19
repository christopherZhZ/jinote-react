import React, { PureComponent, Fragment } from 'react';
import { Layout } from 'antd';
import HeaderView from './Header';
import logo from '../assets/jinote-logo.png';
import { contentWidth } from '@/defaultUISettings';
import styles from './MainLayout.less';

const Context = React.createContext();
const { Content } = Layout;

class UserLayout extends PureComponent {

  render() {
    const { children } = this.props;

    const layout = (
      <Layout className={styles.frame}>
        <HeaderView
          logo={logo}
          contentWidth={contentWidth}
        />
        <Layout className={styles.main}>
          <Content style={{ margin: 0 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <Fragment>
        <Context.Provider>
          <div>{layout}</div>
        </Context.Provider>
      </Fragment>
    );
  }
}

export default UserLayout;
