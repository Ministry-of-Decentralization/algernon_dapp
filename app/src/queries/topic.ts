import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import web3 from 'web3'
import { Topic as TopicType } from 'theGraphTypes';

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
  topics: TopicType[]
}

interface GetTopicData {
  topic: TopicType
}


export const GET_TOPICS = gql`
  query topics($skip: Int!, $first: Int!){
    topics(skip: $skip, first: $first) {
      id
      createdAt
      updatedAt
      tags {
        id
        tag
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

export const getTopics = (client: any, skip: number, first: number) => {
  const {loading, error, data} =  useQuery<GetTopicsData, TopicListQueryVars>(GET_TOPICS, {client, variables: {skip, first}});

  return {
    loading,
    error,
    topics: data ? data.topics : null
  } 
}

export const GET_TOPICS_BY_ID = gql`
  query topics($skip: Int!, $first: Int!, $ids: [String!]!){
    topics(skip: $skip, first: $first, where: {id_in: $ids} ) {
      id
      createdAt
      updatedAt
      tags {
        id
        tag
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

export const getTopicsById = (client: any, skip: number, first: number, ids: string[]) => {
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
      tags {
        id
        tag
      }
      title
      description
      url
    }
}
`

export const getTopicsForOwner = (client: any, skip: number, first: number, owner: string) => {
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
    topics: data ? data.topics : null
  } 
}

export const GET_TOPIC = gql`
  query topic($id: String!){
    topic(id: $id) {
      id
      createdAt
      updatedAt
      tags {
        id
        tag
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

export const getTopic = (client: any, id: string) => {
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
    topic: data ? data.topic : null
  } 
}