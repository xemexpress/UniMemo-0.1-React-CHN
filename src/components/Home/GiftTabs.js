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
              <i className='ion-android-send'></i>&nbsp;Gifts I've sent
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={this.props.tab === 'provide-nSent' ? 'nav-link active' : 'nav-link'}
              onClick={this.props.tab !== 'provide-nSent' ? this.handleProvide('provide-nSent') : null}>
              <i className='ion-cube'></i>&nbsp;Gifts not sent
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
            <i className='ion-wand'></i>&nbsp;Gifts I provide
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
              <i className='ion-waterdrop'></i>&nbsp;Gifts I've received
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={this.props.tab === 'receive-nReceived' ? 'nav-link active' : 'nav-link'}
              onClick={this.props.tab !== 'receive-nReceived' ? this.handleReceive('receive-nReceived') : null}>
              <i className='ion-bonfire'></i>&nbsp;Gifts I could get
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
            <i className='ion-umbrella'></i>&nbsp;Gifts I could use
          </a>
        </li>
      )
    }
  }
}
