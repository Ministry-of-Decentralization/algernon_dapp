import React, {useEffect, useState} from 'react'
import  { web3 } from '../../utils/web3'

export default () => {
  const [account, setAccount] = useState(null)

  const getAccounts = async () => {
    const accounts = await web3.eth.getAccounts()
    accounts[0] && setAccount(accounts[0].toString())
  }

  useEffect(() => {
    getAccounts()
  }, [null])

  return account
}