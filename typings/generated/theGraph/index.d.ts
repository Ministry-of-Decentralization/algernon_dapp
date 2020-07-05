export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Bytes: any,
  BigInt: any,
  BigDecimal: any,
};




export type Stake = {
  __typename?: 'Stake',
  id: Scalars['ID'],
  staker: User,
  topic: Topic,
  tag: Tag,
  amount: Scalars['BigInt'],
  createdAt: Scalars['BigInt'],
  updatedAt: Scalars['BigInt'],
};

export type Tag = {
  __typename?: 'Tag',
  id: Scalars['ID'],
  tag: Scalars['String'],
  topics?: Maybe<Array<Topic>>,
  stakes?: Maybe<Array<Stake>>,
  createdAt: Scalars['BigInt'],
};

export type Topic = {
  __typename?: 'Topic',
  id: Scalars['ID'],
  owner?: Maybe<User>,
  tags: Array<Maybe<Tag>>,
  contentHash: Scalars['String'],
  title: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  notes?: Maybe<Scalars['String']>,
  supports: Array<Topic>,
  requires: Array<Topic>,
  stakes?: Maybe<Array<Stake>>,
  createdAt: Scalars['BigInt'],
  updatedAt: Scalars['BigInt'],
};

export type User = {
  __typename?: 'User',
  id: Scalars['ID'],
  address?: Maybe<Scalars['Bytes']>,
  topics?: Maybe<Array<Topic>>,
  stakes?: Maybe<Array<Stake>>,
  firstActive: Scalars['BigInt'],
  lastActive: Scalars['BigInt'],
};

