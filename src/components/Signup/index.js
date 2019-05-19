import React, { Component } from 'react';
import router from 'umi/router';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import Link from 'umi/link';
import styles from './index.less';

class Signup extends Component {
  handleSubmit = e => {
    const { form, handleLogin } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        handleLogin(values.username, values.password, res => {
          if (res.status === 'success') {
            router.push('/jinote');
          } else {
            message.error(`Log in failed: ${res.message}`);// .
          }
        });
      }
    });
  };

  handleConfirmNoSpace = (rule, value, callback) => {
    if (value.trim() !== value) callback('Username cannot include whitespace!');
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userLoading } = this.form;

    return (
      <div className={styles['login-main']}>
        <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' },
                { validator: this.handleConfirmNoSpace },
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className={styles['login-form-forgot']} href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className={styles['login-form-button']}
              loading={userLoading}
            >
              Log in
            </Button>
            Or <Link to="/jinote-user/signup">Sign up</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedSignupForm = Form.create()(Signup);

export default WrappedSignupForm;
