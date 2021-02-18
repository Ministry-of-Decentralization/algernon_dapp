import { Topic, Tag } from 'theGraphTypes'

export interface SelectedTopic extends Topic {
  checksumOwnerAddress: string
}

export interface SelectedTag extends Tag {
  topics: SelectedTopic[]
}