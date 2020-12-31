import React from 'react'
import { Twitter, Facebook, Linkedin } from 'react-social-sharing'
import { Grid } from '@material-ui/core'

const Footer = (props) => {
  const { classes } = props

  return (
    <>
      <footer className={classes.footer}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <div className={classes.footerLeft}>
              CodeClubs ©{new Date().getFullYear()} |{' '}
              <a
                href='#'
                target='new'
              >
                Terms&nbspof&nbspService
            </a>&nbsp|&nbsp<a
                href='#'
                target='new'
              >
                Privacy
            </a>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.footerRight}>
              <Facebook solid small link='https://www.facebook.com/CodeClubs/' />
              <Twitter solid small link='https://twitter.com/CodeClubs' />
              <Linkedin
                solid
                small
                link='https://www.linkedin.com/company/CodeClubs/'
              />
            </div>
          </Grid>
        </Grid>
      </footer>
    </>
  )
}

export default Footer
