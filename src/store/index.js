import React from 'react'
import globalHook from 'use-global-hook'
import * as actions from './actions'
import { v4 as uuid } from 'uuid'

import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon
} from 'react-feather'

import awsconfig from 'aws-exports'
const environment = awsconfig.aws_cloud_logic_custom[0].endpoint
  .split('/')
  .pop()

const form = {
  email_address:
    process.env.NODE_ENV === 'production'
      ? ''
      : `test-cc-${Math.round(Math.random() * 200)}@paulperez.net`,
  first_name: process.env.NODE_ENV === 'production' ? '' : 'Paul',
  last_name: process.env.NODE_ENV === 'production' ? '' : 'Perez',
  postal_code: process.env.NODE_ENV === 'production' ? '' : '91745',
  street_address:
    process.env.NODE_ENV === 'production' ? '' : '2020 Super Nova Rd',
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
    showContribute: false,
    showDashboard: false
  },

  menuOptions: [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard'
    },
    {
      href: '/app/team',
      icon: BarChartIcon,
      title: 'Teams'
    },
    {
      href: '/app/classes',
      icon: ShoppingBagIcon,
      title: 'Classes'
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

  activeClubs: [
    {
      id: uuid(),
      registrationDeadline: 'Jan 11, 2021',
      startDate: 'Jan 28, 2021',
      description: 'Beginning Arduino',
      media:
        'https://codeclubs-public.s3-us-west-2.amazonaws.com/Board+Member+%2B+Facilitator+Headshots/Avatar.jpg',
      title: 'Intro to Arduino',
      numSeats: '7'
    },
    {
      id: uuid(),
      registrationDeadline: 'Feb 14, 2021',
      startDate: 'Feb 28, 2021',
      description: 'Beginning Javascript',
      media: '/static/images/products/product_1.png',
      title: 'Intro to Javascript',
      numSeats: '4'
    },
    {
      id: uuid(),
      registrationDeadline: 'Jan 11, 2021',
      startDate: 'Jan 28, 2021',
      description: 'Intermediate Web',
      media: '/static/images/products/product_1.png',
      title: 'Web Programming',
      numSeats: '1'
    }
  ],

  api_active: false,
  environment: environment,

  page: {
    config: {
      // This is populated from the config file for this page on initial component mount.
      environment: environment
    },
    form: form,
    errors: {}
  }
}

const useGlobal = globalHook(React, initialState, actions)

export default useGlobal
