import React from 'react'
import {
  Grid,
  FormLabel,
  Typography,
  TextField
} from '@material-ui/core'

import useGlobal from 'store'
export const Component = (props) => {
  const [globalState, globalActions] = useGlobal()
  const { form, errors } = globalState.page
  const { classes } = props

  function onChange (event) {
    globalActions.control.setForm({
      formName: 'page',
      action: 'setConfig',
      name: 'is_processing',
      value: false
    })
    let { name, value, checked, type } = event.target
    if (type === 'checkbox') {
      value = checked
    }
    globalActions.control.setForm({
      formName: 'page',
      action: 'set',
      name: name,
      value: value
    })
  }

  return (
    <>
      <Grid item xs={12}>
        <FormLabel component='legend' className={classes.form_legend}>
          Monthly Pledge Cap
        </FormLabel>
        <Typography>Please enter the maximum amount you would like to donate each month</Typography>
        <TextField
          id='monthly_pledge_cap'
          name='monthly_pledge_cap'
          label='Monthly Pledge Cap'
          onChange={onChange}
          value={form.monthly_pledge_cap}
          error={Boolean(errors.monthly_pledge_cap)}
          helperText={errors.monthly_pledge_cap || 'Leave blank for no cap'}
        />
      </Grid>
    </>
  )
}

export default Component
