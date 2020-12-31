import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import Page from 'components/Page'
import ClubCard from 'components/ClubCard'
import Toolbar from '../../../components/HomePageToolbar'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  clubCard: {
    height: '100%'
  }
}))

const ClubList = () => {
  const classes = useStyles()

  return (
    <Page
      className={classes.root}
      title="CodeClubs.org - Albuquerque NM USA"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            test
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >

        </Box>
      </Container>
    </Page>
  )
}

export default ClubList
