import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Chip, Item } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MovieIcon from '@material-ui/icons/Movie';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(.2)
  },
  avatar: {
    color: '#101010',
    backgroundColor: '#ececec87'
  },
  boxFlexColumn: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const ScoreCard = ({ current }) => {
  const classes = useStyles();

  const matches = useMediaQuery('(max-width:600px)');

  return (
    <List className={classes.root}>
      {/* score */}
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <StarIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Our Score" secondary={current.score} />
      </ListItem>
      <Divider light={false} variant="fullWidth" />
      {/* actors */}
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <PersonOutlineIcon />
          </Avatar>
        </ListItemAvatar>
        <Box className={matches && classes.boxFlexColumn}>
          {current.actors ?
            current.actors.map((item, index) => {
              return (
                <Chip
                  key={`${item + index}`}
                  color="primary"
                  clickable
                  className={classes.chip}
                  label={item}
                />
              )
            }) : null}
        </Box>
      </ListItem>
      <Divider light={false} variant="fullWidth" />
      {/* director */}
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <MovieIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Director" secondary={current.director} className={classes.textScore} />
      </ListItem>

    </List >
  )
}

export default ScoreCard