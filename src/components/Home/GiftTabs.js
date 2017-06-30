import React from 'react'

import agent from '../../agent'

export class ProvideTab extends React.Component {
  constructor(){
    super()

    this.handleProvide = tab => ev => {
      ev.preventDefault()
      this.props.onTabClick(
        tab,
        agent.Gifts.providedBy(this.props.currentUser.username, tab.slice(8))
      )
    }
  }

  render(){
    if(this.props.tab && this.props.tab.startsWith('provide')){
      return (
        <div>
          <li className='nav-item'>
            <a
              className={this.props.tab === 'provide-sent' ? 'nav-link active' : 'nav-link'}
              onClick={this.props.tab !== 'provide-sent' ? this.handleProvide('provide-sent') : null}>
              <i className='ion-android-send'></i>&nbsp;我已分享的「順便」
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={this.props.tab === 'provide-nSent' ? 'nav-link active' : 'nav-link'}
              onClick={this.props.tab !== 'provide-nSent' ? this.handleProvide('provide-nSent') : null}>
              <i className='ion-cube'></i>&nbsp;我的待用「順便」
            </a>
          </li>
        </div>
      )
    }else{
      return (
        <li className='nav-item'>
          <a
            className='nav-link'
            onClick={this.handleProvide('provide-sent')}>
            <i className='ion-wand'></i>&nbsp;我的順便
          </a>
        </li>
      )
    }
  }
}

export class ReceiveTab extends React.Component {
  constructor(){
    super()

    this.handleReceive = tab => ev => {
      ev.preventDefault()
      this.props.onTabClick(
        tab,
        agent.Gifts.receivedBy(this.props.currentUser.username, tab.slice(8))
      )
    }
  }

  render(){
    if(this.props.tab && this.props.tab.startsWith('receive')){
      return (
        <div>
          <li className='nav-item'>
            <a
              className={this.props.tab === 'receive-received' ? 'nav-link active' : 'nav-link'}
              onClick={this.props.tab !== 'receive-received'? this.handleReceive('receive-received') : null}>
              <i className='ion-waterdrop'></i>&nbsp;我已接的「順便」
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={this.props.tab === 'receive-nReceived' ? 'nav-link active' : 'nav-link'}
              onClick={this.props.tab !== 'receive-nReceived' ? this.handleReceive('receive-nReceived') : null}>
              <i className='ion-bonfire'></i>&nbsp;待用「順便」
            </a>
          </li>
        </div>
      )
    }else{
      return (
        <li className='nav-item'>
          <a
            className='nav-link'
            onClick={this.handleReceive('receive-received')}>
            <i className='ion-umbrella'></i>&nbsp;大家的「順便」
          </a>
        </li>
      )
    }
  }
}
