import React from 'react'
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'
import Page from 'components/Page'
import Toolbar from 'components/HomePageToolbar'
import Footer from 'components/Footer'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3)
  }
}))

const ClubList = () => {
  const classes = useStyles()

  return (
    <>
      <Page
        className={classes.root}
        title="CodeClubs.org - Albuquerque NM USA - Official CodeClubs.org Website"
      >
        <Container maxWidth={false}>
          <Toolbar />
          <Box mt={3}>
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={12} sm={9}>
                <Paper elevation={3} style={{ height: '100%' }}>
                  <Box>
                    <Typography>
                      We offer various Code Clubs at various locations throughout Albuquerque, NM.
                      These clubs are open to kids ages 11+. Club registration is ongoing, so don’t
                      feel discouraged to sign up in the middle of a semester.
                  </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Please note that in response to COVID-19 all physical clubs are currently suspended
                      until further notice. We now offer virtual courses to continue serving our
                      community during the pandemic. Our virtual courses are both live and recorded.
                  </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Once you sign up via our registration forms, you will be emailed a link to
                      join the club.  Please visit our YouTube channel for additional content.
                  </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper elevation={3} style={{ height: '100%' }}>
                  <br />Popular Links
                  <br />Youtube
                  <br />Instagram
                  <br />Facebook
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={12} sm={3}>
                <Paper elevation={3} style={{ height: '100%' }}>
                  <br />Popular Links

                <br />Youtube
                <br />instagram
                <br />facebook

              </Paper>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Paper elevation={3} style={{ height: '100%' }}>

                  <Box>
                    <Typography>
                      We offer various Code Clubs at various locations throughout Albuquerque, NM.
                      These clubs are open to kids ages 11+. Club registration is ongoing, so don’t
                      feel discouraged to sign up in the middle of a semester.
                  </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Please note that in response to COVID-19 all physical clubs are currently suspended
                      until further notice. We now offer virtual courses to continue serving our
                      community during the pandemic. Our virtual courses are both live and recorded.
                  </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Once you sign up via our registration forms, you will be emailed a link to
                      join the club.  Please visit our YouTube channel for additional content.
                  </Typography>
                  </Box>

                </Paper>
              </Grid>

            </Grid>
          </Box>
        </Container>
        <Footer />
      </Page >
    </>
  )
}

export default ClubList
