<<<<<<< HEAD
import React from 'react'
=======
import React, { useState } from 'react'
>>>>>>> f80799c... Adds new pages to repo
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import Page from 'components/Page'
import ClubCard from 'components/ClubCard'
import Toolbar from 'components/HomePageToolbar'
<<<<<<< HEAD
import useGlobal from 'store'
=======
import data from './data'
>>>>>>> f80799c... Adds new pages to repo

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
<<<<<<< HEAD
  // eslint-disable-next-line
  const [globalState, globalActions] = useGlobal()
  const { activeClubs } = globalState
=======
  const [clubs] = useState(data)
>>>>>>> f80799c... Adds new pages to repo

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
<<<<<<< HEAD
            {activeClubs.map((club) => (
=======
            {clubs.map((club) => (
>>>>>>> f80799c... Adds new pages to repo
              <Grid
                item
                key={club.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ClubCard
                  className={classes.clubCard}
                  club={club}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  )
}

export default ClubList
