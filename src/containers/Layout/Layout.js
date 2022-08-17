import React from 'react'
import { Box } from '@mui/material'

const Layout = ({ children }) => {
  return (
    <Box sx={{ pt: 10 }}>
      {children}
    </Box>
  )
}

export default Layout
