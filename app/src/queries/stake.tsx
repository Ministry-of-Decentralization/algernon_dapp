

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import selectUserStakesForTopic from '../selectors/stake';

interface StakeQueryVars {
  topicId: string
  staker: string
}

interface UserStakeQueryVars {
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

interface User {
  id: string
  stakes: [Stake]
}
interface GetUserStakeData {
  user: User
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
  return {
    loading,
    error,
    // @ts-ignore
    stakes: data ? selectUserStakesForTopic(data.taggedTopics) : null
  } 
}

export const GET_USER_STAKES  = gql`
  query tag($staker: String!){
    user(id: $staker) {
      id
      stakes {
        id
        amount
        topic {
          id
          title
        }
        tag {
          id
          tag
        }
      }
    }
}
`;

export const useGetUserStakes = (client: any, staker: string) => {
  staker =  staker && staker.split('').map(f => f.toLowerCase()).join('')
  const {loading, error, data} = useQuery<GetUserStakeData, UserStakeQueryVars>(
    GET_USER_STAKES,
    {
      client,
      variables: { staker },
      fetchPolicy: 'no-cache'
    });
  return {
    loading,
    error,
    // @ts-ignore
    stakes: data ? data.user.stakes : null
  } 
}
