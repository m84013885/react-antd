'use strict'
import React from 'react'
import { message, Form, Icon, Input, Button } from 'antd'
const FormItem = Form.Item
class NormalLoginForm extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    form: PropTypes.object
  }
  handleSubmit =(e) => {
    e.preventDefault()
    message.success('登录成功...', 2)
    const { history } = this.props
    history.replace('/admin/home/pay')
  }
  componentDidMount () {

  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div id='loginBox'>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('name')(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password')(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm)
export default WrappedNormalLoginForm
