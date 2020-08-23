import React from 'react'

interface Props {
  src: string;
  alt?: string;
  size?: number;
}

export default ({src, alt, size = 1}: Props) => (
  <img
    alt={alt || "Logo"}
    src={src}
    style={{height: `${size}em`, width: `${size}em`}}
  />
)