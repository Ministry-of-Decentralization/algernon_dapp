import React, {createContext, useReducer} from 'react';

const initialState = {
  connectedAddress: null,
  chainId: null,
  algernonContract: null,
  unlockedAlgernonContract: null
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'WEB3_CONNECTION_UPDATE':
        return {...state, ...action.payload}
      default:
        console.log(`Cannot handle update type ${action.type}`)
        return state
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }