import React from 'react'
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Page from 'components/Page'
import Toolbar from 'components/HomePageToolbar'
import Footer from 'components/Footer'
import clsx from 'clsx'
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
  bgImage1: {
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
      backgroundColor: 'rgba(152, 66, 211, 0.63)'
    }
  },
  bgImage2: {
    position: 'relative',
    height: '200px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(https://codeclubs-public.s3-us-west-2.amazonaws.com/resources/CodeClubs.jpg)',
    backgroundSize: 'cover',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      backgroundColor: 'rgba(211,77,152,0.63)'
    }
  },
  whiteText: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: '#FFFFFF',
    opacity: '.9'
  }
}))

const elevation = 3

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
          <Alert severity="error">
            In response to COVID-19 all physical clubs are currently suspended
            until further notice. We now offer virtual courses to continue serving our
            community during the pandemic.
          </Alert>
          <Box mt={3}>
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={12}>
                <Paper elevation={elevation} className={classes.paper}>
                  <Box className={classes.bgImage1}>
                    <Typography className={classes.whiteText}>
                      We are improving access to computer science education in New Mexico through fun, free, and inclusive clubs, classes, and workshops.
                    </Typography>
                  </Box>
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
                  <Box
                    mt={3}
                    display="flex"
                    justifyContent="center"
                  >
                    <img src="/apple-icon-152x152.png" alt="code clubs" style={{ width: '100%' }} />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Paper elevation={elevation} className={classes.paper}>
                  <Box className={classes.bgImage2}>
                    <Typography className={classes.whiteText}>
                      We offer various Code Clubs at various locations throughout Albuquerque, NM.
                      These clubs are open to kids ages 11+. Club registration is ongoing, so don’t
                      feel discouraged to sign up in the middle of a semester.
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
