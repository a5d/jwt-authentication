import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
      padding: 0,
      margin: 0
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}))

export default useStyles
