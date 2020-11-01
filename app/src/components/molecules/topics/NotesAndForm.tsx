// @ts-nocheck
import React, { useState } from 'react'
import UpdateTopicNotesForm from '../../organisms/forms/UpdateTopicNotes'
import Button from '../../atoms/inputs/buttons/Button'
import Flex from '../../atoms/Flex'


type NotesFormProps = {
  connectedAddress: string,
  algernonInstance: any,
  topic: any,
  refetchTopic: any
}

type NotesAndFormProps = {
  formProps: NotesFormProps,
  defaultContent: React.ReactNode
}

const TopicMetaForm = ({formProps, defaultContent}: NotesAndFormProps) => {
  const {
    connectedAddress,
    algernonInstance,
    topic,
    refetchTopic
  } = formProps
  const [swapped, setSwapped] = useState(false)
  const label = swapped ? 'Cancel' : 'Update Curriculum'

  const form = (
    <UpdateTopicNotesForm
      connectedAddress={connectedAddress}
      algernonInstance={algernonInstance}
      topic={topic} 
      refetchTopic={refetchTopic}
      onSuccess={() => setSwapped(false)}
    />
  )

  const Form = () => (
    <Flex flexDirection="column">
      <Flex>
        <Button label={label} onClick={() => setSwapped(false)} />
      </Flex>
      {form}
    </Flex>
  )

  const Default: React.FC = () => (
    <Flex flexDirection="column">
      <Flex>
        <Button label={label} onClick={() => setSwapped(true)} />
      </Flex>
      {defaultContent}
    </Flex>
  )
  return swapped ?
    <Form /> :
    <Default />
}

export default TopicMetaForm