import React from 'react'

interface Props {
  src: string;
  alt?: string;
  size?: number;
}

const Base = ({src, alt, size = 1}: Props) => (
  <img
    alt={alt || "Logo"}
    src={src}
    style={{height: `${size}em`, width: `${size}em`}}
  />
)

export default Base
