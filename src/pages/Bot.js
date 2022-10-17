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
var trades = [{
    "user_id": "user_4384",
    "entryPrice": 0.24,
    "entryTime": "12/15/2022 01:05:22",
    "exitPrice": 0.28,
    "exitTime": "12/15/2022 02:05:22",
    "invest": 12,
    "symbol": "BTC/USDT",
    "place_order": false
},
{
  "user_id": "user_4384",
  "entryPrice": 0.21,
  "entryTime": "12/15/2022 03:05:22",
  "exitPrice": 0.20,
  "exitTime": "12/15/2022 03:05:22",
  "invest": 12,
  "symbol": "BTC/USDT",
  "place_order": false
},
{
  "user_id": "user_4384",
  "entryPrice": 0.24,
  "entryTime": "12/15/2022 03:05:22",
  "exitPrice": 0.26,
  "exitTime": "12/15/2022 04:05:22",
  "invest": 12,
  "symbol": "BTC/USDT",
  "place_order": false
},
{
  "user_id": "user_4384",
  "entryPrice": 0.22,
  "entryTime": "12/15/2022 04:05:22",
  "exitPrice": 0.24,
  "exitTime": "12/15/2022 05:55:22",
  "invest": 12,
  "symbol": "BTC/USDT",
  "place_order": false
},
]

export default function App() {
  const [show, setShow] = useState(false)
  

  const chart_config ={
    // "autosize": true,
    "symbol":  "BINANCE:BTCUSDT",
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

  return (
    <>
      <Header />
      <div class="flex p-4">
        <AdvancedRealTimeChart {...chart_config} />
        <div class='p-4'>
          <p class="flex items-center">
        <span class="material-symbols-outlined mr-4">
history
</span>
          <h4 class="text-lg font-bold">  Trade History</h4>
          </p>
        {trades.map(_=>{
          var profit = (_['invest']/_['entryPrice']) - (_['invest']/_['exitPrice'])
          var color = profit < 0 ? 'text-red-600' : 'text-green-600'

// "user_id": "user_4384",
// "entryPrice": 0.24,
// "entryTime": "12/15/2022 01:05:22",
// "exitPrice": 0.3,
// "exitTime": "12/15/2022 02:05:22",
// "invest": 12,
// "symbol": "BTC/USDT",
// "place_order": false

          return <div class="p-2 m-2 shadow-xl rounded-lg">
           <p class={color+' font-bold'}> Profit : {(_['invest']/_['entryPrice']) - (_['invest']/_['exitPrice'])}</p>
           <p class="text-sm">{_['symbol']}</p>
           <p class="text-sm">{_['entryTime']} - {_['entryTime']}</p>
           <p class="text-sm">Entry price : {_['entryPrice']} Exit price : {_['exitPrice']}</p>
          </div>
        })}
        </div>
      </div>
    </>
  )
}
