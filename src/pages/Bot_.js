import { useEffect, useState } from 'react'
import { DropDown, Input, Header, TradingView } from '../components'
import { useContext } from 'react'
import DataContext from '../store/DataContext'
import { useRouter } from 'next/router'
import exchanges_list, { getExchange } from '../global/exchanges'
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";



import { BinanceClient } from 'ccxws'
import Config from '../global/config'
// import Chart from '../components/Chart'
import axios from 'axios'
// import net from 'net'

export default function App() {
  const [show, setShow] = useState(false)
  const [exchanges, setExchanges] = useState(['_'])
  const router = useRouter()

  const [response, setResponse] = useState(0)
  const [bot, setBot] = useState()

  const [calcs, setCalcs] = useState()
  const [timer, setTimer] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const [play, setPlay] = useState(true)

  const bot_storage_key = 'bots_test'


  const chart_config ={
    // "autosize": true,
    "symbol": "NASDAQ:AAPL",
    "interval": "15",
    "timezone": "Etc/UTC",
    "theme": "light",
    "style": "1",
    "locale": "in",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "allow_symbol_change": true,
    "hide_side_toolbar" : true,
    "studies": [
        // "ROC@tv-basicstudies",
        // "StochasticRSI@tv-basicstudies",
        "MASimple@tv-basicstudies"
      ],
    // "container_id": "tradingview_7a860"
}


  async function updateDevicePosition() {
    var bts = localStorage.getItem(bot_storage_key)
    var bot_ = JSON.parse(bts)?.bots[0]

    console.log('REFRESHING', bot_?.market1?.symbol)

    var url = `${Config.api_url}/crypto/fetchOHLCV?market=${bot_?.market1?.symbol}&exchange1=${bot_?.exchange1.id}&exchange2=${bot_?.exchange2.id}`
   
    axios.get(url).then(function (response) {
      // console.log(bot_?.market1?.symbol, bot_?.market2?.symbol, response)
      setResponse(response.data)
    }).catch((err)=>console.log('CATCH ', err))

    clearTimeout(timer)
    setTimer(setTimeout(updateDevicePosition, 5000))
  }

  useEffect(() => {
    if (!isMounted) {
      updateDevicePosition()
      setIsMounted(true)
    }
  })

  useEffect(() => {
    if (bot) analyse()
  }, [response])

  useEffect(() => {
    var bts = localStorage.getItem(bot_storage_key)
    var bot_ = JSON.parse(bts)
    if (bot_) setBot(bot_.bots[0])
  }, [])

  // console.log(bot?.market1?.symbol, bot?.market2?.symbol, '////', response.data)

  function analyse() {
    var ex_1_fee =
      (bot.tradeAmount * getExchange(bot?.exchange1.id).takerFee) / 100
    // var ex_2_fee = (bot.tradeAmount * getExchange(bot?.exchange2.id).fee.sell) / 100;

    if (response != 0) {
      var priceDiff =
        parseFloat(response.data.pair1[0][4]) -
        parseFloat(response.data.pair2[0][4])
      var profit = Math.abs(
        priceDiff * (bot.tradeAmount / response.data.pair1[0][4]),
      ).toFixed(3)

      // check match condition
      var prof_perc = (bot.tradeAmount * bot.profitPercentage) / 100

      setCalcs({
        priceDiff,
        profit: profit - calcs?.fee_sell,
        // profit: priceDiff < 0 ? '0.00' : profit,
        loss: priceDiff < 0 ? profit : '0.00',
        prof_perc: prof_perc,
        fee_buy: ex_1_fee,
        fee_sell: ex_1_fee,
      })
    }
  }
  const ctx = useContext(DataContext)
  // console.log('====', ctx)
  return (
    <>
      <Header />

      <div class="px-40 py-10">
        <div>
          <div class="flex justify-between mb-2">
            <h1 class="text-3xl">My Bots</h1>
            <button
              class="bg-blue-600 text-white p-3 flex hover:bg-blue-500  hover:scale-105"
              onClick={() => {
                // ctx.setBotName({name: 'new new name'})
                router.push('CreateBot')
              }}
            >
              Create New Bot
              <span class="material-symbols-outlined ml-3">add</span>
            </button>
          </div>

          {/* {bot && */}
          {/* bot.map((_, k) => { */}
          {/* return ( */}
               
          {bot ? (
            <div class="bg-white p-10 shadow-2xl  mb-10  shadow-blue-300">
              <div class="flex justify-between border-b pb-5">
                <div>
                  <p class="font-bold text-lg mb-2">{bot?.name}</p>
                  <p class="text-sm">
                    Bot will buy or sell when profit or loss meet{' '}
                    {calcs?.prof_perc} <sup>USDT</sup>
                    {` (${bot?.profitPercentage}%)`}{' '}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      localStorage.removeItem(bot_storage_key)
                      setBot()
                    }}
                  >
                    <span class="material-symbols-outlined ml-3 text-3xl text-red-500">
                      delete
                    </span>
                  </button>
                  {play ? (
                    <button onClick={() => setPlay(!play)}>
                      <span class="material-symbols-outlined ml-3 text-4xl text-blue-600">
                        pause
                      </span>
                    </button>
                  ) : (
                    <button onClick={() => setPlay(!play)}>
                      <span class="material-symbols-outlined ml-3 text-4xl ">
                        play_arrow
                      </span>
                    </button>
                  )}
                </div>
              </div>

              <div class="flex justify-around mt-4">
                <p class="flex font-bold text-lg mb-4 bg-gray-200 px-20 p-2 rounded">
                  <span class="material-symbols-outlined mr-4 ">
                    currency_exchange
                  </span>
                  {bot?.exchange1?.id}
                </p>

                <span class="material-symbols-outlined text-4xl text-blue-600">
                  swap_horiz
                </span>

                <p class="flex font-bold text-lg mb-4 bg-gray-200 px-20 p-2 rounded">
                  <span class="material-symbols-outlined mr-4">
                    currency_exchange
                  </span>
                  {bot?.exchange2?.id}
                </p>
              </div>

              <div class="flex justify-around">
                <div class="text-center">
                  <p class="font-thin text-2xl text-gray-400">
                    {bot?.market1?.symbol}
                  </p>
                  <p class="font-thin text-2xl text-gray-400">
                    {response?.data && response.data.pair1[0][4]}
                  </p>
                </div>

                <div class="text-center">
                  <p class="font-thin text-2xl text-gray-400">
                    {bot?.market2?.symbol}
                  </p>
                  <p class="font-thin text-2xl text-gray-400 mr-auto">
                    {response?.data && response.data.pair2[0][4]}
                  </p>
                </div>
              </div>

              {calcs ? (
                <div class="flex justify-between border-b p-4">
                  <div>
                    <p class="font-thin text-xl text-gray-500">Invested</p>
                    <p class="font-thin text-5xl text-yellow-500">
                      {bot?.tradeAmount}
                      <span class="text-sm">USDT</span>
                    </p>
                  </div>

                  <div class="text-center">
                    {/* <span class="material-symbols-outlined">
                    unfold_less_double
                  </span> */}
                    <p>fee : {calcs?.fee_sell}</p>
                    <p class="text-xs">Price diffrence</p>
                    <p class="bg-yellow-300 p-2 px-5 rounded-3xl text-sm">
                      {Math.abs(calcs?.priceDiff).toFixed(5)}
                      <sup> USDT</sup>
                    </p>
                  </div>

                  <div>
                    <p class="font-thin text-xl text-gray-500">Profit</p>
                    <p class="font-thin text-5xl text-green-500">
                      {calcs?.profit.toFixed(3)}
                      <span class="text-sm">USDT</span>
                    </p>
                  </div>

                  {/* <div>
                    <p class="font-thin text-xl text-gray-500">On buy profilt</p>
                    <p class="font-thin text-5xl text-red-500">
                      {calcs?.loss}
                      <span class="text-sm">USDT</span>
                    </p>
                  </div> */}
                </div>
              ) : (
                <p class="text-center text-gray-400 mt-10 text-4xl font-thin my-8">
                  Processing
                </p>
              )}
              <div class="bg-white ">
                {/* <div style={{ height: 500 }}>
                  {bot && (
                    <TradingViewWidget
                      // symbol="BINANCE:DOGEUSDT"
                      // symbol={`BINANCE:${bot.pair.replace('/','')}`}
                      symbol={`BINANCE:${bot?.market2.id}`}
                      theme={Themes.LIGHT}
                      locale="en"
                      autosize
                    />
                  )}
                </div>
                     <div class="flex justify-center items-center p-10">
                    <TechnicalAnalysis
                      symbol={'BINANCE:DOGEUSDT'}
                      dark
                      locale="en"
                    />
                  </div> */}
              </div>

              <div class="flex justify-between mt-4">
                <span class="material-symbols-outlined ml-3">info</span>
                <p class="font-thin text-xs text-gray-600 ml-5">
                  The Inter-exchange Arbitrage bot buys low on one exchange and
                  sells high on the other. This bot does not re-balance the
                  wallet. Eventually, the wallet needs manual re-balancing for
                  the bot to continue. Only use this with small trade amounts.
                  Please ensure you fully understand the concept of this bot
                  before using it.
                </p>
              </div>
            </div>
          ) : (
            <p class="text-center text-gray-400 mt-10">
              No bots yet! create one
            </p>
          )}
          {/* )
            })} */}
        </div>

        {/* <TradingView/> */}
        {/* <Chart/> */}
        {/* <AdvancedRealTimeChart {...chart_config} /> */}
      </div>
    </>
  )
}
