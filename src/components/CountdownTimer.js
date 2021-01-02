import React from 'react'
import { Grid } from '@material-ui/core'

const calculateTimeLeft = (end) => {
  let difference = +new Date(end) - +new Date()

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }
  return 0
}

export default function Component(props) {
  const { config } = props
  const [campaignTimeLeft, setCampaignTimeLeft] = React.useState(calculateTimeLeft(config.campaign_end_date))
  const [secondaryTimeLeft, setSecondaryTimeLeft] = React.useState(calculateTimeLeft(config.secondary_end_date))

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCampaignTimeLeft(calculateTimeLeft(config.campaign_end_date))
      setSecondaryTimeLeft(calculateTimeLeft(config.secondary_end_date))
    }, 1000)
    return () => clearTimeout(timer)
  })

  const timeLeft = secondaryTimeLeft ? secondaryTimeLeft : campaignTimeLeft
  const message = secondaryTimeLeft ? config.secondary_end_message : ''

  return (
    <>
      <Grid container>
        {timeLeft ? <>
          <Grid item>
            {timeLeft['days']}d{" "}
            {timeLeft['hours']}h{" "}
            {("0" + timeLeft['minutes']).slice(-2)}m{" "}
            {("0" + timeLeft['seconds']).slice(-2)}s{" "}
            &nbsp
          </Grid>
          <Grid item>
            {message}
          </Grid>
        </> : <Grid item>{"This campaign has ended."}</Grid>}
      </Grid>
    </>
  )
}
