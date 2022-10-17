import { useRouter } from 'next/router'
import React from 'react'
import { io } from 'socket.io-client'
import { Header, Footer, FilterBox } from '../components'
import exchanges from '../global/exchanges'
import config from '../global/config'

var markets_ = [
  {
    pair: 'DEUS/USDT',
    low: {
      price: 39.28,
      exchange: 'gate',
    },
    high: {
      price: 42.52,
      exchange: 'mexc',
    },
    diff: '3.240',
    otherExch: {},
  },
  {
    pair: 'MLN/USDT',
    low: {
      price: 22.161,
      exchange: 'gate',
    },
    high: {
      price: 23.687,
      exchange: 'kucoin',
    },
    diff: '1.526',
    otherExch: {
      binance: {
        close: 23.6,
      },
      mexc: {
        close: 23.669,
      },
      coinex: {
        close: 23.6506,
      },
    },
  },
  {
    pair: 'KTON/USDT',
    low: {
      price: 11.1053,
      exchange: 'mexc',
    },
    high: {
      price: 11.7265,
      exchange: 'gate',
    },
    diff: '0.621',
    otherExch: {
      coinex: {
        close: 11.703,
      },
    },
  },
  {
    pair: 'ROOK/USDT',
    low: {
      price: 26.657,
      exchange: 'gate',
    },
    high: {
      price: 27.2579,
      exchange: 'coinex',
    },
    diff: '0.601',
    otherExch: {},
  },
  {
    pair: 'TARI/USDT',
    low: {
      price: 22.6762,
      exchange: 'mexc',
    },
    high: {
      price: 23.236,
      exchange: 'gate',
    },
    diff: '0.560',
    otherExch: {},
  },
]

const App = () => {
  const [markets, setMarkets] = React.useState()
  const [filter, setFilter] = React.useState()
  const router = useRouter()

  React.useEffect(() => {
    const socket = io(config.api_url)
    socket.on('connect', () => console.log(socket.id))
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 4000)
    })
    // socket.on('markets', (data) => setMarkets(JSON.parse(data)))
    socket.on('markets', (data) => {
      setMarkets(JSON.parse(data))
      // setMarkets(filterCoin_(JSON.parse(data)))
    })
    socket.on('disconnect', () => console.log('Disconnected'))
  }, [])

  var account = [
    {
      title: 'Total Trading Count',
      value: 0,
    },
    {
      title: 'Total Profit',
      value: 0,
    },
    {
      title: 'Total Fuel Charge',
      value: 0,
    },
    {
      title: 'Connected Exchange',
      value: 2,
    },
  ]

  return (
    <>
      <Header />
      <div class="px-40" style={{ backgroundColor: '#eef1f8' }}>
        {/* 1 */}

        <div class="flex justify-between  ">
          {account.map((__, k) => {
            var border =
              k == 1
                ? 'border-red-200'
                : k == 2
                ? 'border-violet-200'
                : k == 3
                ? 'border-blue-200'
                : 'border-green-200'
            return (
              <div
                class={`bg-white border p-4 flex-1 mr-4 rounded-lg shadow-md shadow-blue-100 ${border}`}
                key={k}
              >
                <p class="text-center">{__.title}</p>
                <p class="text-center font-bold text-2xl">{__.value}</p>
              </div>
            )
          })}
        </div>
        
        {/* 2 */}
        <div class="mt-10 p-10 bg-green-200 flex items-center rounded-lg">
          <span class="material-symbols-outlined text-8xl mr-10 text-green-600">
            legend_toggle
          </span>
          <div>
            <h3 class="text-4xl font-bold text-green-600">GRID trading bots</h3>
            <h3 class="text-2xl">Profit from every market move</h3>
            <p>
              The grid strategy works with postponed limit BUY and SELL orders
              in predefined price intervals. The price range you choose will be
              divided into multiple levels (also selected by you) which creates
              a grid full of orders.
            </p>
            <h3 class="text-2xl my-4">GRID bot strategies</h3>

            <div class="flex">
              <div class="p-5 bg-white mr-5 rounded-lg shadow-xl">
                <p>Buy the dip</p>
                <p class="text-xs">Earn BTC as it becomes cheaper, then HODL</p>
              </div>

              <div class="p-5 bg-white mr-5 rounded-lg shadow-xl">
                <p>Flat</p>
                <p class="text-xs">
                  Earn USDT on every small price fluctuation
                </p>
              </div>

              <div class="p-5 bg-white mr-5 rounded-lg shadow-xl">
                <p>Custom grid</p>
                <p class="text-xs">Configure your own grid trading strategy</p>
              </div>
            </div>

            <button
              class="bg-green-600 text-white p-3 flex hover:bg-green-500  hover:scale-105 mt-5 "
              onClick={() => {
                router.push('CreateBot')
              }}
            >
              <p>Create Bot Now</p>
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>



      {/* 3 */}
        <div class="mt-10 p-10 bg-indigo-200 flex items-center rounded-lg">
          <span class="material-symbols-outlined text-8xl mr-10 text-indigo-600">
          ssid_chart
          </span>
          <div>
            <h3 class="text-4xl font-bold text-indigo-600">DCA trading bots</h3>
            <h3 class="text-2xl">Set algorithmic strategy based on smart technical indicators</h3>
            <p>
            The DCA trading bot (or "Dollar Cost Averaging") allows you to invest in a cryptocurrency at multiple price levels to get a better average entry price.
            </p>
            <h3 class="text-2xl my-4">DCA bot strategies</h3>

            <div class="flex">
              <div class="p-5 bg-white mr-5 rounded-lg shadow-xl">
                <p>MACD+RSI</p>
                <p class="text-xs">Оutperform market on bullish or bearish trends</p>
              </div>

              <div class="p-5 bg-white mr-5 rounded-lg shadow-xl">
                <p>Stochastic + channel</p>
                <p class="text-xs">
                Buy/Sell inside channels, HODL outside channels
                </p>
              </div>

              <div class="p-5 bg-white mr-5 rounded-lg shadow-xl">
                <p>Pure DCA</p>
                <p class="text-xs">Buy at multiple DCA levels, take profit, repeat</p>
              </div>
            </div>

            <button
              class="bg-indigo-600 text-white p-3 flex hover:bg-indigo-500  hover:scale-105 mt-5 "
              onClick={() => {
                router.push('CreateBot')
              }}
            >
              <p>Create Bot Now</p>
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>


      </div>


       

      <div class="px-40">
        <h1 class="text-2xl mt-14">How does it work </h1>
        <p class="text-sm mt-4">
          The Inter-exchange Arbitrage bot buys low on one exchange and sells
          high on the other. This bot does not re-balance the wallet.
          Eventually, the wallet needs manual re-balancing for the bot to
          continue. Only use this with small trade amounts. Please ensure you
          fully understand the concept of this bot before using it.
        </p>
      </div>
      <Footer />
    </>
  )
}
export default App
