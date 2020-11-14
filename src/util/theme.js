const getBase = (theme) => ({
  root: {
    display: 'flex',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  page_container: {
    maxWidth: 1050,
    margin: 'auto',
  },
  header_box: {
    marginTop: '40px',
    marginLeft: '40px',
    marginRight: '40px'
  },
  form_fields: {
    marginLeft: '40px',
    marginRight: '40px'
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5'
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)'
    }
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""'
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3'
    }
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  indented: {
    position: 'relative',
    left: '25px'
  },
  message_header: {
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: theme.spacing(2)
  },
  message_body: {
    padding: theme.spacing(2)
  },
  padded_box: {
    padding: '12px'
  },
  social_button: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: '1',
    flexBasis: '50%',
    fontSize: '1.2em'
  },
  social_container: {
    margin: '1px',
    '& a': {
      width: '100%',
      margin: '0'
    }
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2em 0',
    borderTop: '1px solid #666',
    backgroundColor: 'black',
    color: 'white',
    '& a': {
      color: '#41addd',
      textDecoration: 'none',
      '&:hover': {
        color: '#6cc0e5'
      }
    }
  },
  footerLeft: {
    textAlign: 'center',
    paddingTop: '5px',
    backgroundColor: 'black',
  },
  footerRight: {
    textAlign: 'center',
    backgroundColor: 'black',
  },
  jumbo_image: {
    width: '100%'
  },
  form_legend: {
    color: 'black !important',
    fontWeight: 'bold !important'
  },
  togglebutton_donation_option: {
    color: 'black !important',
    textAlign: 'left',
    marginLeft: 50,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  togglebutton_content: {
    marginLeft: 50,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  donation_option_image: {
    width: 150,
    margin: 'auto',
    marginTop: '1.5em'
  }
})

export default getBase