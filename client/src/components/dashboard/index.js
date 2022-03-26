import React from 'react'
import LayoutDashboard from '../../hoc/LayoutDashboard'
import Typography from "@material-ui/core/Typography";
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector((state) => state.user)

  return (
    <LayoutDashboard section="Dashboard">

      <Typography component="h1" variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>

      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
        dolor purus non enim praesent elementum facilisis leo vel. Risus at
        ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
        quisque non tellus.
      </Typography>

    </LayoutDashboard>
  )
}

export default Dashboard