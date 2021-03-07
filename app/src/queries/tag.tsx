import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Tag as TagType } from 'theGraphTypes';
import { SelectedTag } from '../selectors/types';
import selectTopic from '../selectors/topic';

interface TagQueryVars {
  skip?: number,
  first?: number,
  ids?: string[],
  id?: string
}

interface GetTagsData {
  tags: SelectedTag[]
}

interface GetTagData {
  tag: SelectedTag
}

export const GET_TAGS = gql`
  query tags($skip: Int!, $first: Int!){
    tags(skip: $skip, first: $first) {
      id
      tag
    }
}
`;

export const useGetTags = (client: any, skip: number, first: number) => {
  const {loading, error, data} =  useQuery<GetTagsData, TagQueryVars>(
    GET_TAGS,
    {
      client,
      variables: {
        skip,
        first
      },
      fetchPolicy: 'no-cache'
    });

  return {
    loading,
    error,
    tags: data ? data.tags : null
  } 
}

export const GET_TAG = gql`
  query tag($id: String!){
    tag(id: $id) {
      id
      tag
      topics(orderBy: totalStaked, orderDirection: desc) {
        id
        topic {
          id
          owner {
            address
          }
          tags(orderBy: totalStaked, orderDirection: desc) {
            id
            totalStaked
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
    }
}
`;

export const useGetTag = (client: any, id: string) => {
  const {loading, error, data} = useQuery<GetTagData, TagQueryVars>(
    GET_TAG,
    {
      client,
      variables: {id},
      fetchPolicy: 'no-cache'
    });
  return {
    loading,
    error,
    // @ts-ignore
    tag: data ? { ...data.tag, topics: data.tag.topics.map(t => t.topic).map(selectTopic)} : null
  } 
}

export const GET_FILTERED_TAGS = gql`
  query tags($tag_contains: String!, $first: Int!){
    tags(where: {tag_contains: $tag_contains}, first: $first) {
      id
      tag
      topics {
        id
        topic {
          id
        }
      }
    }
}
`;

export const getFilteredTags = (client: any, tag_contains: string) => {
  const limit = 50
  return client.query(
    {
      query: GET_FILTERED_TAGS,
      variables: {tag_contains, first: limit}
    });
}