// @ts-nocheck

import React, { Fragment } from 'react'
import Paper from '../../atoms/Paper'
import Chip from '../../atoms/Chip'
import Link from '../../atoms/Link'
import Box from '../../atoms/Box'
import Flex from '../../atoms/Flex'
import RichText from '../../atoms/RichText'
import Badge from '../user/Badge'
// import MetaAndForm from './MetaAndForm'
import NotesAndForm from './NotesAndForm'
import UpdateTopicMetaForm from '../../organisms/forms/UpdateTopicMeta'
import { convertToChecksum } from '../../../utils/web3'
import TagBadge from '../tags/TagBadge'
import CreateStakeForm from '../../organisms/forms/CreateStake'
import UpdateStakeForm from '../../organisms/forms/UpdateStake'


const equalAddresses = (addressA: string, addressB: string) => {
  return typeof addressA === 'string' && typeof addressB === 'string' && addressA.toLowerCase() === addressB.toLowerCase()
}

type TopicDetailProps = {
  connectedAddress: string,
  tagOptions: string[],
  topicOptions: string[],
  topic: any,
  refetchTopic: any,
  algernonInstance: any,
  userStakes: any
}

const RelatedCourse = (props:any) => {
  const topic = props.topic

  return (
    <Paper>
      <Link to={`/topic/${topic.id}`} element={<h4>{topic.title}</h4>} />
      <p>{topic.description}</p>
    </Paper>
  )
}

const TopicTags = ({tags, connectedAddress, algernonInstance, topicId, topicTitle, userStakes}) => {
  return tags.map(tag => {
    const existingStake = userStakes && userStakes.find(s => s.tagId === tag.id)
    const trigger = algernonInstance ?
      existingStake ?
        <UpdateStakeForm
          connectedAddress={connectedAddress}
          algernonInstance={algernonInstance}
          stake={existingStake}
          topicTitle={topicTitle}
          tag={tag.tag}
        /> 
        :
        <CreateStakeForm
          connectedAddress={connectedAddress}
          algernonInstance={algernonInstance}
          topicId={topicId}
          tagId={tag.id}
          topicTitle={topicTitle}
          tag={tag.tag}
        />
      : null
    return <TagBadge key={tag.id} tag={tag} stakeTrigger={trigger} />
  })
}

const Detail = (props: TopicDetailProps): React.ReactNode => {
  const { connectedAddress, algernonInstance, topic, topicOptions, tagOptions, refetchTopic, userStakes } = props
  const { id, title, url, description, owner, notes, requires, supports, tags, updatedAt } = topic
  const containerStyle = { margin:"2em", padding: "2em" }
  const address = convertToChecksum(owner.address)

  const isOwner = equalAddresses(address, connectedAddress)
  const createdEl = (
    <div style={{color: '#808080', marginTop: '.5em', fontStyle: 'italic', fontSize: '.9em'}}>
      Last Updated: {new Date(1000*updatedAt).toLocaleDateString()}
    </div>
  )

  const Notes: React.FC = () => (
    <Flex flexDirection="column" style={{ margin:"1em", padding: "1em" }}>
      <h3>Curriculum</h3>
      <Paper>
        <RichText value={notes} />
      </Paper>
    </Flex>
  )
  console.log(`inside detail alg insance ${algernonInstance}`)
  const MetaDetails: React.FC = () => (
    <div style={{marginTop: '2em'}}>
      <Flex>
        {isOwner &&
          <UpdateTopicMetaForm
            connectedAddress={connectedAddress}
            algernonInstance={algernonInstance}
            topic={topic} 
            topicOptions={topicOptions}
            tagOptions={tagOptions}
            refetchTopic={refetchTopic}
          />
        }
      </Flex>
      <Paper style={containerStyle}>
        <Flex flexDirection="column">
          <Flex>
            <Box style={{width: '70%'}}>
              <h1>{title}</h1>
            </Box>
            <Box style={{width: '25%'}}>
              <Badge address={address} subEl={createdEl} />
            </Box>
          </Flex>
          <Box>
            {description}
          </Box>
          <Box>
            <a target="blank" href={url}>{url}</a>
          </Box>
          <Box>
            <TopicTags
              tags={tags}
              algernonInstance={algernonInstance}
              connectedAddress={connectedAddress}
              topicId={topic.id}
              topicTitle={topic.title}
              userStakes={userStakes}
            />
          </Box>
          <Flex justifyContent="space-around">
            <Flex flexDirection="column" style={{width: '50%'}}>
              <h3>Requires Courses</h3>
              {requires.length ? requires.map(topic => <RelatedCourse id={topic.id} topic={topic} />) : '-'}
            </Flex>
            <Flex flexDirection="column">
              <h3>Supports Courses</h3> {supports.length ? supports.map(topic => <RelatedCourse id={topic.id} topic={topic}  />) : '-'}
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </div>
  )

  /*
  const editableMeta = (
    <MetaAndForm
      formProps ={{
        connectedAddress,
        algernonInstance,
        topic,
        topicOptions,
        tagOptions,
        refetchTopic
      }}
      defaultContent={<MetaDetails />} 
    />
  )
  */

  const editableNotes = (
    <NotesAndForm
      formProps ={{
        connectedAddress,
        algernonInstance,
        topic,
        refetchTopic
      }}
      defaultContent={<Notes />} 
    />
  )


  
  return (
    <Fragment>
      <MetaDetails />
      {isOwner? editableNotes : <Notes />}
    </Fragment>
  )
}

export default Detail