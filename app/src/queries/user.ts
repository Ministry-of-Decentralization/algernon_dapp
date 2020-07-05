import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { User as UserType, MutationCreateUserArgs, MutationUpdateUserProfileArgs } from 'algernonTypes';

interface UserListQueryVars {
  skip?: number,
  first?: number,
  ids?: string[]
}

interface UserItemQueryVars {
  stakeAddress: string
}

interface GetUsersData {
  getUsers: UserType[]
}

interface GetUserData {
  getUser: UserType
}

interface CreateUserData {
  createUser: UserType,
  error: any
}

interface UpdateUserData {
  updateUserProfile: UserType,
  error: any
}

export const GET_USERS = gql`
  {
    getUsers {

        stakeAddress
        username
        password
        description
        profileImage

    }
  }
`;

export const getUsers = () => {
  const {loading, error, data} = useQuery<GetUsersData, {}>(GET_USERS);
  return {
    loading,
    error,
    users: data ? data.getUsers : null
  } 
}

const GET_USER = gql`
  query getUser($stakeAddress: String!) {
    getUser(stakeAddress: $stakeAddress) {

            stakeAddress
            username
            password
            organization
            description
            profileImage

    }
  }
`;

export const getUser = (stakeAddress: string) => {
  const response = useQuery<GetUserData, UserItemQueryVars>(
    GET_USER,
    {
      variables: {stakeAddress},
      fetchPolicy:'network-only'
    });

  return {
    ...response,
    user: response.data ? response.data.getUser : null
  } 
}

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      stakeAddress
      username
      password
    }
  }
`

export const createUser = () => {
  const [mutationTrigger, { loading, error, data } ] = useMutation<CreateUserData, MutationCreateUserArgs>(
    CREATE_USER
    );

  return {
    mutationTrigger,
    loading,
    error,
    requestFinished: !!data &&(!!data.error || !!data.createUser),
    response: data && data.createUser
  }
}

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile($update: UpdateUserProfileInput!) {
    updateUserProfile(update: $update) {
        stakeAddress
        username
        password
        organization
        description
        profileImage
    }
  }
`

export const updateUserProfile = () => {
  const [mutationTrigger, { loading, error, data } ] = useMutation<UpdateUserData, MutationUpdateUserProfileArgs>(
    UPDATE_USER_PROFILE,
    {
      onCompleted: (data) => {console.log('comol ', data)}
    });
    
  return {
    mutationTrigger,
    loading,
    error,
    requestFinished: !!data && (!!data.error || !!data.updateUserProfile),
    response: data && data.updateUserProfile
  }
}
