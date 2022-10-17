import React, { useState } from 'react'
import DropDown from './DropDown'
import Input from './Input'

const priceOpt = (base = 0.25, max = 10, pref = '') => {
  var num = [{ id: base, name: pref + ' - ' + base }]
  for (let index = 1; index < max; index++) {
    var val = num[num.length - 1].id + num[num.length - 1].id
    if (val == 4) val = 5
    num.push({ id: val, name: pref + '- ' + val })
  }
  return num
}

export default function FilterBox(props) {
  const [showFilter, setShowFilter] = useState()
  return (
    <div class="flex items-center">
       <p class="mr-2">Invest</p>
       <Input
        placeholder='$ 0.00'
        type="text"
        class="w-32"
        onChange={(val) =>{
         props?.onChange(val, 'invest')
        }
        }
      />

      {showFilter && (
        <>
          <DropDown
            class="w-[250px] mx-4"
            placeholder="Max coin-price"
            options={priceOpt(undefined, 15, 'Max coin-price')}
            onChange={(val) => props?.onChange(val, 'price')}
            type="number"
          />
          <DropDown
            class="w-[250px]"
            options={priceOpt(undefined, 8, 'Min-Diffrence')}
            placeholder="Min-Diffrence"
            onChange={(val) => props?.onChange(val, 'diff')}
            type="number"
          />
        </>
      )}
      {showFilter ? (
        <button
          onClick={() => {
            props?.onClear()
            setShowFilter(false)
          }}
          class="border p-3 ml-5 shadow-lg px-6 bg-gray-600 text-white"
        >
          Clear
        </button>
      ) : (
        <button
          onClick={() => setShowFilter(true)}
          class="border p-3 ml-5 shadow-lg px-6 bg-blue-600 text-white"
        >
          Filter
        </button>
      )}
    </div>
  )
}
