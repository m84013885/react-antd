'use strict'
import 'whatwg-fetch'
import React from 'react'
import { Layout, Menu, Dropdown } from 'antd'
import './index.css'

const { Header } = Layout

const menu = (
  <Menu>
    <Menu.Item key="1">退出登录</Menu.Item>
  </Menu>
)

class Component extends React.Component {
  static propTypes = {

  }
  render () {
    return (
      <Header className="header">
        <div>热猫Remix - 集美貌与才艺一身的直播平台</div>
        <div className="headerCenter"></div>
        <div>
          <Dropdown overlay={menu}>
            <span>欢迎您，Right Click on Me</span>
          </Dropdown>
        </div>
      </Header>
    )
  }
}

export default Component
