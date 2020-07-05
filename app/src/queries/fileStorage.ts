import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QueryGetFileArgs, MutationAddFileArgs } from 'algernonTypes';


interface GetFileData {
  getFile: string
}

interface AddFileData {
  addFile: string
  error: any
}

const GET_FILE = gql`
  query getFile($hash: String!) {
    getFile(hash: $hash)
  }
`;

export const getFile = (hash: string, parseJson?: boolean) => {
  const response = useQuery<GetFileData, QueryGetFileArgs>(GET_FILE, {variables: {hash}});
  console.log('getFile ', response)
  const file = response.data ?
    parseJson ?
      JSON.parse(response.data.getFile)
      : null
    : null
  return {
    ...response,
    file
  } 
}

const ADD_FILE = gql`
  mutation addFile($file: String!) {
    addFile(file: $file)
  }
`;

export const addFile = () => {
  const [mutationTrigger, { loading, error, data} ] = useMutation<AddFileData, MutationAddFileArgs>(ADD_FILE);

  return {
    mutationTrigger,
    loading,
    error,
    requestFinished: !!data &&(!!data.error || !!data.addFile),
    response: data ? data.addFile : null
  } 
}

