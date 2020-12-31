import React from 'react'
import ImageCard from '../../materialDashboard/components/ImageCard'
import Box from '../../atoms/Box'
import Link from '../../atoms/Link'

const CollegeCard = ({ college }) => (
  <div style={{margin: '2em 4em'}}>
    <Link
      to={`/tags/${college.id}`}
      element={<ImageCard key={college.title} style={{width: '20em'}} item={college} />}
    />
  </div>
)
const CollegeCards = ({colleges}) => (
  <Box style={{flexWrap: 'wrap'}}>
    {colleges.map(college => <CollegeCard key={college.title} college={college} />)}
  </Box>
)

export default CollegeCards