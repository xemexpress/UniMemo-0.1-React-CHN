import React from 'react'

const ReceiverList = props => {
  const receiver = props.gift.receiver
  return (
    <div className='article-meta'>
      接收者:&nbsp;
      {
        receiver.username === props.gift.provider.username ?
        <i>暫未有人領取:)</i>
        :
        <div>
          <img src={receiver.proPic} alt={receiver.username} />&nbsp;&nbsp;
          {receiver.username}
          {
            receiver.username === props.currentUser.username ?
            '. 你已接收此「順便」'
            : null
          }
        </div>
      }
    </div>
  )
}

export default ReceiverList
