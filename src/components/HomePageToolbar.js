import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import useGlobal from 'store'
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(1)
  },
  selectedButton: {
    marginRight: theme.spacing(1),
    textDecoration: 'underline',
    "&:hover, &:focus": {
      textDecoration: 'underline',
    }
  }
}))

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles()
  const path = window.location.pathname
  // eslint-disable-next-line
  const [globalState, globalActions] = useGlobal()
  const { featureFlags } = globalState

  return (
    <div
      className={clsx(classes.root, className)}
      widget='HomePageToolbar'
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <RouterLink to="/">
          <Button className={path === '/' ? classes.selectedButton : classes.menuButton}>
            Home
          </Button>
        </RouterLink>
        <RouterLink to="/mission">
          <Button className={path === '/mission' ? classes.selectedButton : classes.menuButton}>
            Our Mission
          </Button>
        </RouterLink>
        {featureFlags.showContribute &&
          <RouterLink to="/contribute">
            <Button className={path === '/contribute' ? classes.selectedButton : classes.menuButton}>
              Contribute
            </Button>
          </RouterLink>
        }
        {featureFlags.showClubRegistration &&
          <>
            <RouterLink to="/clubs">
              <Button className={path === '/clubs' ? classes.selectedButton : classes.menuButton}>
                Clubs
              </Button>
            </RouterLink>
            <RouterLink to="/register">
              <Button
                color="primary"
                variant="contained"
                className={classes.menuButton}
              >
                Register
              </Button>
            </RouterLink>
          </>
        }
        <RouterLink to="/mission">
          <Button className={path === '/mission' ? classes.selectedButton : classes.menuButton}>
            Our Mission
          </Button>
        </RouterLink>
        <RouterLink to="/contribute">
          <Button className={path === '/contribute' ? classes.selectedButton : classes.menuButton}>
            Contribute
          </Button>
        </RouterLink>
        <RouterLink to="/clubs">
          <Button className={path === '/clubs' ? classes.selectedButton : classes.menuButton}>
            Clubs
          </Button>
        </RouterLink>
        <RouterLink to="/register">
          <Button
            color="primary"
            variant="contained"
            className={classes.menuButton}
          >
            Register
          </Button>
        </RouterLink>
      </Box>
    </div>
  )
}

Toolbar.propTypes = {
  className: PropTypes.string
}

export default Toolbar
