const exchanges = () => {
  return [
    {
      id: 'binance',
      name: 'Binance',
      logo:
        'https://user-images.githubusercontent.com/1294454/29604020-d5483cdc-87ee-11e7-94c7-d1a8d9169293.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.1,
    },
    {
      id: 'ftx',
      name: 'FTX',
      logo:
        'https://user-images.githubusercontent.com/1294454/67149189-df896480-f2b0-11e9-8816-41593e17f9ec.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.07,
    },
    {
      id: 'bitmart',
      name: 'BitMart',
      logo:
        'https://user-images.githubusercontent.com/1294454/129991357-8f47464b-d0f4-41d6-8a82-34122f0d1398.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.25,
    },
    {
      id: 'huobi',
      name: 'Huobi',
      logo:
        'https://user-images.githubusercontent.com/1294454/76137448-22748a80-604e-11ea-8069-6e389271911d.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.099,
    },
    {
      id: 'gate',
      name: 'Gate.io',
      logo:
        'https://user-images.githubusercontent.com/1294454/31784029-0313c702-b509-11e7-9ccc-bc0da6a0e435.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.2,

    },
    {
      id: 'wazirx',
      name: 'Wazirx',
      logo:
        'https://user-images.githubusercontent.com/1294454/148647666-c109c20b-f8ac-472f-91c3-5f658cb90f49.jpeg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.02,
    },
    {
      id: 'coinbase',
      name: 'Coinbase',
      logo:
        'https://user-images.githubusercontent.com/1294454/40811661-b6eceae2-653a-11e8-829e-10bfadb078cf.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.6,

    },
    {
      id: 'coinbasepro',
      name: 'Coinbase Pro',
      logo:
        'https://user-images.githubusercontent.com/1294454/41764625-63b7ffde-760a-11e8-996d-a6328fa9347a.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.6,
    },
    {
      id: 'kucoin',
      name: 'KuCoin',
      logo:
        'https://user-images.githubusercontent.com/51840849/87295558-132aaf80-c50e-11ea-9801-a2fb0c57c799.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.1,
    },
    {
      id: 'mexc',
      name: 'MEXC Global',
      logo:
        'https://user-images.githubusercontent.com/1294454/137283979-8b2a818d-8633-461b-bfca-de89e8c446b2.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.2,
    },
    {
      id: 'coinex',
      name: '	CoinEx',
      logo:
        'https://user-images.githubusercontent.com/51840849/87182089-1e05fa00-c2ec-11ea-8da9-cc73b45abbbc.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.2,
    },
    {
      id: 'cryptocom',
      name: '	Crypto.com',
      logo:
        'https://user-images.githubusercontent.com/1294454/147792121-38ed5e36-c229-48d6-b49a-48d05fc19ed4.jpeg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.4,
    },
    {
      id: 'ascendex',
      name: '	AscendEX',
      logo:
        'https://user-images.githubusercontent.com/1294454/112027508-47984600-8b48-11eb-9e17-d26459cc36c6.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.2,
    },
    {
      id: 'bybit',
      name: '	Bybit',
      logo:
        'https://user-images.githubusercontent.com/51840849/76547799-daff5b80-649e-11ea-87fb-3be9bac08954.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.1,
    },
    {
      id: 'bitmex',
      name: 'BitMEX',
      logo:
        'https://user-images.githubusercontent.com/1294454/27766319-f653c6e6-5ed4-11e7-933d-f0bc3699ae8f.jpg',
      ver: 1,
      certified: true,
      pro: false,
      takerFee: 0.1,
    }
  ]
}

export default exchanges

export const getExchange = (id) => {
  var exchange = exchanges().filter((ex, key) => ex.id == id)
  return exchange[0]
}
