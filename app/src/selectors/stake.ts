import { map } from 'lodash'
import { createSelector } from 'reselect'
import { nativeToDisplayBalance } from '../utils/formatters'
import { convertToChecksum } from '../utils/web3'

const getStake = (taggedTopics: any):any => {
  return taggedTopics
}

const formatStake = (taggedTopic: any) => {
  const stake = taggedTopic.stakes[0]
  if (stake) {
    return {
      ...stake,
      displayAmount: nativeToDisplayBalance(stake.amount),
      tagId: taggedTopic.tag.id
    }
  }

  return null
}

const selectUserStakesForTopic = createSelector(
  [getStake],
  (taggedTopics) => {
    return taggedTopics.map(formatStake).filter( (s:any) => s)
  }
)

export default selectUserStakesForTopic