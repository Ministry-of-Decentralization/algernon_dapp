import { createSelector } from 'reselect'
import { Topic } from 'theGraphTypes'
import { nativeToDisplayBalance } from '../utils/formatters'
import { convertToChecksum } from '../utils/web3'

const getTopic = (topic: Topic):Topic => {
  return topic
}

const selectTopic = createSelector(
  [getTopic],
  (topic) => {
    return {
      ...topic,
      // @ts-ignore
      tags: topic.tags.map(t => ({ ...t?.tag, totalStaked: nativeToDisplayBalance(t?.totalStaked, 18, 0)})),
      checksumOwnerAddress: convertToChecksum(topic.owner?.address)
    }
  }
)

export default selectTopic