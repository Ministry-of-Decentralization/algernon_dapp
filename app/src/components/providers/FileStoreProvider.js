import React, { createContext, useReducer, useEffect, useMemo } from 'react'
import initIpfs from '../../fileStorage/ipfs'

const UPDATE_TYPES = {
  SET_CLIENT: 'SET_CLIENT'
}

const initialState = {
  client: null
}

const reducer = (state, action) => {
  switch(action.type) {
    case UPDATE_TYPES.SET_CLIENT:
      console.log(`reducin ${action.payload.address}`)
      return {
        ...state,
        client: action.payload.client
      }
    default:
      return state
  }
}

export const FileStoreContext = createContext(null)

const initClient = async (setClient) => {
  const client = await initIpfs()
  console.log(`inited client ${client}`)
  setClient({client}) 
}
const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(`state inside filestore provider ${state.client}`)

  const contextValue = useMemo(() => {
    return {
      ...state,
      setClient: ({ client }) => dispatch({type: UPDATE_TYPES.SET_CLIENT, payload: { client }})
    };
  }, [state, dispatch]);

  useEffect(() => {
    initClient(contextValue.setClient)
  })

  return (
    <FileStoreContext.Provider value={contextValue}>
      {children}
    </FileStoreContext.Provider>
  )
}

export default Provider