import { Box, Typography } from '@mui/material'
import React from 'react'
import LockIcon from '@mui/icons-material/Lock';
function Navbar() {
  return (
    <Box sx={{height:"60px",display:"grid",placeItems:"center"}}>
        <Box sx={{display:"flex",alignItems:"center"}}>
      <Typography variant='h4'>PasswordGen</Typography><LockIcon sx={{fontSize:"30px"}}/>
    </Box>
    </Box>
  )
}

export default Navbar
