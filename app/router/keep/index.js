'use strict'
import 'whatwg-fetch'
import React from 'react'
import moment from 'moment'
import { DatePicker, Button, Menu, Checkbox, Dropdown, Icon, Table, Pagination, Spin } from 'antd'
import asyncFetch from '../../utils/asyncFetch'
import './index.css'

import { URLPREFIX } from '../config'

moment.locale('zh-cn')
class Keep extends React.Component {
  static propTypes = {

  }
  state = {
    loading: false,
    regpayLoading: false,

    visible: false,

    start: '20181201+00',
    end: '20181201+23',
    os: 'ios',

    current: 1,
    currentPage: 20,

    checkAll: false,
    appSelect: [],

    channelSelect: [],
    channelSelected: 'all',

    data: [
      { app: '-',
        channel: 'total',
        device: '0',
        new: '0',
        new_pay_transfer: '0',
        newnums: '0',
        newpeop: '0',
        newsums: '0',
        nums: '0',
        onums: '0',
        opeop: '0',
        os: '-',
        osums: '0',
        pay_arppu: '0',
        pay_arpu: '0',
        peop: '0',
        reg: '0',
        reg1: '0',
        regpay: '0',
        regpaycnt: '0',
        sums: '0',
        key: 0 }
    ]
  }

