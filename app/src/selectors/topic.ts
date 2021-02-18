import { createSelector } from 'reselect'
import { Topic } from 'theGraphTypes'
import { convertToChecksum } from '../utils/web3'

const getTopic = (topic: Topic):Topic => {
  console.log(`getting topic ${topic}`)
  return topic
}


const selectTopic = createSelector(
  [getTopic],
  (topic) => {
    console.log(`selecting topic ${JSON.stringify(topic, null, 2)}`)
    return {
      ...topic,
      checksumOwnerAddress: convertToChecksum(topic.owner?.address)
    }
  }
)

export default selectTopic