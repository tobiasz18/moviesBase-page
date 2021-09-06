import React from 'react'
//import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box } from "@material-ui/core"
import Container from '@material-ui/core/Container'

const MainLayout = (props) => {
  return (
    <Container>
      <Box marginTop={10} >
        {props.children}
        <ToastContainer />
      </Box>
    </Container>
  )
}

export default MainLayout