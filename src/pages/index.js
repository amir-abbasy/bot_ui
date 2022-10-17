import Home from './Home'
import Exchanges from './Exchanges'
import Bot from './Bot'
import CreateBot from './CreateBot'
import Login from './Login'
import CreateAccount from './CreateAccount'


import DataProvider from '../store/DataProvider'

export default function App() {

  return (
    <DataProvider>
      <Login />
    </DataProvider>
  )
}
