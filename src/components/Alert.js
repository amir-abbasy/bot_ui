import React, { useEffect } from 'react'

export default function Alert(props) {
  
  useEffect(() => {
    let autoHide = setTimeout(() => {
      props.onClose();
    }, 3000)
    return () => {
      clearTimeout(autoHide)
    }
  }, [])

  const color = () => {
    var value = 'bg-red-500'
    switch (props.type) {
      case 'info':
        var value = 'bg-blue-500'
        break
      case 'error':
        var value = 'bg-red-500'
        break
      case 'warning':
        var value = 'bg-orange-500'
        break
      case 'success':
        var value = 'bg-green-500'
        break

      default:
        break
    }
    return value
  }

  if (props.show)
    return (
      <div
        class={`px-40 py-4 flex ${color()} justify-between items-center fixed right-0 left-0 cursor-pointer z-50 top-0`}
      >
        <div>
          <h1 class="text-white">{props.title}</h1>
          <p class="text-white text-sm font-thin">{props.message}</p>
        </div>

        <span
          class="material-symbols-outlined text-4xl text-white hover:scale-75 duration-200"
          onClick={props?.onClose}
        >
          close
        </span>
      </div>
    )
}

Alert.defaultProps = {
  show: false,
  message: 'No Message Fond',
  title: 'Message',
  type: 'info', // "error || warning || info || success"
}
