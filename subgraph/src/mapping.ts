import { TagAdded, TagUpdated, TopicCreated, TopicUpdated, TopicTagsUpdated, TokensReceived, StakeIncreased, StakeDecreased, StakeAdded } from '../generated/Algernon/Algernon'
import { Sent, Minted, Burned } from '../generated/AlgerToken/AlgerToken'

import { Tag, User, Topic, TaggedTopic, Stake } from '../generated/schema'
import { log, Bytes, BigInt, json, ipfs, Address } from '@graphprotocol/graph-ts'
import { ZERO } from './common'

function getOrCreateUser(address: Address, timestamp: BigInt): User {
  let user = User.load(address.toHex())
  if (user == null) {
    user = new User(address.toHex())
    user.address = address
    user.firstActive = timestamp
    user.lastActive = timestamp
    user.undepositedBalance = ZERO
    user.unstakedBalance = ZERO
    user.stakedBalance = ZERO
    user.ownerRewards = ZERO
    user.save()
  }

  return user as User
}

function getOrCreateTaggedTopic(tagId: string, topicId: string): TaggedTopic {
  let id = tagId + '-' + topicId
  let taggedTopic = TaggedTopic.load(id)
  if (taggedTopic == null) {
    taggedTopic = new TaggedTopic(id)
    taggedTopic.tag = tagId
    taggedTopic.topic = topicId
    taggedTopic.totalStaked = ZERO
    taggedTopic.active = true
    taggedTopic.save()
  }

  return taggedTopic as TaggedTopic
}

export function handleTagAdded(event: TagAdded): void {
    let newTag = new Tag(event.params.id.toString())
    newTag.tag = event.params.tag
    if (event.params.parent.toString() != '0') {
      newTag.parent = event.params.parent.toString() 
    }
    newTag.createdAt = event.block.timestamp
    newTag.totalStaked = ZERO
    newTag.save()
}

export function handleTagUpdated(event: TagUpdated): void {
  let tag = Tag.load(event.params.id.toString())
  tag.parent = event.params.parent.toString()
  tag.save()
}

function updateTopicContent(topic: Topic, content: Bytes): Topic {
  let jsonData = json.fromBytes(content as Bytes)
  topic.title = jsonData.toObject().get('title').toString()
  topic.description = jsonData.toObject().get('description').toString()
  topic.url = jsonData.toObject().get('url').toString()
  topic.notes = jsonData.toObject().get('notes').toString()

  let supportIds = jsonData.toObject().get('supports').toArray()
  let supports:string[] = []
  for (let i = 0; i < supportIds.length; i++) {
    supports.push(supportIds[i].toString())
  }
  topic.supports = supports

  let requireIds = jsonData.toObject().get('requires').toArray()
  let requires:string[] = []
  for (let i = 0; i < requireIds.length; i++) {
    requires.push(requireIds[i].toString())
  }
 topic.requires = requires

  return topic
}

function updateTopicTags(topic: Topic, tagIds: BigInt[]): void {
  // TODO: updat to active:false for taggedTopics attached to the Topic that are no longer attached
  // create any TaggedTopic that does not exist
  for (let i = 0; i < tagIds.length; i++) {
    getOrCreateTaggedTopic(tagIds[i].toString(), topic.id)
  }
}

function updateUserLastActive(userId: string, lastActive: BigInt): void {
  let user = User.load(userId)
  user.lastActive = lastActive
  user.save()
}
 
export function handleTopicCreated(event: TopicCreated): void {
  let timestamp = event.block.timestamp
  let topic = new Topic(event.params.id.toString())

  let user = getOrCreateUser(event.params.owner, timestamp)

  user.lastActive = timestamp
  user.save()

  topic.owner = user.id
  topic.contentHash = event.params.content.toString()
  
  topic.createdAt = timestamp
  topic.updatedAt = timestamp
  
  updateTopicTags(topic, event.params.tagIds) 

  let data = ipfs.cat(topic.contentHash)
  if (data !== null) {
    topic = updateTopicContent(topic, data as Bytes)
  }
  
  topic.save()

}

