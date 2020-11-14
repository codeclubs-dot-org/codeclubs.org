import React from 'react'
import {
  Grid,
  TextField
} from '@material-ui/core'

import useGlobal from 'store'
export const Component = React.forwardRef((props, ref) => {
  const [globalState, globalActions] = useGlobal()
  const { form, errors, config } = globalState.page

  function onChange(event) {
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
      <Grid item xs={12} sm={6}>
        <TextField
          ref={ref}
          required
          id='first_name'
          name='first_name'
          label='First Name'
          value={form.first_name}
          fullWidth
          autoComplete='fname'
          onChange={onChange}
          error={Boolean(errors.first_name)}
          helperText={errors.first_name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id='last_name'
          name='last_name'
          label='Last Name'
          value={form.last_name}
          fullWidth
          autoComplete='lname'
          onChange={onChange}
          error={Boolean(errors.last_name)}
          helperText={errors.last_name}
        />
      </Grid>
      {config.SHOW_PHONE_NUMBER
        ? <>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='email_address'
              name='email_address'
              label='Email Address'
              value={form.email_address}
              fullWidth
              autoComplete='emailaddress'
              onChange={onChange}
              error={Boolean(errors.email_address)}
              helperText={errors.email_address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='phone_number'
              name='phone_number'
              label='Phone Number'
              value={form.phone_number}
              fullWidth
              autoComplete='phone'
              onChange={onChange}
              error={Boolean(errors.phone_number)}
              helperText={errors.phone_number}
            />
          </Grid>
        </>
        : <>
          <Grid item xs={12}>
            <TextField
              required
              id='email_address'
              name='email_address'
              label='Email Address'
              value={form.email_address}
              fullWidth
              autoComplete='emailaddress'
              onChange={onChange}
              error={Boolean(errors.email_address)}
              helperText={errors.email_address}
            />
          </Grid>
        </>}
      <Grid item xs={12} sm={7}>
        <TextField
          required
          id='street_address'
          name='street_address'
          label='Street Address'
          value={form.street_address}
          fullWidth
          autoComplete='street-address'
          onChange={onChange}
          error={Boolean(errors.street_address)}
          helperText={errors.street_address}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <TextField
          required
          id='postal_code'
          name='postal_code'
          label='Postal Code'
          value={form.postal_code}
          fullWidth
          autoComplete='postal-code'
          onChange={onChange}
          error={Boolean(errors.postal_code)}
          helperText={errors.postal_code}
        />
      </Grid>
    </>
  )
})

export default Component
