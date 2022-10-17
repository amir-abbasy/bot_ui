// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use strict'
const ccxt = require('ccxt')

export default async function handler(req, res) {
  const {
    query: { pair },
  } = req

  // let binance = new ccxt.binance()
  // let data_binance = await binance.fetchTrades(pair || 'ETH/USDT')

  // let test = await huobi.loadMarket()

  // handle level2 orderbook snapshots

  res.status(200).json({name: new Date().getTime().toString()})
//   res.status(200).json(data_huobi)
}
