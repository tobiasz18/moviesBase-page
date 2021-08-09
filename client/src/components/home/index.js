import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ArticleCard from '../../utils/articleCard';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   }
// }));

const Home = () => {
  //const classes = useStyles();
  return (

    <div>
      <div>Carusel</div>
      <Grid container spacing={2} className="article_card">
        <Grid key={1} item xs={12} sm={6} lg={3}>
          <ArticleCard key={1} />
        </Grid>
        <Grid key={1} item xs={12} sm={6} lg={3}>
          <ArticleCard key={1} />
        </Grid>
        <Grid key={1} item xs={12} sm={6} lg={3}>
          <ArticleCard key={1} />
        </Grid>
        <Grid key={1} item xs={12} sm={6} lg={3}>
          <ArticleCard key={1} />
        </Grid>
        <Grid key={1} item xs={12} sm={6} lg={3}>
          <ArticleCard key={1} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Home