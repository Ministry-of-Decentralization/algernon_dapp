import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import web3 from 'web3'
import { Topic as TopicType } from 'theGraphTypes';
import selectTopic from '../selectors/topic'
import { SelectedTopic } from '../selectors/types'

interface TopicListQueryVars {
  skip?: number,
  first?: number,
  ids?: string[],
  owner?: string
}

interface TopicItemQueryVars {
  id: string
}

interface GetTopicsData {
  topics: SelectedTopic[]
}

interface GetTopicData {
  topic: SelectedTopic
}

 const fragments = {
  comment: gql`
    fragment CommentsPageComment on Comment {
      id
      postedBy {
        login
        html_url
      }
      createdAt
      content
    }
  `,
};

export const GET_TOPICS = gql`
  query topics($skip: Int!, $first: Int!){
    topics(skip: $skip, first: $first) {
      id
      createdAt
      updatedAt
      tags(orderBy: totalStaked, orderDirection: desc, where: {active: true}) {
        id
        totalStaked
        tag {
          id
          tag
        }
      }
      owner {
        address
      }
      title
      description
      url
    }
}
`;

export const useGetTopics = (client: any, skip: number, first: number) => {
  const {loading, error, data} =  useQuery<GetTopicsData, TopicListQueryVars>(GET_TOPICS, {client, variables: {skip, first}});

  return {
    loading,
    error,
    topics: data ? data.topics.map(selectTopic) : null
  } 
}

export const GET_TOPICS_BY_ID = gql`
  query topics($skip: Int!, $first: Int!, $ids: [String!]!){
    topics(skip: $skip, first: $first, where: {id_in: $ids} ) {
      id
      createdAt
      updatedAt
      title
      description
      url
      tags(orderBy: totalStaked, orderDirection: desc, where: {active: true}) {
        id
        totalStaked
        tag {
          id
          tag
        }
      }
      owner {
        address
      }
    }
}
`;

export const useGetTopicsById = (client: any, skip: number, first: number, ids: string[]) => {
  const {loading, error, data, refetch} =  useQuery<GetTopicsData, TopicListQueryVars>(GET_TOPICS_BY_ID, {client, variables: {skip, first, ids}});

  return {
    loading,
    error,
    refetch,
    topics: data ? data.topics : null
  } 
}

export const GET_TOPICS_FOR_OWNER = gql`
  query topics($skip: Int!, $first: Int!, $owner: String!){
    topics(skip: $skip, first: $first, where: {owner: $owner}) {
      id
      createdAt
      updatedAt
      tags(orderBy: totalStaked, orderDirection: desc, where: {active: true}) {
        totalStaked
        id
        tag {
          id
          tag
        }
      }
      title
      description
      url
    }
}
`

export const useGetTopicsForOwner = (client: any, skip: number, first: number, owner: string) => {
  const checksummedAddress = web3.utils.toHex(owner)
  const {loading, error, data, refetch} =  useQuery<GetTopicsData, TopicListQueryVars>(
    GET_TOPICS_FOR_OWNER,
    {
      client,
      variables: {
        skip,
        first,
        owner:checksummedAddress
      },
      fetchPolicy: 'no-cache'
    });
  return {
    loading,
    error,
    refetch,
    topics: data ? data.topics.map(selectTopic) : null
  } 
}

export const GET_TOPIC = gql`
  query topic($id: String!){
    topic(id: $id) {
      id
      createdAt
      updatedAt
      tags(orderBy: totalStaked, orderDirection: desc, where: {active: true}) {
        id
        totalStaked
        tag {
          id
          tag
        }
      }
      owner {
        address
      }
      title
      description
      url
      notes
      requires {
        id
        title
        url
        description
        owner {
          id
          address
        }
      }
      supports {
        id
        title
        url
        description
        owner {
          id
          address
        }
      }
    }
}
`;

export const useGetTopic = (client: any, id: string) => {
  const {loading, error, data, refetch} = useQuery<GetTopicData, TopicItemQueryVars>(
    GET_TOPIC,
    {client,
      variables: {id},
      fetchPolicy: 'no-cache'
    });
    
  return {
    loading,
    error,
    refetch,
    topic: data ? selectTopic(data.topic) : null
  } 
}