import React from 'react'
import clsx from 'clsx'
import 'braintree-web'
import DropIn from 'braintree-web-drop-in-react'
import context from 'util/context'

import ReCAPTCHA from 'react-google-recaptcha'

import useGlobal from 'store'
import { API } from 'aws-amplify'
import { getApiIdentifier } from 'util/api'

import faker from 'faker'

import { Alert } from '@material-ui/lab'

import {
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  TextField
} from '@material-ui/core'

import * as Yup from 'yup'

export const FormFields = React.forwardRef((props, ref) => {
  const { classes, config } = props

  const [globalActions] = useGlobal()

  const [handle, setHandle] = React.useState()
  const [clientToken, setClientToken] = React.useState('')
  const [form, setForm] = React.useState({
    firstName:
      process.env.NODE_ENV === 'production' ? '' : faker.name.firstName(),
    lastName:
      process.env.NODE_ENV === 'production' ? '' : faker.name.lastName(),
    emailAddress:
      process.env.NODE_ENV === 'production' ? '' : 'paul@caringcent.com', // faker.internet.email(),
    amount: config.donation_initial_amount,
    other_amount: process.env.NODE_ENV === 'production' ? '' : '3',
    phoneNumber: undefined,
    streetAddress:
      process.env.NODE_ENV === 'production'
        ? ''
        : '11809 San Victorio Avenue Northeast',
    postalCode: process.env.NODE_ENV === 'production' ? '' : '87111',
    remain_anonymous: false,
    anonymous_name: false,
    anonymous_gift: false,
    in_honor_or_memorium: false,
    in_honor: false,
    in_memory: false,
    specialFund: '',
    honoree_name: '',
    honoree_special_instructions: '',
    company_will_match: false,
    estate_giving: false,
    considering_estate_giving: false,
    already_included_estate_giving: false,
    donation_amount: context.round(config.donation_initial_amount),
    processing_fee: context.round(
      context.calc_fee(config.donation_initial_amount)
    ),
    totalAmount: context.round(config.donation_initial_amount),
    pay_processing_fee: false,
    recaptcha_token: ''
  })
  const [errors, setErrors] = React.useState({})
  const [isProcessing, setIsProcessing] = React.useState(false)

  const yupConfig = {
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    emailAddress: Yup.string()
      .email('Invalid email')
      .required('Required'),
    streetAddress: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    postalCode: Yup.string()
      .min(5, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
    recaptcha_token: Yup.string().required('Please check the box below'),
    totalAmount: Yup.number().min(5, 'Minimum $5')
  }
  // This doesnt work on blank fields. Just comment out for nowas phone is not required.
  // if (config.SHOW_PHONE_NUMBER) {
  //   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  //   yupConfig.phoneNumber = Yup.string().matches(phoneRegExp, 'Phone number is not valid').notRequired()
  // }
  const Schema = Yup.object().shape(yupConfig)

  React.useEffect(() => {
    const init = {
      body: {
        env: process.env.NODE_ENV,
        action: 'get_braintree_token',
        version: 'v1',
        ts: new Date().toISOString()
      }
    }
    API.post(getApiIdentifier('DonateEvents'), '/event', init)
      .then(response => {
        setClientToken(response.braintree_client_token)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const Submit = async () => {
    try {
      const nonce = await handle.requestPaymentMethod()
      const init = {
        body: {
          env: process.env.NODE_ENV,
          action: 'sale',
          version: 'v1',
          ts: new Date().toISOString(),
          ...nonce,
          ...form,
          descriptor: config.descriptor,
          campaign: config.campaign,
          acronym: config.acronym
        }
      }
      API.post(getApiIdentifier('DonateEvents'), '/event', init)
        .then(response => {
          setIsProcessing(false)
          if (response.status === 'ERROR') {
            if (response.message) {
              setErrors({ payment_error: response.message })
            } else {
              setErrors({
                payment_error: 'An error ocurred while processing your payment'
              })
            }
          } else {
            globalActions.control.setPaymentSuccess()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        })
        .catch(error => {
          setIsProcessing(false)
          setErrors({ payment_error: error })
        })
    } catch (error) {
      setIsProcessing(false)
      if (error.message) {
        let message
        if (error.message === 'No payment method is available.') {
          message = 'Please enter a payment method below'
        } else {
          message = error.message
        }
        setErrors({ payment_error: message })
      } else {
        setErrors({ payment_error: error })
      }
    }
  }

  function StyledRadio (props) {
    return (
      <Radio
        className={classes.root}
        disableRipple
        color='default'
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    )
  }

  function onChange (event) {
    setIsProcessing(false)
    let { name, value, checked, type } = event.target

    if (type === 'checkbox') {
      value = checked
    }
    if (
      name === 'amount' ||
      name === 'other_amount' ||
      name === 'pay_processing_fee'
    ) {
      let amount = form.amount === 'Other' ? form.other_amount : form.amount
      let payFee = form.pay_processing_fee
      if (name === 'amount') {
        if (value === 'Other') {
          amount = form.other_amount
        } else {
          amount = value
        }
      } else if (name === 'other_amount') {
        amount = value
      } else if (name === 'pay_processing_fee') {
        payFee = value
      }
      const fee = context.calc_fee(amount)
      const totalAmount = context.round(parseFloat(amount) + (payFee ? fee : 0))
      const data = {
        [name]: value,
        processing_fee: context.formatMoney(fee),
        totalAmount: totalAmount,
        donation_amount: context.formatMoney(amount)
      }
      setForm({ ...form, ...data })
      // handle.updateConfiguration('paypal', 'amount', totalAmount)
      if (name === 'other_amount') {
        if (totalAmount < 5) {
          setErrors({ ...errors, totalAmount: '$5 minimum' })
        } else {
          setErrors({ ...errors, totalAmount: null })
        }
      }
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  function onChangeRecaptcha (event) {
    setIsProcessing(false)
    setForm({ ...form, recaptcha_token: event })
  }

  function onSkipSubmit (event) {
    globalActions.control.setPaymentSuccess()
  }

  function onSubmit (event) {
    setIsProcessing(true)
    Schema.validate(form, { abortEarly: false })
      .then(a => {
        setErrors({})
        if (form.amount === 'Other' && !form.other_amount) {
          context.scrollToRef(ref)
          return
        }
        Submit()
      })
      .catch(err => {
        const errorContainer = {}
        err.inner.forEach(element => {
          errorContainer[element.path] = element.message
        })
        setErrors(errorContainer)
        context.scrollToRef(ref)
      })
  }

  return (
    <>
      <div className={classes.formfields_container}>
        <Paper className={clsx(classes.form_fields, classes.padded_box)}>
          {clientToken && (
            <>
              <Grid container spacing={6} className={classes.padded_box}>
                <Grid item xs={12}>
                  <FormLabel component='legend' className={classes.form_legend}>
                    Personal Information
                  </FormLabel>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    ref={ref}
                    required
                    id='firstName'
                    name='firstName'
                    label='First Name'
                    value={form.firstName}
                    fullWidth
                    autoComplete='fname'
                    onChange={onChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='lastName'
                    name='lastName'
                    label='Last Name'
                    value={form.lastName}
                    fullWidth
                    autoComplete='lname'
                    onChange={onChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={config.SHOW_PHONE_NUMBER ? 6 : 0}>
                  <TextField
                    required
                    id='emailAddress'
                    name='emailAddress'
                    label='Email Address'
                    value={form.emailAddress}
                    fullWidth
                    autoComplete='emailaddress'
                    onChange={onChange}
                    error={Boolean(errors.emailAddress)}
                    helperText={errors.emailAddress}
                  />
                </Grid>
                {config.SHOW_PHONE_NUMBER && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id='phoneNumber'
                      name='phoneNumber'
                      label='Phone Number'
                      value={form.phoneNumber}
                      fullWidth
                      autoComplete='phone'
                      onChange={onChange}
                      error={Boolean(errors.phoneNumber)}
                      helperText={errors.phoneNumber}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={7}>
                  <TextField
                    required
                    id='streetAddress'
                    name='streetAddress'
                    label='Street Address'
                    value={form.streetAddress}
                    fullWidth
                    autoComplete='street-address'
                    onChange={onChange}
                    error={Boolean(errors.streetAddress)}
                    helperText={errors.streetAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    id='postalCode'
                    name='postalCode'
                    label='Postal Code'
                    value={form.postalCode}
                    fullWidth
                    autoComplete='postal-code'
                    onChange={onChange}
                    error={Boolean(errors.postalCode)}
                    helperText={errors.postalCode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component='fieldset'>
                    <FormLabel
                      component='legend'
                      className={classes.form_legend}
                    >
                      {config.donation_amount_text}
                    </FormLabel>
                    <RadioGroup
                      defaultValue='50'
                      aria-label='donation'
                      name='amount'
                      onChange={onChange}
                      value={form.amount}
                    >
                      <Grid container spacing={1}>
                        {config.donation_amounts.map(amount => (
                          <Grid key={amount} item xs={6} sm={3}>
                            <FormControlLabel
                              value={amount}
                              control={<StyledRadio />}
                              label={'$' + context.formatMoney(amount, 0)}
                            />
                          </Grid>
                        ))}
                        <Grid item xs={6} sm={3}>
                          <FormControlLabel
                            value='Other'
                            control={<StyledRadio />}
                            label='Other'
                          />
                        </Grid>
                        {form.amount === 'Other' && (
                          <Grid item xs={6} sm={3}>
                            <TextField
                              required
                              id='other_amount'
                              name='other_amount'
                              label='Other Amount'
                              fullWidth
                              onChange={onChange}
                              value={form.other_amount}
                              error={
                                Boolean(errors.amount) ||
                                (form.amount === 'Other' && !form.other_amount)
                              }
                              helperText={
                                errors.amount ||
                                (form.amount === 'Other' && !form.other_amount
                                  ? 'Amount Required'
                                  : '')
                              }
                            />
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          {errors.totalAmount ? (
                            <>
                              <Alert severity='error'>
                                {errors.totalAmount}
                              </Alert>
                            </>
                          ) : (
                            <>
                              <FormHelperText>
                                There is a $5 minimum donation.
                              </FormHelperText>
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {config.SHOW_PAY_PROCESSING_FEE && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.pay_processing_fee}
                          onChange={onChange}
                          name='pay_processing_fee'
                          id='pay_processing_fee'
                          value='pay_processing_fee'
                        />
                      }
                      label={
                        config.PAY_PROCESSING_FEE_TEXT +
                        ' of $' +
                        form.processing_fee
                      }
                    />
                  )}{' '}
                  {/* END SHOW_PAY_PROCESSING_FEE */}
                </Grid>
                {config.specialFund && (
                  <>
                    <Grid item xs={12} md={6}>
                      <FormControl className={classes.specialFund}>
                        <FormLabel
                          component='legend'
                          className={classes.form_legend}
                        >
                          I would like my donation to go to the following fund:
                        </FormLabel>

                        <Select
                          id='specialFund'
                          name='specialFund'
                          value={form.specialFund}
                          onChange={onChange}
                        >
                          {config.specialFund.map(item => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} />
                  </>
                )}
                <Grid item xs={12}>
                  {errors.payment_error && (
                    <Alert severity='error'>{errors.payment_error}</Alert>
                  )}
                  <DropIn
                    options={{
                      authorization: clientToken,
                      card: {},
                      // paypal : {
                      //   flow: 'checkout',
                      //   amount: form.totalAmount,
                      //   currency: 'USD'
                      // },
                      dataCollector: {
                        kount: {
                          environment:
                            process.env.NODE_ENV === 'production'
                              ? 'production'
                              : 'sandbox'
                        }
                      }
                    }}
                    onInstance={setHandle}
                    onChange={() => {
                      setErrors({ ...errors, ...{ payment_error: null } })
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.padded_box}>
                <FormControl
                  component='fieldset'
                  className={classes.formControl}
                >
                  <FormLabel component='legend' />
                  <FormGroup>
                    {config.SHOW_REMAIN_ANONYMOUS && (
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.remain_anonymous}
                              onChange={onChange}
                              name='remain_anonymous'
                              id='remain_anonymous'
                              value='remain_anonymous'
                            />
                          }
                          label='I would like to remain anonymous.'
                        />
                        {form.remain_anonymous && (
                          <div>
                            <FormControlLabel
                              className={classes.indented}
                              control={
                                <Checkbox
                                  checked={form.anonymous_gift}
                                  onChange={onChange}
                                  name='anonymous_gift'
                                  id='anonymous_gift'
                                  value='anonymous_gift'
                                />
                              }
                              label='I would like my gift amount to be anonymous.'
                            />
                            <FormControlLabel
                              className={classes.indented}
                              control={
                                <Checkbox
                                  checked={form.anonymous_name}
                                  onChange={onChange}
                                  name='anonymous_name'
                                  id='anonymous_name'
                                  value='anonymous_name'
                                />
                              }
                              label='I would like my to name to be anonymous.'
                            />
                          </div>
                        )}
                      </div>
                    )}{' '}
                    {/* END SHOW_REMAIN_ANONYMOUS */}
                    {config.SHOW_IN_MEMORY_OF && (
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.in_honor_or_memorium}
                              onChange={onChange}
                              name='in_honor_or_memorium'
                              id='in_honor_or_memorium'
                              value='in_honor_or_memorium'
                            />
                          }
                          label='My gift is in honor or memory of someone.'
                        />
                        {form.in_honor_or_memorium && (
                          <TextField
                            className={classes.indented}
                            id='honoree_name'
                            name='honoree_name'
                            label='Honoree Name'
                            fullWidth
                            onChange={onChange}
                            value={form.honoree_name}
                            error={Boolean(errors.honoree_name)}
                            helperText={errors.honoree_name}
                          />
                        )}
                      </div>
                    )}{' '}
                    {/* END SHOW_IN_MEMORY_OF */}
                  </FormGroup>
                </FormControl>
                <br />
                {errors.recaptcha_token && (
                  <Alert severity='error'>{errors.recaptcha_token}</Alert>
                )}
                <ReCAPTCHA
                  sitekey={config.recaptcha_key}
                  onChange={onChangeRecaptcha}
                />
              </Grid>

              <Grid item xs={12} className={classes.padded_box}>
                <Typography variant='body1' paragraph>
                  Donations are processed through our partner and will show up
                  on credit card statements as "CaringCent".
                </Typography>
                By clicking the Submit button, you agree to our{' '}
                <a href={config.terms_of_service_url} target='new'>
                  Terms of Service
                </a>
              </Grid>
              <Grid item xs={12} className={classes.padded_box}>
                {clientToken && (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={onSubmit}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Submit'}
                  </Button>
                )}
                {process.env.NODE_ENV === 'development' && (
                  <>
                    <br />
                    <br />
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={onSkipSubmit}
                    >
                      Go To Thank You
                    </Button>{' '}
                    (This goes away in Production)
                  </>
                )}
              </Grid>
            </>
          )}{' '}
          {/* End clientToken */}
        </Paper>
      </div>
    </>
  )
})

export default FormFields
