import React, { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core'

import NavItem from './NavItem'
import useGlobal from 'store'

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}))

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles()
  const location = useLocation()
  // eslint-disable-next-line
  const [globalState, globalActions] = useGlobal()

  const {
    user,
    menuOptions
  } = globalState

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const content = (
    <Box
      height='100%'
      display='flex'
      flexDirection='column'
    >
      <Box
        alignItems='center'
        display='flex'
        flexDirection='column'
        p={2}
      >
        {user
          ? <>
            <Avatar
              className={classes.avatar}
              component={RouterLink}
              src={user.avatar}
              to='/app/account'
            />
            <Typography
              className={classes.header}
              color='textPrimary'
              variant='h5'
            >
              {user.header}
            </Typography>
            <Typography
              color='textSecondary'
              variant='body2'
              fontStyle='italic'
            >
              {user.subHeader}
            </Typography>
            </> : <>
            <img src='/android-icon-48x48.png' alt='user avatar' />
                </>}
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {menuOptions.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box
        p={2}
        m={2}
        bgcolor='background.dark'
      >
        <Typography
          align='center'
          gutterBottom
          variant='h4'
        >
          Want to Help?
        </Typography>
        <Typography
          align='center'
          variant='body2'
        >
          Contact us to find out how!
        </Typography>
        <Box
          display='flex'
          justifyContent='center'
          mt={2}
        >
          <Button
            color='primary'
            component='a'
            href='#'
            variant='contained'
          >
            Contact Us!
          </Button>
        </Box>
      </Box>
    </Box>
  )

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor='left'
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant='temporary'
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor='left'
          classes={{ paper: classes.desktopDrawer }}
          open
          variant='persistent'
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
}

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
}

export default NavBar
