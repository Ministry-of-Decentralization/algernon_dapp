import React, { useContext } from 'react'
import Box from '../../atoms/Box'
import { WalletContext } from '../../providers/WalletProvider'

export default ({style}: any) => {
  const connectedWallet = useContext(WalletContext)
  // @ts-ignore
  const status = connectedWallet.wallet.wallet ? 'Hot Dog' : 'Not Hot Dog'
   // @ts-ignore
  console.log(`Connected wallet ${JSON.stringify(connectedWallet.wallet, null, 2)}`)
  return (
    <Box style={style}>
      {status}
    </Box>
  )
}