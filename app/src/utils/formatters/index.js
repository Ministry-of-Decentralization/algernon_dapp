import React from 'react'

export const getTopicSelectRenderValues = options => vals => {
  return vals.map(v => <div>{options.find(o => o.value === v).label}</div>)
}