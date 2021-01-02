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
  },
  paper: {
    height: '100%',
    padding: theme.spacing(2)
  },
  gutters: {
    marginLeft: 24,
    marginRight: 24
  },
  bgtest: {
    position: 'relative',
    height: '300px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(https://codeclubs-public.s3-us-west-2.amazonaws.com/resources/Girls%2BWho%2BCode%2BAlbuquerque.jpg)',
    backgroundSize: 'cover',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      backgroundColor: 'rgba(190,190,190, .8)',
    }
  },
  whiteText: {
    backgroundColor: 'rgba(255,255,255, 1)',
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
}))

const elevation = 0

const Component = () => {
  const classes = useStyles()

  return (
    <>
      <Page
        className={classes.root}
        title="CodeClubs.org - Albuquerque NM USA - Official CodeClubs.org Website"
      >
        <Toolbar />
        <Container
          maxWidth={false}
          widget='Container'
        >
          <Box mt={3}>
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={12} sm={9}>
                <Paper elevation={elevation} className={classes.paper}>
                  <Box className={classes.bgtest}>
                    <Typography className={classes.whiteText}>
                      We offer Girls Who Code Clubs throughout the city of Albuquerque, and one day TechGirlz workshops throughout the year. We have ongoing partnerships with local and nationwide organizations such as Girls Who Code, TechGirlz, NCWIT, Girl Scouts New Mexico Trails, The City of Albuquerque, APS, and others.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper elevation={elevation} className={classes.paper}>
                  We are improving access to computer science education in New Mexico through fun, free, and inclusive clubs, classes, and workshops.
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
                <Paper elevation={elevation} className={classes.paper}>
                  <br />Popular Links
                  <br />Youtube
                  <br />instagram
                  <br />facebook
              </Paper>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Paper elevation={elevation} className={classes.paper}>
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
      </Page>
    </>
  )
}

export default Component
