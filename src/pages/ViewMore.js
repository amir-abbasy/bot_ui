import React, { useState } from 'react'
import exchanges_ from '../global/exchanges'

export default function ViewMore(props) {
  const [showMore, setShowMore] = useState(false)
  var exchanges = Object.entries(props.data)
  return (
    <div class="flex">
      {!showMore && (
        <button
          onClick={() => setShowMore(!showMore)}
          class="font-thin text-sm text-blue-500"
        >
          Show more exchanges
          <span class="material-symbols-outlined  mx-2 -rotate-180 font-thin text-sm">
            straight
          </span>
        </button>
      )}

      {showMore &&
        exchanges.map((_, k) => {
          var ex = exchanges_().filter((d) => d.id == _[0])[0]
          return (
            <div class="flex mr-4 border border-blue-200 pr-2 mb-4 bg-white">
              <div class="mr-2">
                {/* <p>{ex.name}</p> */}
                <img src={ex.logo} />
              </div>
              <div>
                <p>{_[1]['close']}</p>
              </div>
                <p class="text-gray-400 ml-1" style={{fontSize: 10}}>USDT</p>
            </div>
          )
        })}
      {showMore && (
        <span
          onClick={() => setShowMore(!showMore)}
          class="material-symbols-outlined text-gray-500 mx-4 hover:cursor-pointer hover:scale-125"
        >
          close
        </span>
      )}
    </div>
  )
}
