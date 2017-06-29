import React from 'react'

import RequestPreview from './RequestPreview'
import GiftPreview from './GiftPreview'
import ListPagination from '../ListPagination'

const UnitsList = props => {
  if(!props.requests && !props.gifts){
    return (
      <div className='article-preview'>
        抖下先...
      </div>
    )
  }

  const units = props.requests || props.gifts
  const unitType = props.requests ? 'requests' : 'gifts'

  if(units.length === 0){
    return (
      <div className='article-preview'>
        仲未有「{unitType === 'requests' ? '委託' : '順便'}」...住。
      </div>
    )
  }

  return (
    <div>
      {
        unitType === 'requests' ?
        <span>
          {
            units.map(unit => {
              return (
                <RequestPreview request={unit} key={unit.requestId} />
              )
            })
          }
        </span>
        :
        <span>
          {
            units.map(unit => {
              return (
                <GiftPreview gift={unit} key={unit.giftId} />
              )
            })
          }
        </span>
      }

      <ListPagination
        unitsCount={props.requestsCount || props.giftsCount}
        currentPage={props.currentPage}
        onSetPage={props.onSetPage} />
    </div>
  )
}

export default UnitsList
