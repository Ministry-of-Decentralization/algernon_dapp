import React from 'react'

const MetaDetails = () => (
  <Flex flexDirection="column">
    <h1>{title}</h1>
    <Box>
      <a target="blank" href={'//'+url}>{url}</a>
    </Box>
    <Box>
    Created: {new Date(1000*createdAt).toLocaleString()} | Updated: {new Date(1000*updatedAt).toLocaleString()}
    </Box>
        
    <Badge address={owner.address} />
    <Box>
      {tags.map(tag => <Link id={tag.tag} to={`/tags/${tag.id}`} element={<Chip style={{cursor: 'pointer'}} label={tag.tag} />} />)}
    </Box>
    
    <Box>
      {description}
    </Box>
    
    <Flex>
      <Flex flexDirection="column">
        <h3>Requires Courses</h3> {requires.length ? requires.map(topic => <Link id={topic.id} to={`/topic/${topic.id}`} element={<div>{topic.title}</div>} />) : '-'}
      </Flex>
      <Flex flexDirection="column">
        <h3>Supports Courses</h3> {supports.length ? supports.map(topic => <Link id={topic.id} to={`/topic/${topic.id}`}  element={<div>{topic.title}</div>} />) : '-'}
      </Flex>
    </Flex>
  </Flex>
)

export default MetaDetails