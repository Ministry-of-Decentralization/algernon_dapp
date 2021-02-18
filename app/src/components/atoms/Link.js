import React from 'react'
import { Link } from 'react-router-dom'

const LinkComp = ({to, element}) => (
  <div>
    <Link to={to}>{element}</Link>
  </div>
)

export default LinkComp