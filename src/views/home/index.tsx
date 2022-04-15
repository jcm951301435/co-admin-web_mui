import React from 'react'
import { useRootStore } from '@/store/index'
import { Box, Button, Typography, LinearProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const { authStore } = useRootStore()
  const navigate = useNavigate()
  const handleClick = () => {
    authStore.cleanToken()
    navigate('/login')
  }
  return (
    <Box>
      <h1>Dashboard</h1>
      <Button variant="contained" onClick={handleClick}>
        LOGOUT
      </Button>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
        velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
        scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
        lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
        ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
    </Box>
  )
}

export default Home
