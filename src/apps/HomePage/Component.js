import React from 'react'
import SeoHeaders from 'components/Seo'

import { Grid, Paper } from '@material-ui/core'

export default function Component(props) {
  return <>
    <SeoHeaders />
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Paper>
          Welcome to CodeClubs.org!
        </Paper>
      </Grid>
    </Grid>
  </>
}
