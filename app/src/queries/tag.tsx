import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Tag as TagType } from 'theGraphTypes';

interface TagQueryVars {
  skip?: number,
  first?: number,
  ids?: string[],
  id?: string
}

interface GetTagsData {
  tags: TagType[]
}

interface GetTagData {
  tag: TagType
}

export const GET_TAGS = gql`
  query tags($skip: Int!, $first: Int!){
    tags(skip: $skip, first: $first) {
      id
      tag
      topics {
        id
      }
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
      topics {
        id
        owner {
          address
        }
        tags {
          id
          tag
        }
        title
        description
        url
      }
    }
}
`;

export const useGetTag = (client: any, id: string) => {
  const {loading, error, data} = useQuery<GetTagData, TagQueryVars>(
    GET_TAG,
    {
      client,
      variables: {id}
    });
  
  return {
    loading,
    error,
    tag: data ? data.tag : null
  } 
}

export const GET_FILTERED_TAGS = gql`
  query tags($tag_contains: String!, $first: Int!){
    tags(where: {tag_contains: $tag_contains}, first: $first) {
      id
      tag
      topics {
        id
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