import React from 'react'
import Paper from '../../atoms/Paper'
import { Link } from 'react-router-dom'
import Blockie from '../../atoms/Blockie'
import Box from '../../atoms/Box'

const ListItem = ({ taggedTopic, displayAmount, topic }: any) => {
  return (
    <div style={{marginBottom: '1em'}}>
      <Paper>
        <Box>
          <Box style={{width: "60%"}}>
            <div style={{margin: "0 1.5em"}}>
              <Link to={`/profile/${topic.checksumOwnerAddress}`}>
                <Blockie address={topic.checksumOwnerAddress} size={10} scale={8} />
              </Link>
            </div>
            <div>
              <Link to={`/topic/${taggedTopic.topic.id}`}><h2>{taggedTopic.topic.title}</h2></Link>
            </div>
          </Box>

          <Box flexDirection="column" style={{width: '30%', marginLeft: 'auto', order: 2}}>
            <h2>{ taggedTopic.tag.tag}</h2> <h2>{displayAmount}</h2>
          </Box>
        </Box>
      </Paper>
    </div>
  )
}

export default ListItem