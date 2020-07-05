// @ts-nocheck

import React, { Fragment } from 'react'
import Paper from '../../atoms/Paper'
import Chip from '../../atoms/Chip'
import Link from '../../atoms/Link'
import Box from '../../atoms/Box'
import Flex from '../../atoms/Flex'
import RichText from '../../atoms/RichText'
import Badge from '../user/Badge'
import MetaAndForm from './MetaAndForm'
import NotesAndForm from './NotesAndForm'

const equalAddresses = (addressA: string, addressB: string) => {
  return typeof addressA === 'string' && typeof addressB === 'string' && addressA.toLowerCase() === addressB.toLowerCase()
}

type TopicDetailProps = {
  connectedAddress: string,
  tagOptions: string[],
  topicOptions: string[],
  topic: any,
  refetchTopic: any
}

export default (props: TopicDetailProps): React.ReactNode => {
  const { connectedAddress, topic, topicOptions, tagOptions, refetchTopic } = props
  const { title, url, description, owner, notes, requires, supports, tags, createdAt, updatedAt } = topic

  const Notes: React.FC = () => (
    <Flex flexDirection="column">
      <h3>Curriculum</h3>
      <Paper>
        <RichText value={notes} />
      </Paper>
    </Flex>
  )

  const MetaDetails: React.FC = () => (
    <Paper style={{marginBottom:"2em"}}>
      <Flex flexDirection="column">
        <h1>{title}</h1>
        <Box>
          <a target="blank" href={'//'+url}>{url}</a>
        </Box>
        <Box>
        Created: {new Date(1000*createdAt).toLocaleString()} | Updated: {new Date(1000*updatedAt).toLocaleString()}
        </Box>
            
        <Badge address={owner.address} />
        <Box>
          {tags.map(tag => <Link id={tag.tag} to={`/tags/${tag.id}`} element={<Chip style={{cursor: 'pointer'}} label={tag.tag} />} />)}
        </Box>
        
        <Box>
          {description}
        </Box>
        
        <Flex justifyContent="space-around">
          <Flex flexDirection="column">
            <h3>Requires Courses</h3> {requires.length ? requires.map(topic => <Link id={topic.id} to={`/topic/${topic.id}`} element={<div>{topic.title}</div>} />) : '-'}
          </Flex>
          <Flex flexDirection="column">
            <h3>Supports Courses</h3> {supports.length ? supports.map(topic => <Link id={topic.id} to={`/topic/${topic.id}`}  element={<div>{topic.title}</div>} />) : '-'}
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  )

  const editableMeta = (
    <MetaAndForm
      formProps ={{
        connectedAddress,
        topic,
        topicOptions,
        tagOptions,
        refetchTopic
      }}
      defaultContent={<MetaDetails />} 
    />
  )

  const editableNotes = (
    <NotesAndForm
      formProps ={{
        connectedAddress,
        topic,
        refetchTopic
      }}
      defaultContent={<Notes />} 
    />
  )

  const isOwner = equalAddresses(owner.address, connectedAddress)
  
  return (
    <Fragment>
      {isOwner ? editableMeta : <MetaDetails />}
      {isOwner? editableNotes : <Notes />}
    </Fragment>
  )
}