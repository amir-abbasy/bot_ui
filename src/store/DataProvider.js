import { useReducer } from 'react'
import DataContext from './DataContext'

var STORAGE_KEY = 'test3',
  STORAGE_BOT = 'botstest'
let defaultDataState = {
  account: null,
  networkId: null,
  bots: [],
}

// if (typeof window !== 'undefined') {
//   if (localStorage.getItem(STORAGE_KEY) === null) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDataState))
//   }
//   defaultDataState = localStorage.getItem(STORAGE_KEY)
// }

const dataReducer = (state, action) => {
  if (action.type === 'CREATE_BOT') {
    // return {
    //   account: action.account,
    //   networkId: state.networkId,
    // }
    // var sta = JSON.parse(state)
    var newState = { ...state, bots: [...state.bots, action.payload] }
    localStorage.setItem(STORAGE_BOT, JSON.stringify(newState))
    console.log('==', newState)

    return newState
  }

  if (action.type === 'LOGOUT') {
    return {
      account: action.payload.name,
      networkId: null,
    }
  }

  return defaultDataState
}

const DataProvider = (props) => {
  const [state, dispatch] = useReducer(dataReducer, defaultDataState)

  const setBotNameHandler = async (vals) => {
    // dispatch({ type: 'LOGOUT', payload: vals })
  }

  const createBotHandler = async (vals) => {
    console.log(vals);
    dispatch({ type: 'CREATE_BOT', payload: vals })
  }

  const dataContext = {
    account: state.account,
    networkId: state.networkId,
    setBotName: setBotNameHandler,
    createBot: createBotHandler,
    bots: state.bots,
  }

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  )
}

export default DataProvider
