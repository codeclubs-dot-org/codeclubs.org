import React from 'react'
import clsx from 'clsx'
import useGlobal from 'store'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from '@material-ui/core'

export const Component = (props) => {
  const {
    classes,
    formName,
    metricName,
    label,
    helperText,
    values,
    defaultValue
  } = props

  const [globalState, globalActions] = useGlobal()

  const metric = globalState[formName].metrics[metricName] || {
    selected: false,
    text: '',
    option: '',
    value: '',
  }

  function StyledRadio(props) {
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

  function onChange(event) {
    let { name, value, checked, type } = event.target
    if (type === 'checkbox') {
      value = checked
    }
    metric.errors = false
    metric.other_error = false

    if (name === 'option') {
      metric.selected = true
      if (value !== 'Other') {
        metric.value = value
      }
    }
    metric[name] = value
    metric.text = label

    if (!metric.selected) {
      metric.value = ''
      metric.option = ''
      metric.text = ''
    } else if (metric.option !== 'Other' && !metric.value) {
      metric.value = defaultValue
      metric.option = defaultValue
    } else if (metric.option === 'Other' && !metric.value) {
      metric.other_error = true
    }

    globalActions.control.mergeState({
      [formName]: {
        metrics: {
          [metricName]: metric
        }
      }
    })
  }

  return (
    <>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={metric.selected}
              onChange={onChange}
              name="selected"
            />
          }
          label={label}
        />
        {helperText && <div>{helperText}</div>}
      </Grid>
      <Grid item xs={12}>
        <FormControl component='fieldset'>
          <RadioGroup
            aria-label='donation'
            name='option'
            onChange={onChange}
            value={metric.option}
            style={{ marginLeft: '35px' }}
          >
            <Grid container spacing={3}>
              {Object.entries(values).map(val =>
                <Grid key={val[1]} item sm={2}>
                  <FormControlLabel
                    value={val[1]}
                    control={<StyledRadio />}
                    label={val[0]}
                  />
                </Grid>
              )}
              <Grid item sm={3}>
                <FormControlLabel
                  value='Other'
                  control={<StyledRadio />}
                  label='Other'
                />
              </Grid>
              {metric.option === 'Other' &&
                <Grid item sm={3}>
                  <TextField
                    required
                    name='value'
                    label='Other Amount'
                    fullWidth
                    type="number"
                    onChange={onChange}
                    value={metric.value}
                    error={metric.other_error}
                    helperText={"Required"}
                  />
                </Grid>
              }
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  )
}

export default Component
