

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import selectUserStakesForTopic from '../selectors/stake';

interface StakeQueryVars {
  topicId: string
  staker: string
}

interface Stake {
  id: string
  amount: string
}
interface TaggedTopic {
  id: string
  stakes: [Stake]
}
interface GetStakeData {
  taggedTopics: TaggedTopic
}

export const GET_USER_TOPIC_STAKES  = gql`
  query tag($topicId: String!, $staker: String!){
    taggedTopics(where: {topic: $topicId}) {
      id
      totalStaked
      tag {
        id
      }
      stakes(where: {staker: $staker}) {
        id
        amount
      }
    }
}
`;

export const useGetUserTopicStake = (client: any, topicId: string, staker: string) => {
  staker =  staker && staker.split('').map(f => f.toLowerCase()).join('')
  const {loading, error, data} = useQuery<GetStakeData, StakeQueryVars>(
    GET_USER_TOPIC_STAKES,
    {
      client,
      variables: {topicId, staker },
      fetchPolicy: 'no-cache'
    });
  console.log(`getting user ${staker} topic ${topicId} stakes ${data && JSON.stringify(data.taggedTopics, null, 2)}`)
  return {
    loading,
    error,
    // @ts-ignore
    stakes: data ? selectUserStakesForTopic(data.taggedTopics) : null
  } 
}
