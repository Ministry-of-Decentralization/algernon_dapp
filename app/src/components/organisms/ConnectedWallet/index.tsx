import React, { useContext } from 'react'
import Box from '../../atoms/Box'
import { WalletContext } from '../../providers/WalletProvider'
import SelectWallet from '../forms/SelectWallet'
import Address from '../../atoms/Address'

export default ({style}: any) => {
  // @ts-ignore
  const { wallet, setWallet, address } = useContext(WalletContext)
  // @ts-ignore
  const status = wallet ? <Address address={address} length={6} /> : <SelectWallet setWallet={setWallet} />
  return (
    <Box style={style}>
      {status}
    </Box>
  )
}