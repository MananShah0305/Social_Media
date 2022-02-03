import React, { useState, useEffect } from 'react'
import './Login.css'
import Particles from './ParticlesBackground.js';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import SweetAlert from 'react-bootstrap-sweetalert'
import axios from './axios'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const initialRegister = {
  email: '',
  username: '',
  password: ''
}

const initialRegisterErrorText = {
  email: '',
  username: '',
  password: ''
}

const initialRegisterInvalid = {
  email: false,
  username: false,
  password: false
}

const initialLogin = {
  username: '',
  password: ''
}

let alert = false;

function Login() {

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  let navigate = useNavigate();

  const [value, setValue] = useState(0);

  const [showPassword, setShowPassword] = useState(false)

  const [register, setRegister] = useState(initialRegister)

  const [registerInvalid, setRegisterInvalid] = useState(initialRegisterInvalid)

  const [registerError, setRegisterError] = useState(initialRegisterErrorText)

  const [login, setLogin] = useState(initialLogin)

  const [alertStatus, setAlertStatus] = useState(false)

  useEffect(() => {
    const body = {
      email: formik.values.emailRegister,
      username: formik.values.usernameRegister,
      password: formik.values.passwordRegister,
    }
    axios.post('/signUp', body)
      .then((res) => {
        if (res.data.status == 'error') {
          alert = <SweetAlert
            error
            title="Error!"
            onConfirm={onConfirm}
            customButtons={
              <React.Fragment>
                <Button variant="contained" onClick={onConfirm}>OK</Button>
              </React.Fragment>
            }>
            {res.data.message}<span>&#128545;</span>.
          </SweetAlert>
        }
        else {
          alert = <SweetAlert
            success
            title="Success!"
            onConfirm={onConfirm}
            customButtons={
              <React.Fragment>
                <Button variant="contained" onClick={onConfirm}>OK</Button>
              </React.Fragment>
            }>
            {res.data.message}<span>&#128512;</span>.

          </SweetAlert>
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [alertStatus])

  const registerInvalidate = () => {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(register.email))) {
      setRegisterError({
        ...registerError,
        email: 'Invalid Email.'
      })
      setRegisterInvalid({
        ...registerInvalid,
        email: true
      })
    }
    else {
      setRegisterInvalid({
        ...registerInvalid,
        email: false
      })
    }

    if (register.username.length < 6) {
      setRegisterError({
        ...registerError,
        username: 'Username should have more than 6 characters'
      })
      setRegisterInvalid({
        ...registerInvalid,
        username: true
      })
    }
    else if (!(/^[a-z0-9_.]+$/.test(register.username)) && register.username.length >= 6) {
      setRegisterError({
        ...registerError,
        username: 'Username should only be composed of letters, numbers, underscore and period.'
      })
      setRegisterInvalid({
        ...registerInvalid,
        username: true
      })
    }
    else {
      setRegisterInvalid({
        ...registerInvalid,
        username: false
      })
    }

    if (register.password.length < 8) {
      setRegisterError({
        ...registerError,
        password: 'Password should have more than 8 characters'
      })
      setRegisterInvalid({
        ...registerInvalid,
        password: true
      })
    }
    else if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/.test(register.password)) && register.password.length >= 8) {
      setRegisterError({
        ...registerError,
        password: 'Password should contain atleast one uppercase character, one lowercase character, one digit and one special character.'
      })
      setRegisterInvalid({
        ...registerInvalid,
        password: true
      })
    }
    else {
      setRegisterInvalid({
        ...registerInvalid,
        password: false
      })
    }

    console.log(register);
  }

  const onConfirm = () => {
    setAlertStatus(false)
    setRegister(initialRegister)
    setRegisterInvalid(initialRegisterInvalid)
    setRegisterError(initialRegisterErrorText)
    setLogin(initialLogin)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const changeTabs = (event, newValue) => {
    setValue(newValue);
  };

  const registerChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    })
  }

  const registerSubmit = () => {

    const body = {
      email: register.email,
      username: register.username,
      password: register.password,
    }

    registerInvalidate()

    console.log(registerInvalid);
    if (Object.values(registerInvalid).every(item => item)) {
      setAlertStatus(true)
      // if (true) {
      //   axios.post('/signUp', body)
      //     .then((res) => {
      //       setAlertStatus(true)
      //       if (res.data.status == 'error') {
      //         alert = <SweetAlert
      //           error
      //           title="Error!"
      //           onConfirm={onConfirm} >
      //           {res.data.message}<span>&#128545;</span>.
      //         </SweetAlert>
      //       }
      //       else {
      //         alert = <SweetAlert
      //           success
      //           title="Success!"
      //           onConfirm={onConfirm} >
      //           {res.data.message}<span>&#128512;</span>.
      //         </SweetAlert>
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     })
      // }
    }
  }

  const loginChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const loginSubmit = () => {
    const body = {
      username: register.username,
      password: register.password
    }
    axios.post('/signIn', body)
      .then((res) => {
        if (res.data.status == 'error') {
          setAlertStatus(true)
          alert = <SweetAlert
            error
            title='Error!'
            onConfirm={onConfirm}
            customButtons={
              <React.Fragment>
                <Button variant="contained" onClick={onConfirm}>OK</Button>
              </React.Fragment>
            }
          >
            {res.data.message}<span>&#128512;</span>.
          </SweetAlert>
        }
        else {
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const responseGoogleSuccess = (response) => {
    console.log(response);
  }
  const responseGoogleFailure = (response) => {
    console.log(response);
  }

  const validationSchema = yup.object({
    emailRegister: yup.string().required('Email is required').email('Invalid Email'),
    usernameRegister: yup.string().required('Username is required').min(6, 'Username must have atleast 6 characters').max(20, 'Username must have atmost 20 characters').matches(/^[a-z0-9_.]+$/, 'Username should only be composed of letters, numbers, underscore and period.'),
    passwordRegister: yup.string().required('Password is required').min(8, 'Password must have atleast 8 characters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/, 'Password should contain atleast one uppercase character, one lowercase character, one digit and one special character.')
  })

  const formik = useFormik({
    initialValues: {
      emailRegister: '',
      usernameRegister: '',
      passwordRegister: '',
      usernameLogin: '',
      passwordLogin: '',
    },
    onSubmit: () => {
      setAlertStatus(true)
    },
    validationSchema: validationSchema
  });

  return (
    <div className='login'>
      <Particles></Particles>
      <div style={{ height: '62vh', width: '26vw', position: 'relative', top: '19vh', left: '37vw' }}>
        <Container maxWidth="sm">
          <TabContext value={value}>
            <Box sx={{ borderRadius: '20px', border: '4px solid #1d8be4', bgcolor: '#FFFFFF', height: '62vh', width: '100%' }}>
              <Tabs centered value={value} onChange={changeTabs} aria-label="basic tabs example">
                <Tab icon={<LoginIcon />} iconPosition="end" label="Login" {...a11yProps(0)} />
                <Tab icon={<AppRegistrationRoundedIcon />} iconPosition="end" label="Register" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0} style={{ padding: '0px' }}>
                <form onSubmit={formik.handleSubmit} fullWidth style={{ height: '44vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }} variant='outlined'>

                  <TextField
                    name='usernameLogin'
                    value={formik.values.usernameLogin}
                    onChange={formik.handleChange}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    fullWidth />

                  <TextField
                    name='passwordLogin'
                    value={formik.values.passwordLogin}
                    onChange={formik.handleChange}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    fullWidth />

                  <Button type='submit' style={{ padding: '10px' }} /*onClick={loginSubmit}*/ variant="contained" endIcon={<LoginIcon />} fullWidth>
                    Log In
                  </Button>

                  <p style={{ margin: '0px auto' }}>OR</p>

                  <GoogleLogin
                    clientId=''
                    render={renderProps => (
                      <GoogleButton style={{ width: '100%' }}
                        onClick={() => { console.log('Google button clicked') }}
                      />
                    )}
                    buttonText="Sign In with Google"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleFailure}
                    isSignedIn={true}
                    cookiePolicy={"single_host_origin"}
                  />

                </form>
              </TabPanel>

              <TabPanel value={value} index={1} style={{ padding: '0px' }}>
                <form onSubmit={formik.handleSubmit} fullWidth style={{ height: '44vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>

                  <TextField
                    error={registerInvalid.email}
                    helperText={registerInvalid.email == true && registerError.email}
                    name='emailRegister'
                    value={formik.values.emailRegister}
                    onChange={formik.handleChange}
                    label="Email Id"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.emailRegister && Boolean(formik.errors.emailRegister)}
                    helperText={formik.touched.emailRegister && formik.errors.emailRegister}
                    onBlur={formik.handleBlur}
                  />

                  <TextField
                    error={registerInvalid.username}
                    helperText={registerInvalid.username == true && registerError.username}
                    name='usernameRegister'
                    value={formik.values.usernameRegister}
                    onChange={formik.handleChange}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.usernameRegister && Boolean(formik.errors.usernameRegister)}
                    helperText={formik.touched.usernameRegister && formik.errors.usernameRegister}
                    onBlur={formik.handleBlur} />

                  <TextField
                    error={registerInvalid.password}
                    helperText={registerInvalid.password == true && registerError.password}
                    name='passwordRegister'
                    value={formik.values.passwordRegister}
                    onChange={formik.handleChange}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.passwordRegister && Boolean(formik.errors.passwordRegister)}
                    helperText={formik.touched.passwordRegister && formik.errors.passwordRegister}
                    onBlur={formik.handleBlur}
                  />

                  <Button type='submit' style={{ padding: '10px' }} /*onClick={registerSubmit}*/ variant="contained" endIcon={<AppRegistrationRoundedIcon />} fullWidth>
                    Register
                  </Button>

                </form>
              </TabPanel>
            </Box>
          </TabContext>
        </Container>
        {alertStatus && alert}
      </div>
    </div>
  )
}

export default Login
