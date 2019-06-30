import React, {ChangeEvent, FormEvent} from 'react'
import {Button, Container, CssBaseline, Avatar, Typography, TextField, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
  },
}));

export interface Props {
  email?: string,
  password?: string,
  error?: string,
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void,
  updateInput?: (event: ChangeEvent<HTMLInputElement>) => void,
  icon?: JSX.Element,
  name?: string,
  link?: JSX.Element,
  emailError?: string,
  passwordError?: string
}

const LoginForm = (props: Props) => {
  const classes = useStyles();
  const {email, password, error, onSubmit, updateInput, icon, name, link, emailError, passwordError} = props

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {icon}
        </Avatar>
        <Typography component="h1" variant="h5">
          {name}
        </Typography>
        {error && <p className={classes.error}>{error}</p>}
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={updateInput}
            value={email}
          />
          <div className={classes.error}>{emailError}</div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={updateInput}
            value={password}
          />
          <div className={classes.error}>{passwordError}</div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {name}
          </Button>
          <Grid container>
            <Grid item xs> </Grid>
            <Grid item>
              {link}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default LoginForm
