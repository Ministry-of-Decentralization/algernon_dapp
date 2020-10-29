import React from 'react'
import Paper from '../../atoms/Paper'
import { Link } from 'react-router-dom'
import { Topic } from 'theGraphTypes'

export default ({ id, title, url, description }: Topic) => {

  return (
    <div style={{marginBottom: '1em'}}>
      <Paper>
        <Link to={`/topic/${id}`}><h2>{title}</h2></Link>
        <a target="blank" href={'//'+url}>{url}</a>
        <p>{description}</p>
      </Paper>
    </div>
  )
  }