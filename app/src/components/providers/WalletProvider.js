import React, { createContext, useReducer, useMemo } from 'react'
import wallets from '../../utils/wallets'

const UPDATE_TYPES = {
  SET_WALLET_TYPE: 'SET_WALLET_TYPE',
  SET_WALLET: 'SET_WALLET'
}

const initialState = {
  walletType: null,
  wallet: null
}

const reducer = (state, action) => {
  switch(action.type) {
    case UPDATE_TYPES.SET_WALLET:
      return {
        ...state,
        walletType: action.payload.walletType,
        wallet: wallets[action.payload.walletType].connectWallet()
      }
    default:
      return state
  }
}

export const WalletContext = createContext(null)

export default ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const contextValue = useMemo(() => {
    return {
      wallet: state,
      setWallet: (walletType) => dispatch({type: UPDATE_TYPES.SET_WALLET, payload: {walletType}}),
    };
  }, [state, dispatch]);

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}