import React, { useState } from 'react'
import { getBlockAndTransactions, getLogs, getTxReceipt } from './blockListener'

const BlockExplorer = ({}) => {

  const [state, setState] = useState({address: '', fromBlock: '', toBlock: '', block: '', txHash: ''})

  const update = (field) => (e) => {
    console.log(`updating ${field} state ${e.target.value}`)
    setState({...state, [field]:e.target.value})
  }

  const getBlock = () => getBlockAndTransactions(state.block)
  const goGetLogs = () => getLogs({...state})
  const goGetTxReceipt = () => getTxReceipt(state.txHash)

  return (
    <div>
      <div>
        Block Hash or Height
        <input type="text" value={state.block} onChange={update('block')} />
        <input type="button" onClick={getBlock} value="get block" />
      </div>
      <div>
        Contract Address
        <input type="text" value={state.address} onChange={update('address')} />
        From Block
        <input type="text" value={state.fromBlock} onChange={update('fromBlock')} />
        To Block
        <input type="text" value={state.toBlock} onChange={update('toBlock')} />
        <input type="button" onClick={goGetLogs} value="get logs" />
      </div>
      <div>
        Get Transaction by Hash
        <input type="text" value={state.txHash} onChange={update('txHash')} />
        <input type="button" onClick={goGetTxReceipt} value="get tx" />
      </div>
    </div>
  )
}

export default BlockExplorer