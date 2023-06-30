import React, { useState, useEffect, useRef, useCallback } from 'react'
import '../Styles/Login.css'
import Particles from './ParticlesBackground.jsx';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/lab/TabList';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SweetAlert from 'react-bootstrap-sweetalert'
import axios from '../axios.js'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import Divider from '@mui/material/Divider';
import { loginUser } from '../LoginRedux/loginActions.js'
import { connect } from 'react-redux'
import { Modal, Form } from 'react-bootstrap'
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBootstrap from 'react-bootstrap/Button'; //custom name given by me 
import Tooltip from '@mui/material/Tooltip';
import Cropper from 'react-easy-crop'
import CropIcon from '@mui/icons-material/Crop';
import getCroppedImg from '../cropImage'
import { InputGroup, FormControl } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

let usernameLogin, isGoogleLogin;

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

const initialLogin = {
  username: '',
  password: ''
}

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

function Authentication(props) {

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  let navigate = useNavigate();

  const [value, setValue] = useState(0);

  const [showPassword, setShowPassword] = useState(false)

  const [login, setLogin] = useState(initialLogin)

  const [alertStatus, setAlertStatus] = useState(false)

  const [alert, setAlert] = useState(null)

  const [message, setMessage] = useState('')

  const [statusRegister, setStatusRegister] = useState('')

  const [statusLogin, setStatusLogin] = useState('')

  const [profileModalShow, setProfileModalShow] = useState(false);

  const [profilePic, setProfilePic] = useState(null)

  const profilePicRef = useRef(null)

  const [bio, setBio] = useState('I am a meetup user!')

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [cropImage, setCropImage] = useState(false)

  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(1)


  const onCropChange = (crop) => {
    setCrop(crop)
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onZoomChange = (zoom) => {
    setZoom(zoom)
  }

  const showCroppedImage = useCallback(async () => {
    setCropImage(false)
    try {
      const cImage = await getCroppedImg(
        profilePic,
        croppedAreaPixels,
      )
      console.log('donee', { cImage })
      console.log(profilePic)
      setProfilePic(cImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  useEffect(() => {
    if (statusRegister == 'error') {
      const getAlert = () => <SweetAlert
        error
        title="Error!"
        onConfirm={onConfirm}
        customButtons={
          <>
            <Button variant="contained" onClick={onConfirm}>OK</Button>
          </>
        }>
        {message}<span>&#128545;</span>.
      </SweetAlert>

      setAlert(getAlert())
    }

    else if (statusRegister == 'success') {
      const getAlert = () => <SweetAlert
        success
        title="Success!"
        onConfirm={onConfirm}
        customButtons={
          <>
            <Button variant="contained" onClick={onConfirm}>OK</Button>
          </>
        }>
        {message}<span>&#128512;</span>.
      </SweetAlert>
      setAlert(getAlert())
    }

  }, [statusRegister])

  useEffect(() => {
    if (statusLogin == 'error') {
      const getAlert = () => <SweetAlert
        error
        title="Error!"
        onConfirm={onConfirm}
        customButtons={
          <>
            <Button variant="contained" onClick={onConfirm}>OK</Button>
          </>
        }>
        {message}<span>&#128545;</span>.
      </SweetAlert>

      setAlert(getAlert())
    }
    else if (statusLogin == 'success') {
      setAlert(null)
      props.loginUser()
      navigate('/')
    }

  }, [statusLogin])

  const onConfirm = () => {
    setAlertStatus(false)
    setAlert(null)
    setMessage("")
    setStatusRegister("")
    setStatusLogin("")
    console.log(value);
    if (value == 1) {
      formik.values.email = initialRegister.email
      formik.values.password = initialRegister.password
      formik.values.username = initialRegister.username
    }
    else {
      console.log(value);
    }

    setLogin(initialLogin)
  }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  };

  const changeTabs = (event, newValue) => {
    setValue(newValue);
  };

  const registerChange = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = () => {
      if (reader.readyState == 2) {
        setProfilePic(reader.result)
      }
    }
  }

  const registerUser = () => {
    setCropImage(false)
    const body = {
      email: formik.values.email,
      username: formik.values.username,
      password: formik.values.password,
      profilePic: profilePic,
      bio: bio
    }
    axios.post('/sign-up', body)
      .then((res) => {
        console.log(body)
        setValue(0)
        setAlertStatus(true)
        setMessage(res.data.message)
        setStatusRegister(res.data.status)
        setProfileModalShow(false)
        setProfilePic('')
        setBio('')
      })
      .catch(err => {
        console.log(err);
      })
  }

  const validationSchema = yup.object({
    email: yup.string().required('Email is required').email('Invalid Email'),
    username: yup.string().required('Username is required').min(6, 'Username must have atleast 6 characters').max(16, 'Username must have atmost 16 characters').matches(/^[a-zA-Z0-9_.]+$/, 'Username should only be composed of letters, numbers, underscore and period.'),
    password: yup.string().required('Password is required').min(8, 'Password must have atleast 8 characters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/, 'Password should contain atleast one uppercase character, one lowercase character, one digit and one special character.'),
    bio: yup.string().max(8, 'Keep your bio shorter than 100 characters')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    onSubmit: () => {
      axios.get('/all-user-data')
        .then(res => {
          if (res.data.allUserInfo.length == 0) {
            console.log('success')
            setProfileModalShow(true)
          }
          else {
            res.data.allUserInfo?.map(cred => {
              if (cred.email == formik.values.email) {
                setAlertStatus(true)
                setMessage('This email is already registered')
                setStatusRegister('error')
              }
              else if (cred.username == formik.values.username) {
                setAlertStatus(true)
                setMessage('A user with this username already exists')
                setStatusRegister('error')
              }
              else {
                console.log('success')
                setProfileModalShow(true)
                return;
              }
            })
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    validationSchema: validationSchema
  });

  const loginChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const loginSubmit = () => {

    const body = {
      username: login.username,
      password: login.password
    }
    axios.post('/sign-in', body)
      .then((res) => {
        usernameLogin = body.username
        setAlertStatus(true)
        setMessage(res.data.message)
        setStatusLogin(res.data.status)
        sessionStorage.setItem('userAuthorizeToken',res.data.result.token)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const responseGoogleSuccess = (res) => {
    usernameLogin = res.profileObj.givenName + res.profileObj.familyName
    isGoogleLogin = true
    console.log(usernameLogin)
    props.loginUser()
    navigate('/')
  }
  const responseGoogleFailure = (response) => {
    console.log(response);
  }

  const forgotPassword = () => {
    navigate('/email-verify')
  }

  return (
    <div className='login' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: `URL('https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-122.jpg?w=2000') center/cover` }}>
      {
        alertStatus && alert
      }
      {/* <Particles></Particles> */}
      <Container maxWidth="sm" style={{ height: '56vh', width: '24vw', }}>
        <TabContext value={value}>
          <Paper elevation={12} sx={{ borderRadius: '20px', bgcolor: '#FFFFFF', height: '56vh', width: '100%' }}>
            <Tabs centered value={Number(value)} onChange={changeTabs} aria-label="basic tabs example">
              <Tab icon={<LoginIcon />} iconPosition="end" label="Login" {...a11yProps(0)} />
              <Tab icon={<AppRegistrationRoundedIcon />} iconPosition="end" label="Register" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={Number(value)} index={0} style={{ padding: '0px' }}>
              <Stack spacing={1}>
                <form onSubmit={formik.handleSubmit} style={{ height: '26vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }} variant='outlined'>

                  <TextField
                    name='username'
                    value={login.username}
                    onChange={loginChange}
                    label="Username"
                    variant="outlined"
                    fullWidth />

                  <TextField
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={login.password}
                    onChange={loginChange}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handlePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }} />

                  <Button type='submit' style={{ padding: '10px' }} onClick={loginSubmit} variant="contained" endIcon={<LoginIcon />} fullWidth>
                    Log In
                  </Button>

                  {/* <Root>
                  <Divider>or login with</Divider>
                </Root>

                <GoogleLogin
                  clientId={process.env.REACT_APP_CLIENT_ID}
                  render={(renderProps) => (
                    <GoogleButton style={{ width: '100%' }}
                      onClick={renderProps.onClick}
                    />
                  )}
                  buttonText="Sign In with Google"
                  onSuccess={responseGoogleSuccess}
                  onFailure={responseGoogleFailure}
                  cookiePolicy={"single_host_origin"}
                /> */}

                </form>
                <p style={{ fontSize: '14px' }}>Forgot password?<Button size='small' onClick={forgotPassword}>Click to reset</Button></p>
                {/* <p style={{ margin: '0px' }}>No account yet? <Chip label="Register Now" color="primary" variant="outlined" size="medium" onClick={() => setValue(1)} /></p> */}
              </Stack>
            </TabPanel>

            <TabPanel value={Number(value)} index={1} style={{ padding: '0px' }}>
              <Form onSubmit={formik.handleSubmit} style={{ height: '38vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>

                <TextField
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  label="Email Id"
                  variant="outlined"
                  fullWidth
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                />

                <TextField
                  name='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  onBlur={formik.handleBlur} />

                <TextField
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handlePasswordVisibility}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button type='submit' style={{ padding: '10px' }} variant="contained" endIcon={<AppRegistrationRoundedIcon />} fullWidth>
                  Register
                </Button>

                <Modal
                  show={profileModalShow}
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter" style={{ color: '#4181f6' }}>
                      Add Profile Picture
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ height: '280px' }}>
                    {
                      !cropImage ?
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Tooltip title="Click to add a profile picture" placement="bottom">
                              <Avatar style={{ cursor: 'pointer' }} onClick={() => profilePicRef.current.click()} sx={{ width: 160, height: 160 }} src={profilePic} >
                                {profilePic == null && <PersonIcon sx={{ width: 120, height: 120 }} />}
                              </Avatar>
                            </Tooltip>
                            {
                              profilePic != null && <Tooltip title="Crop Image" placement="right">
                                <CropIcon style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setCropImage(true)} />
                              </Tooltip>
                            }
                          </div>
                          <Form.Group className="position-relative mb-3">
                            <input style={{ display: 'none' }} ref={profilePicRef} type="file" onChange={registerChange} />
                          </Form.Group>
                          <InputGroup className="mb-3" style={{ width: '70%' }}>
                            <InputGroup.Text id="basic-addon1">Bio</InputGroup.Text>
                            <FormControl
                              placeholder="About Me..."
                              aria-describedby="basic-addon1"
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                            />
                          </InputGroup>
                        </div>
                        :
                        <Cropper
                          image={profilePic}
                          crop={crop}
                          zoom={zoom}
                          aspect={aspect}
                          cropShape="round"
                          showGrid={false}
                          onCropChange={onCropChange}
                          onCropComplete={onCropComplete}
                          onZoomChange={onZoomChange}
                        />
                    }
                  </Modal.Body>
                  <Modal.Footer style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                    {
                      cropImage && (
                        <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '20px', flex: '0.5', margin: '0px' }}>
                          <ButtonBootstrap
                            onClick={showCroppedImage}
                            variant="contained"
                            style={{ width: '80px', color: 'white', marginRight: '10px' }}
                          >Crop
                          </ButtonBootstrap>
                          <ButtonBootstrap
                            variant="danger"
                            style={{ width: '80px', color: 'white' }}
                            onClick={() => { setProfilePic(null); setCropImage(false) }}
                          >Remove
                          </ButtonBootstrap>
                        </div>
                      )
                    }
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px', flex: '0.5', margin: '0px' }}>
                      <ButtonBootstrap onClick={registerUser} variant="success" style={{ width: '80px', color: 'white', marginRight: '10px' }}>OK</ButtonBootstrap>
                      <ButtonBootstrap variant="danger" style={{ width: '80px', color: 'white' }} onClick={() => setProfileModalShow(false)}>Close</ButtonBootstrap>
                    </div>
                  </Modal.Footer>
                </Modal>
              </Form>
            </TabPanel>
          </Paper>
        </TabContext>
      </Container>
    </div>
  )
}

export { usernameLogin, isGoogleLogin }

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => dispatch(loginUser())
  }
}

export default connect(null, mapDispatchToProps)(Authentication)


