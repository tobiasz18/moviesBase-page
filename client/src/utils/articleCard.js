import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Button
} from '@material-ui/core'

const ArticleCard = () => {
  return (
    <Card>
      <CardMedia
        style={{ height: 0, paddingTop: '56.25%' }}
        image="https://picsum.photos/200"
        title="some title"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          some title
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button size="small" color="primary" component={Link} to={`/article/id`}>
          View article
        </Button>
      </CardActions>
    </Card>
  )
}

export default ArticleCard