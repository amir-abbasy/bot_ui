import { useState } from 'react'
import { DropDown, Input, Header, Alert } from '../components'
import exchanges_list from '../global/exchanges'

export default function App() {
  const [show, setShow] = useState(false)
  const [exchanges, setExchanges] = useState(['binance', 'wazirx'])
  const [alert, setAlert] = useState()

  return (
    <>
      {alert && (
        <Alert {...alert} onClose={() => setAlert({ ...alert, show: false })} />
      )}
      <Header />
      <div class="px-40 py-10 ">
        <div>
          <h1 class="text-3xl my-10">Exchanges</h1>

          {exchanges.map((_, k) => {
            var logo = exchanges_list().filter((d) => d.id == _)
            var balance = (k + Math.random() * 40).toFixed(3).toString()
            return (
              <div class="bg-white p-5 flex justify-between border-b items-center shadow-2xl shadow-blue-300 border border-blue-100">
                <span class="material-symbols-outlined ml-3">
                  currency_exchange
                </span>
                <div class="flex ml-5">
                  <p class="font-bold text-lg mr-5">{logo[0].name}</p>
                  <div>
                    <img src={logo[0].logo} />
                  </div>
                </div>

                <p class="flex-1"></p>
                <div class="flex items-center">
                  <p class="text-gray-400">Balance</p>
                  <p class="font-normal text-4xl mx-5">
                    {balance}
                    <sup class="font-thin text-xs">USDT</sup>
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <h1 class="text-3xl mt-10">Add Exchange</h1>
        <div
          class={
            show
              ? 'hidden'
              : 'my-10 bg-white p-10 shadow-2xl shadow-blue-300 border-2 border-blue-100'
          }
        >
          <DropDown
            class="w-2/5"
            placeholder="Select Exchange"
            options={exchanges_list()}
          />
          <Input placeholder="0x4077f23..." type="text" title="Api Key" />
          <Input
            placeholder="asd0x40f7gh7df23..."
            type="text"
            title="Private Key"
          />
        </div>

        <button
          class="bg-blue-600 text-white p-3 flex my-10"
          onClick={() => {
            // if (!show) setExchanges([...exchanges, '_'])
            // setShow(!show)
            setAlert({
              show: true,
              title: 'Sorry!',
              type: 'warning',
              message: "Demo version can't add new Exchanges",
            })
          }}
        >
          Add Exchange
          <span class="material-symbols-outlined ml-3">currency_exchange</span>
        </button>
      </div>
    </>
  )
}
