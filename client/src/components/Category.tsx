import React from "react";
import {Grid, makeStyles} from "@material-ui/core";

interface Props {
  children: JSX.Element[] | JSX.Element | string,
  title: string
}

const useStyles = makeStyles(theme => ({
  category: {
    flexDirection: 'row'
  }
}));

const Category = (props: Props) => {
  const classes = useStyles();

  return (
    <>
      <h2>{props.title}</h2>
      <Grid className={classes.category} container spacing={4}>
        {props.children}
      </Grid>
    </>
  )
}

export default Category