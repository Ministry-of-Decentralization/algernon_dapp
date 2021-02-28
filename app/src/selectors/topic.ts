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
    return {
      ...topic,
      checksumOwnerAddress: convertToChecksum(topic.owner?.address)
    }
  }
)

export default selectTopic