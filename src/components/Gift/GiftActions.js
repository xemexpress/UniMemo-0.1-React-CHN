import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../../agent'

import {
  DELETE_GIFT,
  UPDATE_GIFT,
  SWITCH_ACCESS_GIFT
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onDel: giftId => dispatch({
    type: DELETE_GIFT,
    payload: agent.Gifts.del(giftId)
  }),
  onUpdate: gift => dispatch({
    type: UPDATE_GIFT,
    payload: agent.Gifts.update(gift)
  }),
  onSwitch: giftId => dispatch({
    type: SWITCH_ACCESS_GIFT,
    payload: agent.Gifts.switch(giftId)
  })
})

class GiftActions extends React.Component {
  constructor(){
    super()

    this.handleDel = gift => ev => {
      ev.preventDefault()
      this.props.onDel(gift.giftId)
    }

    this.handleReceive = gift => ev => {
      ev.preventDefault()
      this.props.onUpdate(gift)
    }

    this.handleSwitch = gift => ev => {
      ev.preventDefault()
      this.props.onSwitch(gift.giftId)
    }
  }

  render(){
    const gift = this.props.gift

    const isProvider = this.props.currentUser.username === gift.provider.username

    const isReceiver = this.props.currentUser.username === gift.receiver.username

    if(isProvider){
      return (
        <span>
          <Link
            to={`giftEditor/${gift.giftId}`}
            className='btn btn-sm btn-outline-secondary'>
            <i className='ion-edit'></i>&nbsp;編輯內容
          </Link>
          &nbsp;&nbsp;&nbsp;
          <button
            className='btn btn-sm btn-outline-info'
            onClick={this.handleSwitch(gift)}>
            {
              gift.tagList.indexOf('personal') !== -1 ?
              <i>轉至「可公開」（容許接收者讓其他人使用）</i>
              : <i>轉至「僅接收者可見」</i>
            }
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className='btn btn-sm btn-outline-danger'
            onClick={this.handleDel(gift)}>
            <i className='ion-trash-a'></i>&nbsp;刪除
          </button>
        </span>
      )
    }else{
      return (
        <span>
          <button
            className='btn btn-sm btn-outline-info'
            onClick={this.handleReceive(gift)}>
            {
              isReceiver ? <span><i className='ion-log-in'></i>&nbsp;請送返。多謝！</span>
              : <span><i className='ion-log-out'></i>&nbsp;領取使用</span>
            }
          </button>
          &nbsp;&nbsp;&nbsp;
          {
            !isReceiver ? null : gift.tagList.indexOf('personal') !== -1 ?
            <i>僅我使用</i>
            :
            <button
              className='btn btn-sm btn-outline-danger'
              onClick={this.handleSwitch(gift)}>
              {
                gift.tagList.indexOf('public') !== -1 ?
                <i>轉至「公開」</i>
                : <i>轉至「僅自己可見」</i>
              }
            </button>
          }
        </span>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftActions)
