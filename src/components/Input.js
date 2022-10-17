import React, { useState } from 'react'

export default function Input(props) {
  //   const [value, setVlaue] = useState()

  const handleInput = (e) => {
    e.preventDefault()
    // setVlaue(e.target.value)
    props?.onChange && props.onChange(e.target.value)
  }
  // console.log(value);

  const renderUi = () => {
    var render = null
    switch (props.type) {
      case 'text':
        render = (
          <div 
          class={`my-5 ${props?.baseClass}`} >
            <p class="text-sm text-gray-600">
              {props?.title}
              {props?.required && <span class="text-red-600 ml-1">*</span>}
            </p>
            <p class="text-xs text-gray-400">{props?.discription}</p>
            <input
              placeholder={props?.placeholder}
              class={`w-full bg-white p-3 px-3 my-2 shadow-md shadow-blue-100 border ${props?.class}`}
              onChange={(e) => handleInput(e)}
              onFocus={props?.onFocus}
              onBlur={props?.onBlur}
              type={props?.type}
              
            />
          </div>
        )
        break;
        case 'password':
          render = (
            <div 
          class={`my-5 ${props?.baseClass}`} >
              <p class="text-sm text-gray-600">
                {props?.title}
                {props?.required && <span class="text-red-600 ml-1">*</span>}
              </p>
              <p class="text-xs text-gray-400">{props?.discription}</p>
              <input
                placeholder={props?.placeholder}
                class={`w-full bg-white p-3 px-3 my-2 shadow-md shadow-blue-100 border ${props?.class}`}
                onChange={(e) => handleInput(e)}
                onFocus={props?.onFocus}
                onBlur={props?.onBlur}
                type={props?.type}
              />
            </div>
          )
          break
      default:
        render = (
          <div 
          class={`my-5 border" ${props?.baseClass}`} >
            <p class="text-sm">
              {props?.title}
              {props?.required && <span class="text-red-600 ml-1">*</span>}
            </p>
            <p class="text-xs text-gray-400">{props?.discription}</p>
            <textarea
              placeholder={props?.placeholder}
              class="w-full border p-1 px-3 rounded my-2"
              onChange={(e) => handleInput(e)}
            />
          </div>
        )
        break
    }

    return render
  }
  return <>{renderUi()}</>
}
