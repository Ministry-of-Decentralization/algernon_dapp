import React from 'react'
import Paper from '../../atoms/Paper'
import { Link } from 'react-router-dom'
import { Topic } from 'theGraphTypes'

export default ({ id, title, url, description, updatedAt }: Topic) => {

  return (
    <div style={{marginBottom: '1em'}}>
      <Paper>
        <Link to={`/topic/${id}`}><h3>{title}</h3></Link>
        <div>Updated: {new Date(1000*updatedAt).toLocaleString()}</div>
        <a target="blank" href={'//'+url}>{url}</a>
        <p>{description}</p>
      </Paper>
    </div>
  )
  }