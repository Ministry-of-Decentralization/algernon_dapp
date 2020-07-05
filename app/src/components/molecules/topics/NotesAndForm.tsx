// @ts-nocheck
import React, { useState } from 'react'
import UpdateTopicNotesForm from '../../organisms/forms/UpdateTopicNotes'
import Button from '../../atoms/inputs/buttons/Button'
import Flex from '../../atoms/Flex'


type NotesFormProps = {
  connectedAddress: string,
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
    topic,
    refetchTopic
  } = formProps
  const [swapped, setSwapped] = useState(false)
  const label = swapped ? 'Cancel' : 'Edit'

  const form = (
    <UpdateTopicNotesForm
      connectedAddress={connectedAddress}
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
  console.log(`default content notes forms ${{}.toString.call(defaultContent)}`)

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