import React from 'react';
import Box from '@material-ui/core/Box';

const BoxComponent = ({
  flexDirection = "row",
  justifyContent = "flex-start",
  alignItems = "flex-start",
  alignContent = "flex-start",
  p = 1,
  m = 1,
  width = "100%",
  children
}) => {
  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      alignContent={alignContent}
      p={p}
      m={m}
      width={width}
    >
      {children}
    </Box>
  );
}

export default BoxComponent