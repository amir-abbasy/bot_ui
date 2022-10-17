import { useRouter } from 'next/router'
import React from 'react'
import { io } from 'socket.io-client'
import { Header, Footer, FilterBox } from '../components'
import exchanges from '../global/exchanges'
import config from '../global/config'
import ViewMore from './ViewMore'

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
      <div class="px-40" style={{backgroundColor: '#eef1f8'}}>
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
        <div class="flex justify-between items-center mt-10">
          <h1 class="text-2xl text-blue-500">
            Opportunities {markets && '(' + (filter || markets).length + ')'}
          </h1>
          <FilterBox
            onChange={(val, type) => {
              var filterMrkts = []

              switch (type) {
                case 'price':
                  filterMrkts = (filter || markets).filter(
                    (__, k) => __.low.price < val.id,
                  )
                  break
                case 'invest':
                  filterMrkts = markets.map((__, k) => {
                    var newFilter = { ...__, invest: val }
                    return newFilter
                  })
                  break
                default:
                  filterMrkts = (filter || markets).filter(
                    (__, k) => __.diff > val.id,
                  )
                  break
              }

              setFilter(filterMrkts)
            }}
            onClear={() => setFilter()}
          />
        </div>
        {markets ? (
          markets.length == 0 ? (
            <p class="text-center text-gray-400 mt-10 border py-5">
              No markets fond
            </p>
          ) : (
            (filter || markets)
              .sort((a, b) => b.diff - a.diff)
              .map((_, k) => {
                var ex_low = exchanges().filter((d) => d.id == _.low.exchange)[0]
                var ex_high = exchanges().filter((d) => d.id == _.high.exchange)[0]
                var profit_perc =
                  (_.diff * 100) / _.low.price -
                  (ex_low.takerFee + ex_high.takerFee)

                var premium =
                  profit_perc > 8
                    ? 'bg-gradient-to-r from-indigo-300 via-red-100 to-yellow-50'
                    : ''
                var hasOtherExch = Object.keys(_?.otherExch).length != 0
                return (
                  <>
                    <div
                      key={k}
                      class={`${premium} bg-white border my-5 flex justify-around items-center shadow-lg shadow-blue-100 border-blue-200 ListItemRowContainer`}
                    >
                      {(_.low.exchange == 'wazirx' &&
                        _.high.exchange == 'binance') ||
                      (_.high.exchange == 'wazirx' &&
                        _.low.exchange == 'binance') ? (
                        <span class="material-symbols-outlined text-yellow-500 mx-4">
                          magic_button
                        </span>
                      ) : (
                        <span class="material-symbols-outlined mx-4">
                          currency_exchange
                        </span>
                      )}
                      <div class="flex-1">
                        <h1 class="text-xl text-left tracking-[.25em]">
                          {_.pair}
                        </h1>
                      </div>

                      <div
                        class={`flex ${
                          !premium &&
                          'bg-gradient-to-r from-red-100 via-red-50 to-white'
                        } p-4 mr-10`}
                      >
                        <div>
                          <img src={ex_low.logo} />
                        </div>
                        {/* <p>{_.low.exchange}</p> */}
                        <p class="rounded-2xl ml-2">
                          {_.low.price} <sup class="xs">USDT</sup>
                        </p>
                        <p class="ml-5 text-red-400 rounded-2xl">BUY</p>
                      </div>

                      <div
                        class={`flex ${
                          !premium &&
                          'bg-gradient-to-r from-green-100 via-green-50 to-white'
                        } p-4 mr-10`}
                      >
                        <div>
                          <img src={ex_high.logo} />
                        </div>
                        {/* <p>{_.low.exchange}</p> */}
                        <p class="rounded-2xl ml-2">
                          {_.high.price} <sup class="xs">USDT</sup>
                        </p>
                        <p class="ml-5 text-green-400 rounded-2xl">SELL</p>
                      </div>

                      <div class="px-5 hideOnHover">
                        <p class="text-sm font-bold">
                          <span class="text-sm font-normal text-gray-500">
                            Price Diffrence :{' '}
                          </span>
                          {_.diff}
                        </p>
                        <p class="text-sm font-bold">
                          <span class="text-sm font-normal text-gray-500">
                            Profit :{' '}
                          </span>
                          {profit_perc.toFixed(2)}%
                        </p>

                        {_?.invest && (
                          <p class="text-sm font-bold">
                            <span class="text-sm font-normal text-green-500">
                              Returns :{' '}
                            </span>
                            {(
                              parseFloat(_.invest) +
                              (parseFloat(_.invest) * parseFloat(profit_perc)) /
                                100
                            ).toFixed(2)}
                          </p>
                        )}
                      </div>
                  
                      {/* Tade now button */}
                      <button
                        className="goToTradeButton"
                        // class="bg-yellow-500 text-white myClassTwo"
                        onClick={() =>
                          router.push({
                            pathname: '/CreateBot',
                            query: {
                              exchange1: _.low.exchange,
                              exchange2: _.high.exchange,
                              market: _.pair,
                            },
                          })
                        }
                      >
                        Trade Now
                        <span class="material-symbols-outlined rotate-90 mx-2 ">
                          straight
                        </span>
                      </button>
                    </div>
                    {hasOtherExch && <ViewMore data={_?.otherExch} />}
                  </>
                )
              })
          )
        ) : (
          <>
            <p class="text-center text-gray-400 mt-10">Looking markets ...</p>
            <div
              style={{
                width: 200,
                height: 200,
                margin: 'auto',
                overflow: 'hidden',
              }}
            >
              <img
                className="lodaing"
                src="https://firstaidtamworth.com.au/wp-content/themes/business-gravity-pro-premium/assets/images/placeholder/kt-loader-2.gif"
              />
            </div>
          </>
        )}

        <button
          class="bg-blue-600 text-white p-3 flex hover:bg-blue-500  hover:scale-105"
          onClick={() => {
            router.push('CreateBot')
          }}
        >
          Create Bot Now
        </button>
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
