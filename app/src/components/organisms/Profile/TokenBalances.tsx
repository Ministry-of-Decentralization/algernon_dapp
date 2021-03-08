import React from 'react'
import config from '../../../config'
import Box from '../../atoms/Box'
import DepositTokensForm from '../forms/DepositTokens'

const TokenBalances = ({user, connectedAddress, algerTokenInstance, to, refetchUser}: any) => (
  <Box flexDirection='column'>
    <h4>ALG Token Balances</h4>
    <Box>
      ALG Contract Address: {config.algerTokenAddress}
    </Box>
    <Box flexDirection='column'>
      Wallet: {user.undepositedBalanceDisplay}
      { algerTokenInstance && to && <DepositTokensForm connectedAddress={connectedAddress} algerTokenInstance={algerTokenInstance} to={to} onComplete={refetchUser} /> }
    </Box>
    <Box>
      Algernon Staked: {user.stakedBalanceDisplay}
    </Box>
    <Box>
      Algernon Unstaked: {user.unstakedBalanceDisplay}
    </Box>
  </Box>
)

export default TokenBalances