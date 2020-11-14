import React from 'react'
import clsx from 'clsx'

import useGlobal from 'store'

import ReCAPTCHA from 'react-google-recaptcha'

import {
  Alert
} from '@material-ui/lab'

import {
  Button,
  Grid,
  TextField,
  Paper,
  FormLabel,
  TextareaAutosize,
} from '@material-ui/core'

export const FormFields = React.forwardRef((props, ref) => {

  const { classes } = props

  const [globalState, globalActions] = useGlobal()

  const {
    form,
    errors,
    config,
  } = globalState.page

  function onSubmit(event) {
    globalActions.control.submitContactForm()
  }

  function onChange(event) {
    let { name, value, checked, type } = event.target
    if (type === 'checkbox') {
      value = checked
    }
    globalActions.control.setForm({
      formName: 'contact_us',
      action: 'set',
      name: name,
      value: value
    })
  }

  function onChangeRecaptcha(event) {

  }

  return (
    <>
      <div className={classes.formfields_container}>
        <br></br>
        <br></br>
        <br></br>
        <Paper className={clsx(classes.form_fields, classes.padded_box)}>
          <Grid container spacing={3} className={classes.padded_box}>
            <Grid item xs={12}>
              <FormLabel component='legend' className={classes.form_legend}>
                How can we contact you?
              </FormLabel>
            </Grid>
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
            <Grid item xs={12}>
              <FormLabel component='legend' className={classes.form_legend}>
                How can we help?
              </FormLabel>
              <TextareaAutosize
                required
                id='body'
                name='body'
                label='How Can We Help?'
                rowsMin={10}
                value={form.body}
                onChange={onChange}
                error={Boolean(errors.body)}
                helperText={errors.body}
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              {errors.recaptcha_token &&
                <Alert severity='error'>
                  {errors.recaptcha_token}
                </Alert>}
              <ReCAPTCHA
                sitekey={config.recaptcha_key}
                onChange={onChangeRecaptcha}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' color='primary' onClick={onSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
})

export default FormFields
