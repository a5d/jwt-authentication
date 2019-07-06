import React from 'react'
import {Container, CssBaseline} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  children: JSX.Element[] | JSX.Element | string
  title?: string
}

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(6),
    marginTop: theme.spacing(6),
  }
}));


const LayoutMd = ({title, children}: Props) => {
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline/>
        {title && <h2>{title}</h2>}
        {children}
      </Container>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </>
  )
}

export default LayoutMd