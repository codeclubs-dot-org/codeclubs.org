import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
// import GetAppIcon from '@material-ui/icons/GetApp'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}))

const Component = ({ className, club, ...rest }) => {
  const classes = useStyles()

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="Club"
            src={club.media}
            variant="circle"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {club.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {club.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
    </Card>
  )
}

Component.propTypes = {
  className: PropTypes.string,
  club: PropTypes.object.isRequired
}

export default Component
