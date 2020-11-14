import React from 'react'
import useGlobal from 'store'

import {
  Alert
} from '@material-ui/lab'

import ReCAPTCHA from 'react-google-recaptcha'

export const Component = (props) => {

  const [globalState, globalActions] = useGlobal()

  const {
    errors,
    config
  } = globalState.page

  function onChange(event) {
    globalActions.control.setForm({
      formName: 'page',
      action: 'setConfig',
      name: 'is_processing',
      value: false
    })
    globalActions.control.setForm({
      formName: 'page',
      action: 'set',
      name: 'recaptcha_token',
      value: event
    })
  }

  return (
    <>
      <span error-id="recaptcha_token"></span>
      {errors.recaptcha_token &&
        <Alert severity='error'>
          {errors.recaptcha_token}
        </Alert>
      }
      <ReCAPTCHA
        sitekey={config.recaptcha_key}
        onChange={onChange}
      />

    </>
  )
}

export default Component
