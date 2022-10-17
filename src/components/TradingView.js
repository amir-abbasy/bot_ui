// import './styles.css'
import { useState, useEffect } from 'react'
// import TradingViewWidget, { Themes } from 'react-tradingview-widget'
// import TechnicalAnalysis, {
//   THEMES,
//   INTERVALS,
// } from 'react-tradingview-technical-analysis'
// import { MarketOverview, TechnicalAnalysis } from 'react-ts-tradingview-widgets'

function Graph() {
  return (
    <div className="App">
      <div style={{ height: 500 }}>
        <TradingViewWidget
          symbol="NASDAQ:AAPL"
          theme={Themes.LIGHT}
          locale="es"
          autosize
        />
      </div>
      {/* <TechnicalAnalysis symbol={'NASDAQ:AAPL'} dark locale="es" /> */}
      {/* <MarketOverview locale="es" /> */}
    </div>
  )
}



const App = () => {
  const [val, setVal] = useState()
  useEffect(() => {
    const isBrowser = typeof(window) !== 'undefined'
    if (isBrowser) {
        setVal(true)
      console.log('red')
    }
  }, [])

  return (
    <>
      <div>
        <p>sd</p>
        {val && <Graph />}
      </div>
    </>
  )
}

export default App
