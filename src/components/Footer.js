import React from 'react'
import { Twitter, Facebook, Linkedin, Insta } from 'react-social-sharing'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => {
  const footerCell = {
    margin: '1rem',
    height: '10rem',
    display: 'flex',
    fontFamily: theme.fontFamily.display,
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& > a': {
      color: 'yellow',
      'text-decoration': 'underline',
      '&:visited': {
        color: 'orangered'
      }
    }
  }

  return {
    root: {
      minHeight: '5rem',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },
    cellHeader: {
      fontFamily: theme.fontFamily.sans,
      'text-transform': 'uppercase',
      fontSize: '1.5rem',
      marginBottom: '1.5rem'
    },
    bigFooterCell: {
      ...footerCell,
      width: '20rem'
    },
    smallFooterCell: {
      ...footerCell,
      width: '20rem'
    },
    separator: {
      [theme.breakpoints.up('sm')]: {
        borderLeft: '1px solid rgba(255,255,255,.3)',
        width: '1px',
        height: '10rem'
      },
      [theme.breakpoints.down('sm')]: {
        borderTop: '1px solid rgba(255,255,255,.3)',
        height: '1px',
        width: '90%'
      }
    }
  }
})

// TODO(sixstring982): Add the signup-for-newsletter functionality.
// TODO(sixstring982): Add links to Facilitator/GuestSpeaker/Donate pages
const Footer = props => {
  const classes = useStyles()

  return (
    <footer className={classes.root} widget='Footer'>
      <div class={classes.bigFooterCell}>
        <p>
          CodeClubs.org is a nonprofit working to strengthen the STEM workforce
          in New Mexico through free education and training.
        </p>
        &nbsp;
        <p> © 2021 CODECLUBS.ORG </p>
        {Twitter} {Linkedin} {Facebook} {Insta}
      </div>
      <div class={classes.separator}></div>
      <div class={classes.smallFooterCell}>
        <div class={classes.cellHeader}>Contact</div>
        <p>PO Box 20198</p>
        <p>Albuquerque, NM 87154</p>
        <a href='mailto:info@codeclubs.org'>info@codeclubs.org</a>
        <a href='tel:15056001775'>505-600-1775</a>
      </div>
      <div class={classes.separator}></div>
      <div class={classes.smallFooterCell}>
        <div class={classes.cellHeader}>Partnerships</div>

        <a href='https://girlswhocode.com'>Girls Who Code</a>
        <a href='https://techgirlz.org'>Tech Girlz</a>
        <a href='https://brainhackers.net'>Brain Hackers</a>
      </div>
      <div class={classes.separator}></div>
      <div class={classes.smallFooterCell}>
        <div class={classes.cellHeader}>Get involved</div>

        <a href='/#'>Facilitator</a>
        <a href='/#'>Guest speaker</a>
        <a href='/#'>Donate</a>
      </div>
    </footer>
  )
}

export default Footer
