import React from 'react'
import { Link } from 'react-router'

import UnitMeta from '../UnitMeta'
import TagList from '../TagList'

const GiftPreview = props => {
  const gift = props.gift

  return (
    <div className='article-preview'>
      <UnitMeta unit={gift} preview={true} />

      <Link to={`gift/${gift.giftId}`} className='preview-link'>
        <h1>{gift.text}</h1>

        <p>最後限期:&nbsp;{new Date(gift.expireAt).toLocaleString('chinese').slice(0, -3)}</p>

        <span>了解更多...</span>

        <TagList unit={gift} />
      </Link>
    </div>
  )
}

export default GiftPreview
