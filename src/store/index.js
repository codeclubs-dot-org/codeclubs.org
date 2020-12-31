import React from 'react'
import useGlobalHook from 'use-global-hook'
import * as actions from './actions'

import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather'

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

  user: null,

  // user: { // Example of user avatar
  //   avatar: '/android-icon-48x48.png',
  //   header: 'Paul Perez',
  //   subHeader: 'Chief Dairy Officer',
  // },
  featureFlags: {
    showClubRegistration: false,
    showDashboard: false
  },

  menuOptions: [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard'
    },
    {
      href: '/app/classreg',
      icon: ShoppingBagIcon,
      title: 'Class Registration'
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: 'Account'
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Settings'
    },
    {
      href: '/login',
      icon: LockIcon,
      title: 'Login'
    },
    {
      href: '/register',
      icon: UserPlusIcon,
      title: 'Register'
    },
    {
      href: '/404',
      icon: AlertCircleIcon,
      title: 'Error'
    }
  ],

  api_active: false,
  environment: environment,

  page: {
    config: { // This is populated from the config file for this page on initial component mount.
      environment: environment,
    },
    form: form,
    errors: {},
  },

}

const useGlobal = useGlobalHook(React, initialState, actions)

export default useGlobal
