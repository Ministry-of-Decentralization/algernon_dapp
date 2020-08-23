import React, {useState, useMemo} from 'react'
import throttle from 'lodash/throttle';


export default (fetchList) => {
  const [state, setState] = useState({list: [], loading: false, input: ''})

  const fetch = useMemo(
    () =>
      throttle(async (input) => {
        setState({...state, loadging: true})
        console.log(`getting list ${input}`)
        const response = await fetchList(input);
        setState({...state, loading: false, list: [...state.list, ...response.data.tags]})
      }, 200),
    [],
  );

  return [state.loading, state.list, fetch]
}