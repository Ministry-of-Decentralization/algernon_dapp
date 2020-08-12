import React, { createContext, useReducer, useMemo } from 'react'

const WALLET_TYPES = {
  METAMASK: 'METAMASK',
  FORTMATIC: 'FORTMATIC'
}

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
    case UPDATE_TYPES.SET_WALLET_TYPE:
      return {
        ...state,
        walletType: action.payload.walletType
      }
    case UPDATE_TYPES.SET_WALLET:
      return {
        ...state,
        wallet: action.payload.wallet
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
      setWalletType: (walletType) => dispatch({type: UPDATE_TYPES.SET_WALLET_TYPE, payload: {walletType}}),
      setWallet: (wallet) => dispatch({type: UPDATE_TYPES.SET_WALLET, payload: {wallet}})
    };
  }, [state, dispatch]);

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}