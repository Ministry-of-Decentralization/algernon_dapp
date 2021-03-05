import { createSelector } from 'reselect'
import { Topic } from 'theGraphTypes'
import { topicsToOptions } from '../components/atoms/inputs/optionsFormatters'
import { nativeToDisplayBalance } from '../utils/formatters'
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
      // @ts-ignore
      tags: topic.tags.map(t => ({ ...t?.tag, totalStaked: nativeToDisplayBalance(t?.totalStaked)})),
      checksumOwnerAddress: convertToChecksum(topic.owner?.address)
    }
  }
)

export default selectTopic