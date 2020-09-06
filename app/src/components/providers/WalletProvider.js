import React, { createContext, useReducer, useMemo } from 'react'

const UPDATE_TYPES = {
  SET_WALLET_TYPE: 'SET_WALLET_TYPE',
  SET_WALLET: 'SET_WALLET'
}

const initialState = {
  walletType: null,
  wallet: null,
  address: null,
  provider: null
}

const reducer = (state, action) => {
  switch(action.type) {
    case UPDATE_TYPES.SET_WALLET:
      console.log(`reducin ${action.payload.address}`)
      return {
        ...state,
        walletType: action.payload.walletType,
        wallet: action.payload.wallet,
        address: action.payload.address,
        provider: action.payload.provider,
        algernonInstance: action.payload.algernonInstance
      }
    default:
      return state
  }
}

export const WalletContext = createContext(null)

export default ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(`state inside provider ${state && state.address}`)
  const contextValue = useMemo(() => {
    return {
      ...state,
      setWallet: ({ walletType, wallet, address, algernonInstance, provider }) => dispatch({type: UPDATE_TYPES.SET_WALLET, payload: { walletType, wallet, address, algernonInstance, provider }})
    };
  }, [state, dispatch]);

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}