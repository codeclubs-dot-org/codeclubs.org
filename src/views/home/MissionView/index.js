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
  bgImage: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(https://codeclubs-public.s3-us-west-2.amazonaws.com/resources/Girls+Who+Code+Albuquerque.jpg)',
    backgroundSize: 'cover',
    '&before': {
      content: '',
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      backgroundColor: 'rgba(0,0,0,.73)'
    }
  }
}))

const elevation = 0

const Component = () => {
  const classes = useStyles()

  return (
    <>
      <Page
        className={classes.root}
        title='CodeClubs.org - Albuquerque NM USA - Official CodeClubs.org Website'
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
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    m={3}
                  >
                    <Typography variant='h2'>
                      Our Mission
                    </Typography>
                  </Box>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    m={3}
                  >
                    <Typography variant='body1'>
                      Our mission is to improve access to computer science education in New Mexico through fun, free, and inclusive clubs, classes, and workshops.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper elevation={elevation} className={classes.paper} />
              </Grid>
            </Grid>
          </Box>
          <Box
            mt={3}
            display='flex'
            justifyContent='center'
          >
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={12}>
                <Paper elevation={elevation} className={classes.paper}>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    m={3}
                  >
                    <Typography variant='body1'>
                      We offer Girls Who Code Clubs throughout the city of Albuquerque, and one day TechGirlz workshops throughout the year. We have ongoing partnerships with local and nationwide organizations such as Girls Who Code, TechGirlz, NCWIT, Girl Scouts New Mexico Trails, The City of Albuquerque, APS, and others. Together, we are working to close the gender gap in technology and change the image of what a programmer looks like and does.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <Box
            mt={3}
            display='flex'
            justifyContent='center'
          >
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={12} sm={4}>
                <Paper elevation={elevation} className={classes.paper}>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    m={3}
                  >
                    <Typography variant='h3'>
                      Our Values
                    </Typography>
                  </Box>
                  <ul>
                    <li>Diversity and Inclusion </li>
                    <li>Bravery and Resilience - we teach bravery not perfection </li>
                    <li>Curiosity</li>
                    <li>Empathy and Respect</li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Paper elevation={elevation} className={classes.paper}>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    m={3}
                  >
                    <Typography variant='h2'>
                      Want to learn more?
                    </Typography>
                  </Box>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    m={3}
                  >
                    <Typography variant='body1'>
                      We welcome community members to attend our monthly board meetings which happen every third Saturday at 11am. Contact us to let us know if you’ll be attending and we will give you the location details.
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
