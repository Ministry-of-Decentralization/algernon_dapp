// @ts-nocheck
import React, { useState } from 'react'
import UpdateTopicMetaForm from '../../organisms/forms/UpdateTopicMeta'
import Button from '../../atoms/inputs/buttons/Button'
import Flex from '../../atoms/Flex'


type MetaFormProps = {
  connectedAddress: string,
  tagOptions: string[],
  topicOptions: string[],
  topic: any,
  refetchTopic: any
}

type MetaAndFormProps = {
  formProps: MetaFormProps,
  defaultContent: React.ReactNode
}

const MetaAndForm = ({formProps, defaultContent}: MetaAndFormProps) => {
  const {
    connectedAddress,
    tagOptions,
    topicOptions,
    topic,
    refetchTopic
  } = formProps
  const [swapped, setSwapped] = useState(false)
  const label = swapped ? 'Cancel' : 'Edit'

  const MetaForm = () => (
    <UpdateTopicMetaForm
      connectedAddress={connectedAddress}
      topic={topic} 
      topicOptions={topicOptions}
      tagOptions={tagOptions}
      refetchTopic={refetchTopic}
      onSuccess={() => setSwapped(false)}
    />
  )

  const Form = () => (
    <Flex flexDirection="column">
      <Flex>
        <Button label={label} onClick={() => setSwapped(false)} />
      </Flex>
      <MetaForm />
      
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

export default MetaAndForm