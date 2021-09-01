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

const ArticleCard = ({ article }) => {
  return (
    <Card>
      <CardMedia
        component={Link} 
        to={`/article/${article._id}`}
        style={{ height: 0, paddingTop: '56.25%' }}
        image="https://picsum.photos/200"
        title="some title"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          {article.title}
        </Typography>
        <Typography variant="body2" /*color="textSecondary"*/ component="p">
          {article.excerpt}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button size="small" color="primary" component={Link} to={`/article/${article._id}`}>
          View article
        </Button>
      </CardActions>
    </Card>
  )
}

export default ArticleCard