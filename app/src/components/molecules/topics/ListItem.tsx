import React from 'react'
import Paper from '../../atoms/Paper'
import { Link } from 'react-router-dom'
import { Topic } from 'theGraphTypes'
import Blockie from '../../atoms/Blockie'
import Flex from '../../atoms/Flex'
import TagBadges from '../tags/TagBadges'

export default ({ id, title, url, description, owner, tags }: Topic) => {

  return (
    <div style={{marginBottom: '1em'}}>
      <Paper>
        <Flex>
          {owner && <div style={{margin: "0 1.5em"}}>
            <Link to={`/profile/${owner.address}`}>
              <Blockie address={owner?.address} size={10} scale={8} />
            </Link>
          </div>}
          <div>
            <Link to={`/topic/${id}`}><h2>{title}</h2></Link>
            <p>{description}</p>
          </div>
          <Flex style={{width: '30%', marginLeft: 'auto', order: 2}}>
            <TagBadges tags={tags} />
          </Flex>
        </Flex>
      </Paper>
    </div>
  )
  }