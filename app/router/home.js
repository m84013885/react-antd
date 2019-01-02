'use strict'
import 'whatwg-fetch'
import React from 'react'
import _Header from './common/header/index'
import _Nav from './common/nav/index'
import { Layout } from 'antd'

import Pay from './pay/index.js'
import Keep from './keep/index.js'

class Home extends React.Component {
  static propTypes = {

  }

  componentDidMount () {
    const id = this.props.match.params.id
    if (id !== 'pay' && id !== 'keep') {
      this.props.history.replace('/admin/home/pay')
    }
  }
  _renderContent () {
    const id = this.props.match.params.id
    if (id === 'pay') {
      return <Pay/>
    }
    else if (id === 'keep') {
      return <Keep/>
    }
  }
  render () {
    const { Content } = Layout
    return (
      <Layout className='main'>
        <_Nav history={this.props.history}></_Nav>
        <Layout>
          <_Header></_Header>
          <Content>
            {this._renderContent()}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Home
