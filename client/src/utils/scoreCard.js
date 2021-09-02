import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Chip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MovieIcon from '@material-ui/icons/Movie';

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
  }
}));

const ScoreCard = ({ current }) => {
  const classes = useStyles();

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
        { current.actors ? 
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

    </List>
  )
}

export default ScoreCard