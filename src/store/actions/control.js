import deepmerge from 'deepmerge'
import * as Yup from 'yup'
import context from 'util/context'

const rallySchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email_address: Yup.string()
    .email('Invalid email')
    .required('Required'),
  street_address: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  postal_code: Yup.string()
    .min(5, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  recaptcha_token: Yup.string()
    .required('Please check the box below'),
})

export const setPaymentSuccess = (store) => {
  store.setState({ status: 'PAYMENT_SUCCESS' })
}

export const setPageConfig = (store, config) => {
  mergeState(store, { page: { config: config } }, true)
}

export const submitSendReceipt = async (store) => {
  const { state } = store
  store.actions.api.performApi({
    apiName: 'Events',
    apiPath: '/event',
    apiAction: 'send-receipt',
    apiPayload: { ...state }
  })
}

export const submitDonateForm = async (store, braintree_instance) => {

  let nonce, newErrors = {}, okToSubmit = true

  let {
    errors,
    form,
    metrics,
    spot,
    golf,
  } = store.state.page

  for (const [key] of Object.entries(errors)) {
    newErrors[key] = ''
  }

  try {
    nonce = await braintree_instance.requestPaymentMethod()
  } catch (error) {
    store.actions.control.setForm({
      formName: 'page',
      action: 'setConfig',
      name: 'is_processing',
      value: false
    })
    if (error.message) {
      let message
      if (error.message === 'No payment method is available.') {
        message = "Please enter a payment method below"
      } else {
        message = error.message
      }
      newErrors.payment_method = message
    } else {
      newErrors.payment_method = error
    }
    okToSubmit = false
  }

  try {
    await rallySchema.validate(form, { abortEarly: false })
  } catch (err) {
    err.inner.forEach((element) => {
      newErrors[element.path] = element.message
      okToSubmit = false
    })
  }
  let num = 0
  if (spot.selected) {
    num++
    if (spot.value) {
      if (spot.value < 5) {
        spot.value_error = 'There is a $5 minimum donation.'
        newErrors.spot_donation = 'There is a $5 minimum donation.'
        okToSubmit = false
      }
    } else {
      spot.value_error = 'Required'
      newErrors.spot_donation = 'There is a $5 minimum donation.'
      okToSubmit = false
    }
  }
  // eslint-disable-next-line
  for (const [key, metric] of Object.entries(metrics)) {
    if (metric.selected === true) {
      num++
      if (!metric.value) {
        newErrors.metric_error = "A dollar value is required for all selected items"
        okToSubmit = false
      }
    }
  }
  if (golf.option && golf.value && golf.text) {
    num++
  }
  if (num === 0) {
    newErrors.metric_error = "At least one selection or one-time donation is required"
    okToSubmit = false
  }
  if (newErrors.first_name ||
    newErrors.last_name ||
    newErrors.email_address ||
    newErrors.street_address ||
    newErrors.postal_code) {
    context.animateScrollTo('label[for="first_name"]')
  } else if (newErrors.metric_error) {
    context.animateScrollTo('[error-id="metric_error"]')
  } else if (newErrors.spot_donation) {
    context.animateScrollTo('[error-id="spot_donation"]')
  } else if (newErrors.payment_method) {
    context.animateScrollTo('[error-id="payment_method"]')
  } else if (newErrors.recaptcha_token) {
    context.animateScrollTo('[error-id="recaptcha_token"]')
  }
  mergeState(store, { page: { errors: newErrors } }, true)

  if (okToSubmit) {
    let payload = {
      ...store.state,
      braintree_nonce: nonce
    }

    store.actions.control.setForm({
      formName: 'page',
      action: 'setConfig',
      name: 'is_processing',
      value: true
    })

    store.actions.api.performApi({
      apiName: 'Events',
      apiPath: '/event',
      apiAction: 'donate',
      apiPayload: payload,
      callback: response => {
        store.actions.control.setForm({
          formName: 'page',
          action: 'setConfig',
          name: 'is_processing',
          value: false
        })
        if (response.status === 'PAYMENT_SUCCESS') {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      }
    })
  }
}

const setFormReducer = (store, action) => {
  let {
    form,
    errors,
    config
  } = store.state[action.formName]

  if (action.name === 'recaptcha_token') {
    if (action.value === null) {
      action.value = ''
    }
  }

  switch (action.action) {
    case 'set':
      form[action.name] = action.value
      break
    case 'setConfig':
      config[action.name] = action.value
      break
    case 'setError':
      errors[action.name] = action.value
      break
    case 'loadForm':
      form = { ...action.form }
      break
    case 'clear':
      if (form.hasOwnProperty(action.name)) {
        form[action.name] = ''
      }
      if (errors.hasOwnProperty(action.name)) {
        errors[action.name] = ''
      }
      break
    case 'clearAll':
      for (let key in form) {
        if (form.hasOwnProperty(key)) {
          form[key] = ''
        }
      }
      for (let key in errors) {
        if (errors.hasOwnProperty(key)) {
          errors[key] = ''
        }
      }
      break
    default:
      break
  }

  return { [action.formName]: { form, errors, config } }
}

export const setForm = async (store, action) => {
  mergeState(store, setFormReducer(store, action), true)
}

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray

export const mergeState = async (store, state, overwriteArray = false) => {
  if (overwriteArray) {
    store.setState(deepmerge(store.state, state, { arrayMerge: overwriteMerge }))
  } else {
    store.setState(deepmerge(store.state, state))
  }
}

export const updateAmount = async (store) => {
  let state = {}, total_charge_amount = 0
  if (store.state.page.spot.value) {
    total_charge_amount += parseFloat(store.state.page.spot.value)
  }
  if (store.state.page.golf.value) {
    total_charge_amount += parseFloat(store.state.page.golf.value)
  }
  if (total_charge_amount < 5) {
    state.page = {
      spot: {
        value_error: "There is a $5 minimum donation."
      },
      form: {
        total_charge_amount: 0
      }
    }
  } else {
    state.page = {
      form: {
        total_charge_amount: total_charge_amount
      }
    }
  }


  mergeState(store, state, true)
}

// Braintree Line Item keys
// const item_keys = [
//   'quantity',
//   'name',
//   'description',
//   'kind',
//   'unit_amount',
//   'unit_tax_amount',
//   'discount_amount',
//   'total_amount',
//   'unit_of_measure',
//   'product_code',
//   'commodity_code',
//   'url',
//   'tax_amount',
// ]


export const updateLineItems = async (store) => {
  const line_items = {
    braintree: [],
    paypal: []
  }

  if (store.state.page.spot.value) {
    line_items.braintree.push({
      'quantity': 1,
      'name': 'Spot Donation',
      'description': 'Spot Donation',
      'kind': 'debit',
      'unit_amount': parseFloat(store.state.page.spot.value),
      'total_amount': parseFloat(store.state.page.spot.value),
      'product_code': 'SPOT',
      'commodity_code': 'SPOT',
    })
    line_items.paypal.push({
      'quantity': 1,
      'name': 'Spot Donation',
      'description': 'Spot Donation',
      'kind': 'debit',
      'unitAmount': parseFloat(store.state.page.spot.value),
      'productCode': 'SPOT',
    })
  }

  if (store.state.page.golf.option && store.state.page.golf.option) {
    line_items.braintree.push({
      'quantity': 1,
      'name': store.state.page.golf.option,
      'description': store.state.page.golf.option,
      'kind': 'debit',
      'unit_amount': parseFloat(store.state.page.golf.value),
      'total_amount': parseFloat(store.state.page.golf.value),
      'product_code': 'GOLF',
      'commodity_code': 'GOLF',
    })
    line_items.paypal.push({
      'quantity': 1,
      'name': store.state.page.golf.option,
      'description': store.state.page.golf.option,
      'kind': 'debit',
      'unitAmount': parseFloat(store.state.page.golf.value),
      'productCode': 'GOLF',
    })
  }

  mergeState(store, { page: { line_items } }, true)

}