import React, {useEffect, useReducer} from 'react'
import  { algernonContract, ipfs } from '../../utils/web3'

const topicsReducer = (state, action) => {
  console.log('topics reducer update ', state, action)
  const newState = [...state]
  newState[action.index] = action.topic
  return newState
}

export default (ids, forceFetchIds = []) => {
  const [topics, dispatch] = useReducer(topicsReducer, [])

  const getTopic = async (id) => {
    const topic = await algernonContract.methods.getTopic(id).call()
    const content = await ipfs.getFile(topic["0"])
    console.log('got topic content', content)
    const asciiContent = content //JSON.parse(storage.fileToAscii(content))
    dispatch({ index: id, topic: {...topic,  ...asciiContent, id, owner: topic.owner.toString('hex')}})
  }

  useEffect(() => {
    ids//.filter(id => !topics[id])// && !forceFetchIds.includes(id))
    .forEach(getTopic)
  }, [null])
  return ids.map(id => topics[id] || 'loading')
}