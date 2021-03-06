import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import web3 from 'web3'
import selectTopic from '../selectors/topic'
import { SelectedTopic } from '../selectors/types'
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
    }
}
`

const addDisplayBalances = (balances: any): any => {
  const balanceTypes = Object.keys(balances)
  return balanceTypes.reduce((acc, balanceType) => {
    acc[balanceType + 'Display'] = nativeToDisplayBalance(balances[balanceType])
    return acc
  }, {...balances})
}
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

  const defaultBalances = { 
    undepositedBalance: "0",
    unstakedBalance: "0",
    stakedBalance: "0"
  }

  const user = data ?
    data.user ?
      addDisplayBalances(data.user)
      :
      addDisplayBalances(defaultBalances)
    : addDisplayBalances(defaultBalances)

  return {
    loading,
    error,
    refetch,
    user
  } 
}