export function handleTopicUpdated(event: TopicUpdated): void {
  let topic = Topic.load(event.params.id.toString())

  updateUserLastActive(topic.owner, event.block.timestamp)

  topic.updatedAt = event.block.timestamp
  topic.contentHash = event.params.content.toString()
  updateTopicTags(topic as Topic, event.params.tagIds) 

  let data = ipfs.cat(topic.contentHash)

  if (data !== null) {
    topic = updateTopicContent(topic as Topic, data as Bytes)
  }
  
  topic.save()
}

export function handleTopicTagsUpdated(event: TopicTagsUpdated): void {
  let topic = Topic.load(event.params.id.toString())

  updateUserLastActive(topic.owner, event.block.timestamp)

  topic.updatedAt = event.block.timestamp
  updateTopicTags(topic as Topic, event.params.tagIds)

  topic.save()
}

export function handleTokensReceived(event: TokensReceived): void {
  let timestamp = event.block.timestamp

  let user = getOrCreateUser(event.params.from, timestamp)
  user.unstakedBalance = user.unstakedBalance .plus(event.params.amount)
  user.save()
}

export function handleSent(event: Sent): void {
  let from = getOrCreateUser(event.params.from, event.block.timestamp)
  let to = getOrCreateUser(event.params.to, event.block.timestamp)

  from.undepositedBalance = from.undepositedBalance.minus(event.params.amount)
  from.save()

  to.undepositedBalance = to.undepositedBalance.plus(event.params.amount)
  to.save()

}

export function handleMinted(event: Minted): void {
  let to = getOrCreateUser(event.params.to, event.block.timestamp)
  
  to.undepositedBalance = to.undepositedBalance.plus(event.params.amount)
  to.save()
}

export function handleBurned(event: Burned): void {
  let from = getOrCreateUser(event.params.from, event.block.timestamp)

  from.undepositedBalance = from.undepositedBalance.minus(event.params.amount)
  from.save()
}

function increaseStakedBalances(stake: Stake, totalAmt: BigInt, stakeAmt: BigInt): void {
  let taggedTopic = TaggedTopic.load(stake.taggedTopic)
  let staker = User.load(stake.staker)
  let topic = Topic.load(taggedTopic.topic)
  let owner = User.load(topic.owner)
  let ownerShare = totalAmt - stakeAmt
  let tag = Tag.load(taggedTopic.tag)

  owner.ownerRewards = owner.ownerRewards + ownerShare
  owner.save()

  taggedTopic.totalStaked = taggedTopic.totalStaked + stakeAmt
  taggedTopic.save()

  tag.totalStaked = tag.totalStaked + stakeAmt
  tag.save()

  staker.stakedBalance = staker.stakedBalance + stakeAmt
  staker.unstakedBalance = staker.unstakedBalance - totalAmt
  staker.save()
}

export function handleStakeAdded(event: StakeAdded): void {
  let taggedTopic = getOrCreateTaggedTopic(event.params.tagId.toString(), event.params.topicId.toString())
  let stake = new Stake(event.params.stakeIdx.toString())

  stake.staker = event.params.staker.toHex()
  stake.taggedTopic = taggedTopic.id
  stake.amount = event.params.stakeAmt
  stake.createdAt = event.block.timestamp
  stake.updatedAt = event.block.timestamp
  stake.save()

  increaseStakedBalances(stake, event.params.totalAmt, event.params.stakeAmt)

}

export function handleStakeIncreased(event: StakeIncreased): void {
  let stake = Stake.load(event.params.stakeIdx.toString()) as Stake
  stake.amount = stake.amount + event.params.stakeAmt
  stake.save()
  increaseStakedBalances(stake, event.params.totalAmt, event.params.stakeAmt)

}

export function handleStakeDecreased(event: StakeDecreased): void {
  let stake = Stake.load(event.params.stakeIdx.toString())
  stake.amount = stake.amount - event.params.amt
  stake.updatedAt = event.block.timestamp
  stake.save()

  let taggedTopic = TaggedTopic.load(stake.taggedTopic)

  taggedTopic.totalStaked = taggedTopic.totalStaked - event.params.amt
  taggedTopic.save()

  let tag = Tag.load(taggedTopic.tag)
  tag.totalStaked = tag.totalStaked - event.params.amt
  tag.save()

  let staker = User.load(stake.staker)
  staker.stakedBalance = staker.stakedBalance - event.params.amt
  staker.unstakedBalance = staker.unstakedBalance + event.params.amt
  staker.save()

}

