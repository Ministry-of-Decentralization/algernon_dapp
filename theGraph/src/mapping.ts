import { TagAdded, TopicCreated, TopicUpdated, TopicTagsUpdated } from '../generated/Algernon/Algernon'
import { Tag, User, Topic } from '../generated/schema'
import { log, Bytes, BigInt, json, ipfs } from '@graphprotocol/graph-ts'

export function handleTagAdded(event: TagAdded): void {

    let newTag = new Tag(event.params.id.toString())
    newTag.tag = event.params.tag
    newTag.createdAt = event.block.timestamp
    newTag.save()
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

function updateTopicTags(topic: Topic, tagIds: BigInt[]): Topic {
  let tags:string[] = []
  for (let i = 0; i < tagIds.length; i++) {
    tags.push(tagIds[i].toString())
  }
  topic.tags = tags

  return topic
}

function updateUserLastActive(userId: string, lastActive: BigInt): void {
  let user = User.load(userId)
  user.lastActive = lastActive
  user.save()
}
 
export function handleTopicCreated(event: TopicCreated): void {
  let timestamp = event.block.timestamp
  let topic = new Topic(event.params.id.toString())


  let user = User.load(event.params.owner.toHex())
  if (user == null) {
    user = new User(event.params.owner.toHex())
    user.address = event.params.owner
    user.firstActive = timestamp
    user.lastActive = timestamp
    user.save()
  } else {
    user.lastActive = timestamp
    user.save()
  }
  topic.owner = event.params.owner.toHex()
  topic.contentHash = event.params.content.toString()
  
  topic.createdAt = timestamp
  topic.updatedAt = timestamp
  
  topic = updateTopicTags(topic, event.params.tagIds) 

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
  topic = updateTopicTags(topic as Topic, event.params.tagIds) 

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
  topic = updateTopicTags(topic as Topic, event.params.tagIds)

  topic.save()
}
