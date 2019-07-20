import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles,
  Typography} from '@material-ui/core';

import React from 'react';
import {Link} from 'react-router-dom';
import {IProduct} from './Model';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

const Product = ({id, name, image, description}: IProduct) => {
  const classes = useStyles();

  return (
    <Grid item={true} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={`/product/${id}`}>
          {image && <CardMedia
            component="img"
            alt={name}
            height="140"
            image={`http://127.0.0.1:3000/${image}`}
            title={name}
          />}
          <CardContent>
            <Typography gutterBottom={true} variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button component={Link} to={`/product/${id}/buy`} size="small" color="primary">
            Buy
          </Button>
          <Button component={Link} to={`/product/${id}`} size="small" color="primary">
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
