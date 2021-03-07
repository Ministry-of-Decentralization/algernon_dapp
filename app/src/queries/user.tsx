import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import web3 from 'web3'
import selectUser from '../selectors/user'
import { nativeToDisplayBalance } from '../utils/formatters';
import { add } from 'lodash';

interface UserQueryVars {
  owner?: string
}

interface UserData {
  user: {
    stakedBalance: string,
    unstakedBalance: string,
    undepositedBalance: string
  }
}

export const GET_OWNER_BY_ADDRESS = gql`
  query user($owner: String!){
    user(id: $owner) {
      undepositedBalance
      stakedBalance
      unstakedBalance
      stakes {
        amount
        taggedTopic {
        id
        topic {
          id
          title
          owner {
            id
          }
        }
        tag {
          id
          tag
        }
        }
      }
    }
}
`

export const useGetOwnerByAddress = (client: any, owner: string) => {
  const checksummedAddress = web3.utils.toHex(owner)
  const {loading, error, data, refetch} =  useQuery<UserData, UserQueryVars>(
    GET_OWNER_BY_ADDRESS,
    {
      client,
      variables: {
        owner:checksummedAddress
      },
      fetchPolicy: 'no-cache'
    });

  const defaultUser = { 
    undepositedBalance: "0",
    unstakedBalance: "0",
    stakedBalance: "0",
    stakes: []
  }
  const user = data && data.user ?
  // @ts-ignore
    selectUser(data.user)
    :
    // @ts-ignore
    selectUser(defaultUser)

  return {
    loading,
    error,
    refetch,
    user
  } 
}
