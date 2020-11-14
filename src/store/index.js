import React from 'react'
import useGlobalHook from 'use-global-hook'
import * as actions from './actions'

import awsconfig from 'aws-exports'
const environment = awsconfig.aws_cloud_logic_custom[0].endpoint.split('/').pop()

const form = {
  email_address: process.env.NODE_ENV === 'production' ? '' : `test-cc-${Math.round(Math.random() * 200)}@paulperez.net`,
  first_name: process.env.NODE_ENV === 'production' ? '' : 'Paul',
  last_name: process.env.NODE_ENV === 'production' ? '' : 'Perez',
  postal_code: process.env.NODE_ENV === 'production' ? '' : '91745',
  street_address: process.env.NODE_ENV === 'production' ? '' : '2020 Super Nova Rd',
  recaptcha_token: '',
  monthly_pledge_cap: '',
  total_charge_amount: 0
}

const initialState = {
  status: 'INITIAL',

  api_active: false,
  environment: environment,

  page: {
    config: { // This is populated from the config file for this page on initial component mount.
      environment: environment,
    },
    form: form,
    errors: {},
    spot: {
      selected: false,
      option: '',
      value: 0,
    },
    golf: {},
    metrics: {},
    line_items: []
  },

}

const useGlobal = useGlobalHook(React, initialState, actions)

export default useGlobal
