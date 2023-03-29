import React, { Component, useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinChart = ({ symbol, market }) => {
  const [histData, setHistData] = useState(null);
  const getCoinHist = async () => {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&limit=30&api_key=` +
        API_KEY
    );
    const json = await response.json();
    setHistData(json.Data.Data);
  };
  const cleanData = (data) => {
    let filteredData = [];
    let countDays = 0;
    for (const item of data) {
      let accurateTime = new Date(item.time).toLocaleTimeString("en-US");
      let accurateDay = new Date();
      accurateDay.setDate(accurateDay.getDate() - countDays);

      filteredData.push({
        time: accurateDay.toLocaleDateString("en-US") + " " + accurateTime,
        "open price": item.open,
      });
      countDays++;
    }

    // data is given counting backwards, so return the reverse to have data ordered from oldest to newest for accurate plotting
    return filteredData.reverse();
  };
  useEffect(() => {
    getCoinHist().catch(console.error);
  }, []);
  return (
    <div>
      {histData ? ( // rendering only if API call actually returned us data
        <div></div>
      ) : null}
    </div>
  );
};

export default CoinChart;
