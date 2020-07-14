import React from 'react'
import ImageCard from '../../materialDashboard/components/ImageCard'
import Box from '../../atoms/Box'

const CollegeCards = ({colleges}) => (
  <Box style={{flexWrap: 'wrap'}}>
    {colleges.map(college => <ImageCard key={college.title} item={college} />)}
  </Box>
)

export default CollegeCards