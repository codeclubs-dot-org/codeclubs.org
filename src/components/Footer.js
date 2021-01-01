import React from 'react'
import { Twitter, Facebook, Linkedin } from 'react-social-sharing'
import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(3),
    flexShrink: 0,
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary
  },

}))

const Footer = (props) => {
  const classes = useStyles()

  return (
    <>
      <footer className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography>
              CodeClubs ©{new Date().getFullYear()} |{' '}
              <a
                href='#'
                target='new'
              >
                Terms&nbsp;of&nbsp;Service
            </a>&nbsp;|&nbsp;<a
                href='#'
                target='new'
              >
                Privacy
            </a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Facebook solid small link='https://www.facebook.com/CodeClubs/' />
            <Twitter solid small link='https://twitter.com/CodeClubs' />
            <Linkedin
              solid
              small
              link='https://www.linkedin.com/company/CodeClubs/'
            />
          </Grid>
        </Grid>
      </footer>
    </>
  )
}

export default Footer
