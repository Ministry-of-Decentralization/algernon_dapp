export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CreateUserInput = {
  stakeAddress: Scalars['String'],
  username: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
  __typename?: 'Mutation',
  addFile?: Maybe<Scalars['String']>,
  createUser?: Maybe<User>,
  updateUserProfile?: Maybe<User>,
};


export type MutationAddFileArgs = {
  file: Scalars['String']
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};


export type MutationUpdateUserProfileArgs = {
  update: UpdateUserProfileInput
};

export type Query = {
  __typename?: 'Query',
  health?: Maybe<Scalars['String']>,
  getUser?: Maybe<User>,
  getUsers: Array<User>,
  getFile?: Maybe<Scalars['String']>,
};


export type QueryGetUserArgs = {
  stakeAddress: Scalars['String']
};


export type QueryGetFileArgs = {
  hash: Scalars['String']
};

export type UpdateUserProfileInput = {
  stakeAddress: Scalars['String'],
  username?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  organization?: Maybe<Scalars['String']>,
  profileImage?: Maybe<Scalars['String']>,
};

export type User = {
  __typename?: 'User',
  stakeAddress?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  organization?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  profileImage?: Maybe<Scalars['String']>,
};

