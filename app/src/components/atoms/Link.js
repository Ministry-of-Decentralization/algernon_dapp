import React from 'react'
import { Link } from 'react-router-dom'

export default ({to, element}) => (
  <div>
    <Link to={to}>{element}</Link>
  </div>
)