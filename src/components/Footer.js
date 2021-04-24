import React from 'react'
import { Twitter, Facebook, Linkedin } from 'react-social-sharing'
import {
  Grid,
  Box,
  makeStyles,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary
  }
}))

const Footer = (props) => {
  const classes = useStyles()

  return (
    <>
      <footer className={classes.root} widget='Footer'>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              display='flex'
              height='100%'
              alignItems='center'
              justifyContent='center'
            >
              <Typography>
                CodeClubs ©{new Date().getFullYear()} |{' '}
                <a
                  href='/TermsOfService'
                  target='new'
                >
                  Terms&nbsp;of&nbsp;Service
                </a>&nbsp;|&nbsp;<a
                  href='/PrivacyPolicy'
                  target='new'
                                 >
                  Privacy
                                 </a>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              display='flex'
              height='100%'
              alignItems='center'
              justifyContent='center'
            >
              <Facebook solid small link='https://www.facebook.com/CodeClubs/' />
              <Twitter solid small link='https://twitter.com/CodeClubs' />
              <Linkedin
                solid
                small
                link='https://www.linkedin.com/company/CodeClubs/'
              />
            </Box>
          </Grid>
        </Grid>
      </footer>
    </>
  )
}

export default Footer
