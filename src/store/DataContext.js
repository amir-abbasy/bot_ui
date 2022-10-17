import { useState, createContext } from 'react'

const DataContext = createContext({
  account: null,
  networkId: null,
  setBotName: () => {},
  createBot: () => {},
  bots: null
})
export default DataContext
