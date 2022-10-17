import React, { useRef, useEffect, useState } from 'react'

export function DropBox(props) {
  const ref = useRef(null)
  const { onClickOutside } = props

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onClickOutside])

  if (!props.show) return null

  return <div ref={ref} >{props.children}</div>
}

function DropDown(props) {
  const [show, setShow] = useState(false)
  const [value, setValue] = useState(null)
  const [options, setOptions] = useState(props.options)
  
  const inputReference = useRef(null);

  useEffect(() => {
    show && inputReference.current.focus();
    setOptions(props?.options)
  }, [show]);



  return (
    <div class={props?.class}  >
        <p class="text-sm text-gray-600">
              {props?.title}
              {props?.required && <span class="text-red-600 ml-1">*</span>}
            </p>
      <button class={`w-full bg-white shadow-md shadow-blue-100 relative border ${!show&&'p-3'}`} onClick={()=> setShow(true)}>
    {show ? <input 
              ref={inputReference} 
              onChange={(e)=>{
                if(e.target.value == ''){
                  setOptions(props?.options)
                }else{
                  var newOptions = [];
                  if(props.type == 'number'){
                    newOptions = options.filter((__, k)=> __.id >= e.target.value)
                  }else{
                    newOptions = options.filter((__, k)=> __.id.toLowerCase().includes(e.target.value))
                  }
                  setOptions(newOptions)
                }
              }}
              placeholder='search' class="w-4/5 p-3"/> : 
        <span >{value != null ? value : props?.placeholder?props.placeholder: 'Select your option ' }
        </span>}
      <span class="material-symbols-outlined ml-3 absolute right-5 top-3">{ show ? 'search' : 'expand_circle_down'}</span>
      </button>
      <DropBox
        show={show}
        onClickOutside={() => {
          setShow(!show)
        }}
        class="my-10"
      >
        <ul class="absolute bg-white z-40 border overflow-y-scroll max-h-96">
          {options&&options.map((_, k) => {
            return (
              <li key={k}>
                  <button class="hover:bg-blue-300 p-3 inline-flex border-b text-center "
                  style={{width: '100%'}}
                    onClick={()=>{
                    setValue(_?.name || _?.symbol)
                    setShow(false)
                    props?.onChange && props.onChange({id:_.id, symbol:_.symbol})
                  }}>
                    {_?.logo && <img src={_.logo} />}                    
                    <p class="mx-10 font-bold">{_?.name || _?.symbol}</p>
                  </button>
              </li>
            )
          })}
        </ul>
      </DropBox>
    </div>
  )
}

export default DropDown

DropDown.defaultProps = {
  options: [{name: 'NO OPTIONS', id: null, type: 'text'}]
}