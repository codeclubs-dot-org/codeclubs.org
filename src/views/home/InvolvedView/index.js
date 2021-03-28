import React from 'react'
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import Page from 'components/Page'
import Toolbar from 'components/HomePageToolbar'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}))

const Component = () => {
  const classes = useStyles()

  return (
    <Page
      className={classes.root}
      title="CodeClubs.org - Albuquerque NM USA"
    >
      <p>test</p>
    </Page>
  )
}

export default Component
