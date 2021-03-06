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
  setClient({client}) 
}
const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const contextValue = useMemo(() => {
    return {
      ...state,
      setClient: ({ client }) => dispatch({type: UPDATE_TYPES.SET_CLIENT, payload: { client }})
    };
  }, [state, dispatch]);

  useEffect(() => {
    initClient(contextValue.setClient)
  },[])

  return (
    <FileStoreContext.Provider value={contextValue}>
      {children}
    </FileStoreContext.Provider>
  )
}

export default Provider