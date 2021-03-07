import React from 'react'
import { Stake } from 'theGraphTypes'

import TopicStakesListItem from '../../molecules/stakes/TopicStakesListItem'

interface StakeListProps {
  stakes: Stake[]
}
const TopicList = ({ stakes }: StakeListProps) => {
  return (
    <div>
      {stakes.length ?
        // @ts-ignore
        stakes.map(stake => <TopicStakesListItem key={stake.taggedTopic.id} {...stake} />)
        : 'No Stakes'
      }
    </div>
  )
}

export default TopicList