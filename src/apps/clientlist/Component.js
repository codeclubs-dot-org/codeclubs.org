import React from 'react'
import SeoHeaders from 'components/Seo'

import { Link } from 'react-router-dom'
import { Grid, Paper } from '@material-ui/core'

import {
  IdahoVandals,
  StephenAustin,
  KirkGibson,
  Lamar,
  Lobos,
  OpHatTrick,
  NMState,
  TexasTech,
  UState,
  UArizona,
  UWyoming,
  CCAthletics,
  SouthernUtah,
  AirForce
} from 'clients/caringcent/Logos'

const parms = {
  xs: 6,
  sm: 4,
  md: 3,
  lg: 3,
  xl: 3
}
const styles = {
  container: {
    maxWidth: 'calc(768px + 16px * 2)',
    margin: '0 auto',
    display: 'flex',
    minHeight: '100%',
    padding: '16px 16px',
    flexDirection: 'column',
    backgroundImage: 'url(https://www.caringcent.com/wp-content/uploads/2020/07/Web-site-front-page.png)'
  },
  square: {
    height: '200px',
    textAlign: 'center',
    padding: '10px',
    paddingTop: '30px'
  },
  img: {
    maxWidth: '100%'
  },
  header_img: {
    width: '100%',
    padding: '10px'
  }
}
const paper = {
  elevation: 3,
  style: styles.square
}

export default function Component (props) {
  return (
    <>
      <div style={styles.container}>
        <SeoHeaders />
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Paper>
              <img
                src={CCAthletics}
                alt='Caringent Athletics'
                style={styles.header_img}
              />
            </Paper>
          </Grid>
          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/unm/UNMFootball'>
                <img src={Lobos} alt='Lobos' style={styles.img} />
              </Link>
            </Paper>
          </Grid>
          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/usu/fancutout'>
                <img src={UState} alt='UState' style={styles.img} />
              </Link>
            </Paper>
          </Grid>
          <Grid item {...parms}>
            <Paper {...paper}>
            <Link to='/nmsu/4state'>
                <img src={NMState} alt='NMState' style={styles.img} />
              </Link>
            </Paper>
          </Grid>


          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/ttu/virtualkickoff'>
                <img src={TexasTech} alt='Texas Tech' style={styles.img} />
              </Link>
            </Paper>
          </Grid>


          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/sfa/raisetheaxe'>
                <img
                  src={StephenAustin}
                  alt='Stephen Austin'
                  style={styles.img}
                />
              </Link>
            </Paper>
          </Grid>
          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/af/letsfly'>
                <img
                  src={AirForce}
                  alt='AirForce'
                  style={styles.img}
                />
              </Link>
            </Paper>
          </Grid>

          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/suu/takeflight'>
                <img src={SouthernUtah} alt='SUU' style={styles.img} />
              </Link>
            </Paper>
          </Grid>
          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/uwyo/wyomingnow'>
                <img src={UWyoming} alt='UWyoming' style={styles.img} />
              </Link>
            </Paper>
          </Grid>
          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/'>
                <img
                  src={IdahoVandals}
                  alt='Idaho Vandals'
                  style={styles.img}
                />
              </Link>
            </Paper>
          </Grid>
          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/'>
                <img src={KirkGibson} alt='Kirk Gibson' style={styles.img} />
              </Link>
            </Paper>
          </Grid>
          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/lu/givingday'>
                <img src={Lamar} alt='Lamar' style={styles.img} />
              </Link>
            </Paper>
          </Grid>
          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/'>
                <img src={OpHatTrick} alt='OpHatTrick' style={styles.img} />
              </Link>
            </Paper>
          </Grid>


          <Grid item {...parms}>
            <Paper {...paper}>
              <Link to='/'>
                <img src={UArizona} alt='UArizona' style={styles.img} />
              </Link>
            </Paper>
          </Grid>
        </Grid>
       
      </div>
    </>
  )
}
