import React, {useEffect, useReducer} from 'react'
import { fetchTag } from '../../utils/blockQueries'


const tagsReducer = (state, action) => {
  const newState = [...state]
  newState[action.index] = action.tag
  return newState
}

export default (ids) => {
  const [tags, dispatch] = useReducer(tagsReducer, [])

  const getTag = async (id) => {
    const tag = await fetchTag(id)
    dispatch({ index: id, tag })
  }

  useEffect(() => {
    ids.filter(id => !tags[id])
    .forEach(id => getTag(id))
  }, [null])
  return tags.filter((_, idx) => ids.includes(idx)).map(tag => tag)
}