import React from "react";
// import TradingViewWidget, { Themes } from "react-ts-tradingview-widgets";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { SymbolInfo } from "react-ts-tradingview-widgets";



export default function TradingView() {

    const config ={
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
  return (
    <div style={{}}>
        <div >
{/* <SymbolInfo {...config} ></SymbolInfo> */}
<AdvancedRealTimeChart {...config} />
        </div>
        <div style={{backgroundColor: '#fff'}}>hi</div>
    </div>
  );
}