  handleMenuClick = this.handleMenuClick.bind(this)
  handleVisibleChange = this.handleVisibleChange.bind(this)
  handleChangeTime = this.handleChangeTime.bind(this)
  handlePlatformClick = this.handlePlatformClick.bind(this)
  handleChangeApp = this.handleChangeApp.bind(this)
  handleCheckAllChangeApp = this.handleCheckAllChangeApp.bind(this)
  handleChannelClick = this.handleChannelClick.bind(this)
  handleSearch = this.handleSearch.bind(this)
  handleDownloadChannel = this.handleDownloadChannel.bind(this)
  handleDownloadChannelDetail = this.handleDownloadChannelDetail.bind(this)
  handleChangePagination = this.handleChangePagination.bind(this)
  handleDownloadChannelDetail () {
    const start = this.state.start
    const end = this.state.end
    const os = this.state.os
    const channel = this.state.channelSelected === 'all' ? '' : this.state.channelSelected
    const app = this._getAppSelect()
    const iframe = document.createElement('iframe')
    iframe.src = URLPREFIX + `download/payinfo/ochannel?start=${start}&end=${end}&os=${os}&app=${app}&channel=${channel}`
    iframe.style.display = 'none'
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(iframe)
  }
  handleDownloadChannel () {
    const start = this.state.start
    const end = this.state.end
    const os = this.state.os
    const channel = this.state.channelSelected === 'all' ? '' : this.state.channelSelected
    const app = this._getAppSelect()
    const iframe = document.createElement('iframe')
    iframe.src = URLPREFIX + `download/payinfo/channel?start=${start}&end=${end}&os=${os}&app=${app}&channel=${channel}`
    iframe.style.display = 'none'
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(iframe)
  }
  componentDidMount () {
    this.getPlatform()
  }
  _getAppSelect () {
    const appSelect = this.state.appSelect
    let app = ''
    const appArr = []
    appSelect.map((content) => {
      if (content.checked) {
        appArr.push(content.value)
      }
    })
    appArr.map((content, index) => {
      if (index !== appArr.length - 1) {
        app += content + ','
      }
      else {
        app += content
      }
    })
    return app
  }
  handleSearch (react, page) {
    page = page || 1
    const start = this.state.start
    const end = this.state.end
    const os = this.state.os
    const channel = this.state.channelSelected === 'all' ? '' : this.state.channelSelected
    const app = this._getAppSelect()
    this.setState({
      loading: true
    })
    if (app && os && end && start) {
      asyncFetch({
        url: URLPREFIX + `default?page=${page}&limit=50&start=${start}&end=${end}&os=${os}&app=${app}&channel=${channel}&sort=`,
        method: 'GET'
      }).then(res => {
        if (res.err === 0) {
          this.setState({
            data: res.data,
            current: page,
            currentPage: res.data.length / 50 * 10,
            loading: false,
            regpayLoading: true
          })
        }
        else {
          alert('错误')
        }
      }).then(() => {
        asyncFetch({
          url: URLPREFIX + `default/regpay?start=${start}&end=${end}&os=${os}&app=${app}&channel=${channel}&sort=`,
          method: 'GET'
        }).then(res => {
          if (res.err === 0) {
            const data = this.state.data
            if (os === 'ios') {
              res.data.map((content) => {
                data.map((dataContent, index) => {
                  if (content.app === dataContent.app) {
                    data[index].regpaycnt = content.regpaycnt
                    data[index].regpay = content.regpay
                  }
                })
              })
              this.setState({
                data: data,
                regpayLoading: false
              })
            }
            else {
              res.data.map((content) => {
                data.map((dataContent, index) => {
                  if (content.channel === dataContent.channel) {
                    data[index].regpaycnt = content.regpaycnt
                    data[index].regpay = content.regpay
                  }
                })
              })
              this.setState({
                data: data,
                regpayLoading: false
              })
            }
          }
          else {
            alert('错误')
          }
        })
      })
    }
  }
  handleMenuClick () {
    this.setState({ visible: true })
  }
  handleVisibleChange (flag) {
    this.setState({ visible: flag })
  }
  _renderPlatformCheckbox () {
    return (
      <Menu onClick={this.handlePlatformClick}>
        <Menu.Item key='ios'>ios</Menu.Item>
        <Menu.Item key='mac'>mac</Menu.Item>
        <Menu.Item key='touch'>touch</Menu.Item>
        <Menu.Item key='web'>web</Menu.Item>
        <Menu.Item key='h5'>h5</Menu.Item>
        <Menu.Item key='windows'>windows</Menu.Item>
        <Menu.Item key='android'>android</Menu.Item>
      </Menu>
    )
  }
  _renderChannelCheckbox () {
    const channel = this.state.channelSelect
    return (
      <Menu onClick={this.handleChannelClick}>
        <Menu.Item key='all'>all</Menu.Item>
        {channel.map((content) => {
          return (<Menu.Item key={content}>{content}</Menu.Item>)
        })}
      </Menu>
    )
  }
  handleChannelClick ({ key }) {
    this.setState({
      channelSelected: key
    })
  }
  getPlatform () {
    if (!this.state.os) {
      return
    }
    asyncFetch({
      url: URLPREFIX + `layer/` + this.state.os,
      method: 'GET'
    }).then(res => {
      if (res.err === 0) {
        const arr = []
        res.data.map((content, index) => {
          if (index === 0) {
            arr.push({ value: content, checked: true })
          }
          else {
            arr.push({ value: content, checked: false })
          }
        })
        this.setState({
          appSelect: arr
        }, this.getChannel)
      }
      else {
        alert('错误')
      }
    })
  }
  getChannel () {
    if (!this.state.os) {
      return
    }
    const app = this._getAppSelect()
    if (!app) {
      return
    }
    asyncFetch({
      url: URLPREFIX + `layer/${this.state.os}/` + app,
      method: 'GET'
    }).then(res => {
      if (res.err === 0) {
        this.setState({
          channelSelect: res.data
        })
      }
      else {
        alert('错误')
      }
    })
  }
  handleChangeApp (e) {
    const app = this.state.appSelect
    let all = 0
    app.map((content, index) => {
      if (content.value === e.target.value) {
        app[index].checked = e.target.checked
        // this.setState(app)
      }
      if (content.checked) {
        all++
      }
    })
    if (all === app.length) {
      this.setState({
        checkAll: true
      }, this.getChannel)
    }
    else {
      this.setState({
        checkAll: false
      }, this.getChannel)
    }
  }
  handleCheckAllChangeApp (e) {
    const app = this.state.appSelect
    this.setState({
      checkAll: e.target.checked
    }, this.getChannel)
    if (e.target.checked) {
      app.map((content, index) => {
        app[index].checked = true
        // this.setState(app)
      })
    }
    else {
      app.map((content, index) => {
        app[index].checked = false
        // this.setState(app)
      })
    }
  }
  handlePlatformClick ({ key }) {
    this.setState({
      checkAll: false,
      os: key
    }, this.getPlatform)
  }
  handleChangeTime (date, dateString) {
    if (dateString === '') {
      this.setState({
        start: ''
      })
      return
    }
    const ltime = dateString.split('-')
    const start = ltime[0] + ltime[1] + ltime[2] + '+00'
    this.setState({
      start: start
    })
  }
  _renderAppCheckbox () {
    const app = this.state.appSelect
    return (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item>
          <Checkbox indeterminate={this.state.indeterminate} onChange={this.handleCheckAllChangeApp} checked={this.state.checkAll}>
            全部
          </Checkbox>
        </Menu.Item>
        {app.map((content, key) => {
          return (<Menu.Item key={key}><Checkbox value={content.value} checked={content.checked} onChange={this.handleChangeApp}>{content.value}</Checkbox></Menu.Item>)
        })}
      </Menu>
    )
  }
  _renderPlatformCheckboxName () {
    const checkAll = this.state.checkAll
    const app = this.state.appSelect
    const appArr = []
    app.map((content) => {
      if (content.checked) {
        appArr.push(content.value)
      }
    })
    if (appArr.length === 0) {
      return 'None selected'
    }
    else if (appArr.length <= 3) {
      let str = ''
      appArr.map((content, index) => {
        if (index !== appArr.length - 1) {
          str += content + ','
        }
        else {
          str += content
        }
      })
      return str
    }
    else if (checkAll) {
      return `All selected(${appArr.length})`
    }
    else {
      return appArr.length + ' selected'
    }
  }
  handleChangePagination (e) {
    this.setState({
      current: e
    })
    this.handleSearch(null, e)
  }
  render () {
    const data = this.state.data
    const { RangePicker } = DatePicker
    const { Column, ColumnGroup } = Table
    const ButtonGroup = Button.Group
    const app = this._renderAppCheckbox()
    const platform = this._renderPlatformCheckbox()
    const channel = this._renderChannelCheckbox()
    const channelSelected = this.state.channelSelected
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
    return (
      <div className='payContent'>
        <div className='payTitle'><Icon type="bars"/>各渠道信息汇总</div>
        <div className='payFrom'>
          <DatePicker onChange={this.handleChangeTime} />
          {/* <RangePicker onChange={this.handleChangeTime} defaultValue={[moment('2018/12/01', 'YYYY/MM/DD'), moment('2018/12/1', 'YYYY/MM/DD')]}/> */}
          <div className='payFromText'>平台</div>
          <Dropdown overlay={platform} placement="bottomCenter" onChange={this.handleChangePlatform}>
            <Button>{this.state.os}</Button>
          </Dropdown>
          <div className='payFromText'>应用</div>
          <Dropdown overlay={app} placement="bottomCenter" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
            <Button>{this._renderPlatformCheckboxName()}</Button>
          </Dropdown>
          <div className='payFromText'>渠道</div>
          <Dropdown overlay={channel} placement="bottomCenter">
            <Button>{channelSelected}</Button>
          </Dropdown>
          <Button className='payBtn' onClick={this.handleSearch}>查询</Button>
        </div>
        <div className='payFrom2'>
          <ButtonGroup>
            <Button onClick={this.handleDownloadChannel}>支付渠道详情</Button>
            <Button onClick={this.handleDownloadChannelDetail}>注册渠道详情</Button>
          </ButtonGroup>
        </div>

        <Table dataSource={data} bordered={true} scroll={{ x: 1600, y: 400 }} size="small" pagination={false}>
          <Column title="平台" dataIndex="os" key="os" width={50}/>
          <Column title="产品" dataIndex="app" key="app" width={50}/>
          <Column title="渠道" dataIndex="channel" key="channel" width={50}/>
          <Column title="新增设备" dataIndex="new" key="new" width={60}/>
          <Column title="新增注册" dataIndex="reg" key="reg" width={60}/>
          <Column title="新增注册设备" dataIndex="reg1" key="reg1" width={70}/>
          <Column title="活跃设备" dataIndex="device" key="device" width={50}/>
          <ColumnGroup title="新用户付费：付费时所在渠道来源">
            <Column title="人数" dataIndex="newpeop" key="newpeop" width={60}/>
            <Column title="次数" dataIndex="newnums" key="newnums" width={60}/>
            <Column title="金额" dataIndex="newsums" key="newsums" width={60}/>
          </ColumnGroup>
          <ColumnGroup title="累计付费：注册用户渠道来源" >
            <Column title="人数" dataIndex="opeop" key="opeop" width={60}/>
            <Column title="次数" dataIndex="onums" key="onums" width={60}/>
            <Column title="金额" dataIndex="osums" key="osums" width={60}/>
          </ColumnGroup>
          <ColumnGroup title="累计付费：付费时所在渠道来源" >
            <Column title="人数" dataIndex="peop" key="peop" width={60}/>
            <Column title="次数" dataIndex="nums" key="nums" width={60}/>
            <Column title="金额" dataIndex="sums" key="sums" width={60}/>
          </ColumnGroup>
          <ColumnGroup title="相应时间段注册用户付费" >
            <Column title="人数" dataIndex="regpaycnt" key="regpaycnt" width={60}/>
            <Column title="金额" dataIndex="regpay" key="regpay" width={60}/>
          </ColumnGroup>
        </Table>
        <Spin className={this.state.regpayLoading ? 'regpayLoading' : 'regpayLoadingHide'} indicator={antIcon} />
        <div className={this.state.loading ? 'payLoading' : 'payLoadingHide'}>
          <Spin className='payLoadingSpin' size="large"></Spin>
        </div>
        {/* <Pagination onChange={this.handleChangePagination} current={this.state.current} total={this.state.currentPage} /> */}
      </div>
    )
  }
}

export default Keep
