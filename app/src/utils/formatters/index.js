import React from 'react'
import BigNumber from "bignumber.js";

export const getTopicSelectRenderValues = options => vals => {
  return vals.map(v => <div>{options.find(o => o.value === v).label}</div>)
}

export const nativeToDisplayBalance = (balance, decimals = 18, displayDecimals = 4) => {
  return new BigNumber(balance).dividedBy(10 ** decimals).toFixed(displayDecimals)
}

export const displayToNativeBalance = (balance, decimals = 18) => {
  return new BigNumber(balance).multipliedBy(10 ** decimals).toFixed()
}