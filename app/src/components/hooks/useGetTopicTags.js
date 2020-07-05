import React, {useEffect, useReducer} from 'react'
import  { algernonContract } from '../../utils/web3'
import useGetTags from './useGetTags'
import { fetchTag } from '../../utils/blockQueries'

const topicTagsReducer = (state, action) => {
  console.log('topics reducer update ', state, action)
  const newState = [...state]
  newState[action.id] = action.tagIds
  return newState
}

export default (ids, forceFetchIds = []) => {
  const [topicTags, dispatch] = useReducer(topicTagsReducer, [])

  const getTopicTags = async (id) => {
    const tagIds = await algernonContract.methods.getTopicTagIds(id).call()
    const tags = await Promise.all(tagIds.map(fetchTag))
    dispatch({ id, tags})
  }

  useEffect(() => {
    ids//.filter(id => !topics[id])// && !forceFetchIds.includes(id))
    .forEach(getTopicTags)
  }, [null])
  return ids.map(id => topicTags[id] || 'loading')
}