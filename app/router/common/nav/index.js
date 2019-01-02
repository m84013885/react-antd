'use strict'
import 'whatwg-fetch'
import React from 'react'
import { Layout, Icon } from 'antd'
import './index.css'
const { Sider } = Layout

class Component extends React.Component {
  static propTypes = {

  }
  pay = this.pay.bind(this)
  keep = this.keep.bind(this)
  pay () {
    const { history } = this.props
    history.replace('/admin/home/pay')
  }
  keep () {
    const { history } = this.props
    history.replace('/admin/home/keep')
  }
  render () {
    return (
      <Sider className='nav'>
        <div className='navTitle'>Remix</div>
        <div className='navBtn' onClick={this.pay}><Icon type="bars" className='navBtnIcon'/>充值数据</div>
        <div className='navBtn' onClick={this.keep}><Icon type="bars" className='navBtnIcon'/>留存数据</div>
      </Sider>
    )
  }
}

export default Component
