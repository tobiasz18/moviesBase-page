import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Sidebar />
      <div className={classes.mainPanel} >
        <div className={classes.content}>
          <div className={classes.container}>'switchRoutes'</div>
        </div>
      </div>
    </div>
  )
}


const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    
  
    overflow: "auto",
    position: "relative",
    float: "right",
  
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },

}));

export default Dashboard