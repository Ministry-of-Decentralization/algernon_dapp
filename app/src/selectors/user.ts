import { createSelector } from 'reselect'
import { User } from 'theGraphTypes'
import { nativeToDisplayBalance } from '../utils/formatters'
import { convertToChecksum } from '../utils/web3'

const addDisplayBalances = (user: User): any => {
  const balanceTypes = Object.keys(user).filter(k => k.endsWith('Balance'))
  return balanceTypes.reduce((acc: any, balanceType: string) => {
    // @ts-ignore
    acc[balanceType + 'Display'] = nativeToDisplayBalance(user[balanceType])
    return acc
  }, {})
}

const getUser = (user: User):User => {
  return user
}

const formatStake = (stake: any) => ({
  ...stake,
  displayAmount: nativeToDisplayBalance(stake.amount),
  topic: {
    ...stake.taggedTopic.topic,
    checksumOwnerAddress: convertToChecksum(stake.taggedTopic.topic.owner?.id)
  }
})


const selectUser = createSelector(
  [getUser],
  (user) => {
    return {
      ...user,
      ...addDisplayBalances(user),
      // @ts-ignore
      stakes: user.stakes?.map(formatStake)
    }
  }
)

export default selectUser