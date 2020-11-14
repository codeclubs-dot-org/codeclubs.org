import React from 'react'
import useGlobal from 'store'
import {
  Grid,
} from '@material-ui/core'

export const Component = (props) => {

  // eslint-disable-next-line
  const [globalState, globalActions] = useGlobal()

  const {
    status,
    error,
    message,
    traceback
  } = globalState


  return (
    <>
      <div style={{ marginLeft: 150 }}>
        <Grid item xs={12}>
          <h2>{status}</h2>
        </Grid>
        <Grid item xs={12}>
          <h3>{error}</h3>
        </Grid>
        <Grid item xs={12}>
          <h4>{message}</h4>
        </Grid>
        {
          process.env.NODE_ENV !== 'production' &&
          <Grid item xs={12}>
            {traceback}
          </Grid>
        }
      </div >
    </>
  )
}

export default Component
