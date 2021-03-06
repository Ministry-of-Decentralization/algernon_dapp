import React from 'react'
import Paper from '../../atoms/Paper'
import { Link } from 'react-router-dom'
import Blockie from '../../atoms/Blockie'
import Flex from '../../atoms/Flex'
import TagBadge from '../tags/TagBadge'
import { SelectedTopic } from '../../../selectors/types'

const ListItem = ({ id, title, description, owner, tags, checksumOwnerAddress }: SelectedTopic) => {
  return (
    <div style={{marginBottom: '1em'}}>
      <Paper>
        <Flex>
          {owner && <div style={{margin: "0 1.5em"}}>
            <Link to={`/profile/${owner.address}`}>
              <Blockie address={checksumOwnerAddress} size={10} scale={8} />
            </Link>
          </div>}
          <div>
            <Link to={`/topic/${id}`}><h2>{title}</h2></Link>
            <p>{description}</p>
          </div>
          <Flex style={{width: '30%', marginLeft: 'auto', order: 2}}>
            { tags.map( tag => <TagBadge key={tag?.id} tag={tag} /> )}
          </Flex>
        </Flex>
      </Paper>
    </div>
  )
}

export default ListItem