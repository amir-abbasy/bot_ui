import { useContext, useEffect, useState } from 'react'
import ccxt from 'ccxt'
import { DropDown, Input, Header, Alert } from '../components'
import exchanges from '../global/exchanges'
import DataContext from '../store/DataContext'
import { useRouter } from 'next/router'

export default function CreateBot() {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({
    name: 'test bot',
    tradeAmount: '100',
    profitPercentage: '15',
  })
  const [alert, setAlert] = useState()

  const [market1exchanges, setMarket1exchanges] = useState([])
  const [market2exchanges, setMarket2exchanges] = useState([])

  const ctx = useContext(DataContext)
  const router = useRouter()
  const loadMarkets = async (exchange_, list) => {
    let mrkts = await new ccxt[exchange_.id]().fetchMarkets()

    // console.log("market length", mrkts.length);
    if (list == 'first')
      setMarket1exchanges(mrkts.filter((_) => _.quote == 'USDT'))
    if (list == 'second')
      setMarket2exchanges(mrkts.filter((_) => _.quote == 'USDT'))
  }

  useEffect(() => {
    // router.query,
    if (router.query?.exchange1) {
      const prams = {
        exchange1: {
          id: router.query?.exchange1,
        },
        market1: {
          id: router.query?.market.replace('/', ''),
          symbol: router.query?.market,
        },
        exchange2: {
          id: router.query?.exchange2,
        },
        market2: {
          id: router.query?.market.replace('/', ''),
          symbol: router.query?.market,
        },
      }
      setForm({ ...form, ...prams })
    }
  }, [])

  return (
    <>
      {alert && (
        <Alert {...alert} onClose={() => setAlert({ ...alert, show: false })} />
      )}
      <Header />

      <div class="px-40 py-10">
        <h1 class="text-3xl mt-10">Create Bot</h1>
        <div
          class={
            show ? 'hidden' : 'my-10 bg-white p-10 shadow-2xl shadow-blue-300'
          }
        >
          <Input
            placeholder={form?.name || 'name'}
            type="text"
            title="Bot Name"
            onChange={(val) => setForm({ ...form, name: val })}
          />
          <h1>First Market</h1>
          <DropDown
            class="w-2/5 my-5"
            placeholder={form?.exchange1?.id || 'Account'}
            title="Account"
            onChange={(val) => {
              setForm({ ...form, exchange1: val })
              loadMarkets(val, 'first')
            }}
            options={exchanges().filter(
              (_) => _.id == 'binance' || _.id == 'wazirx',
            )}
          />
          <DropDown
            class="w-2/5 my-5"
            placeholder={form?.market1?.symbol || 'Market'}
            title="Market"
            onChange={(val) => setForm({ ...form, market1: val })}
            options={market1exchanges}
          />
          <h1>Second Market</h1>
          <DropDown
            class="w-2/5 my-5"
            placeholder={form?.exchange2?.id || 'Account'}
            title="Account"
            onChange={(val) => {
              if (form?.exchange1?.id && val.id == form?.exchange1.id) {
                setAlert({
                  show: true,
                  title: 'Choose another exchange',
                  type: 'error',
                  message: val.id + ' already selected',
                })
              } else {
                setAlert()
              }
              setForm({ ...form, exchange2: val })
              loadMarkets(val, 'second')
            }}
            options={exchanges().filter(
              (_) => _.id == 'binance' || _.id == 'wazirx',
            )}
          />
          <DropDown
            class="w-2/5 my-5"
            placeholder={form?.market2?.symbol || 'Market'}
            title="Market"
            onChange={(val) => {
              if (
                form?.market1?.id &&
                val.id.toUpperCase() != form?.market1.id
              ) {
                setAlert({
                  show: true,
                  title: 'Pair can not be different',
                  type: 'error',
                  message: 'Pair must be ' + form.market1?.symbol,
                })
              } else {
                setAlert()
              }

              setForm({ ...form, market2: val })
            }}
            options={market2exchanges}
          />
          <Input
            placeholder={form?.tradeAmount || '100'}
            type="text"
            title="Trade Amount"
            onChange={(val) => setForm({ ...form, tradeAmount: val })}
          />
          <Input
            placeholder={form?.profitPercentage + '%' || '15%'}
            type="text"
            title="Profit"
            onChange={(val) => setForm({ ...form, profitPercentage: val })}
          />

          <button
            class="bg-blue-600 text-white p-3 flex my-10"
            onClick={() => {
              // if (form) ctx.createBot(form)
              // setAlert({
              //   show: true,
              //   title: 'Sorry!',
              //   type: 'warning',
              //   message: "Demo version can't add new Bot",
              // })
              if (!form?.market1 || !form?.market2) {
                setAlert({
                  show: true,
                  title: 'Submition Error!',
                  type: 'warning',
                  message: 'Fill all fields!',
                })
              } else {
                var STORAGE_BOT = 'bots_test'
                var bots = localStorage.getItem(STORAGE_BOT)

                if (bots) {
                  // bots = { bots: [...bots, form] }
                  // localStorage.setItem(STORAGE_BOT, JSON.stringify(bots))

                  // for demo
                  setAlert({
                    show: true,
                    title: 'Sorry!',
                    type: 'warning',
                    message: 'Demo version can only create one Bot',
                  })
                } else {
                  bots = { bots: [form] }
                  setAlert({
                    show: true,
                    title: 'Bot created',
                    type: 'success',
                    message: 'Bot successfully created',
                  })
                  localStorage.setItem(STORAGE_BOT, JSON.stringify(bots))
                }
                // console.log('==', bots)
                // router.push('/Bot')
              }
            }}
          >
            Create Bot
            {/* <span class="material-symbols-outlined ml-3">currency_exchange</span> */}
          </button>
        </div>
      </div>
    </>
  )
}
