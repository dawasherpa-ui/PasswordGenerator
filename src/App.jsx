import React from 'react'
import {Box} from '@mui/material'
import Navbar from './layout/Navbar'
import Main from './layout/Main'
import Footer from './layout/Footer'
function App() {
  return (
    <Box sx={{height:"100vh",display:"flex",flexDirection:"column",width:"100vw"}}>
      <Navbar/>
      <Main/>
      <Footer/>
    </Box>
  )
}

export default App
