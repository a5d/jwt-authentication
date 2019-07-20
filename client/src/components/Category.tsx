import React from "react";
import {Button, Grid, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

interface Props {
  children: JSX.Element[] | JSX.Element | string,
  title: string,
  auth: boolean,
  id: string
}

const useStyles = makeStyles(theme => ({
  category: {
    flexDirection: 'row'
  },
  newProduct: {
    margin: theme.spacing(2, 0, 2),
  }
}));

const Category = (props: Props) => {
  const classes = useStyles();
  const {auth} = props

  return (
    <>
      <h2>{props.title}</h2>
      {auth && <Button
        type="submit"
        variant="contained"
        color="primary"
        component={Link}
        to='/category/1/new-product'
        className={classes.newProduct}
      >
        New Product
      </Button>}
      <Grid className={classes.category} container spacing={4}>
        {props.children}
      </Grid>
    </>
  )
}

const mapStateToProps = ({auth}: Props) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Category)