import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box } from "@material-ui/core"
import Container from '@material-ui/core/Container'
import { useSelector } from 'react-redux'

const MainLayout = (props) => {
  const site = useSelector(state => state.site)

  return (
    <Container className={`${site.layout}`} >
      <Box marginTop={7} >
        {props.children}
        <ToastContainer />
      </Box>
    </Container >
  )
}

export default MainLayout
