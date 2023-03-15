import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SweetAlert from 'react-bootstrap-sweetalert'
import axios from '../axios.js'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik'
import * as yup from 'yup'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

function PasswordReset(props) {

    let navigate = useNavigate();

    const [email, setEmail] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const [alertStatus, setAlertStatus] = useState(false)

    const [message, setMessage] = useState('')

    const [statusPassword, setStatusPassword] = useState('')

    const [alert, setAlert] = useState(null)

    useEffect(() => {
        console.log(props.emailVerify)
        const getAlert = () => <SweetAlert
            success
            title="Success!"
            onConfirm={onConfirm}
            customButtons={
                <>
                    <Button variant="contained" onClick={onConfirm}>OK</Button>
                </>
            }>
            {message} <span>&#128512;</span>
        </SweetAlert>
        setAlert(getAlert())
    }, [statusPassword])

    useEffect(() => {

        const token=localStorage.getItem('userAuthorizeToken')
        
        axios.get('/validate-user', {
            headers: {
                'Authorization': token
            }
        })
            .then(res => {
                setEmail(res.data.userDetails.email)
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    const onConfirm = () => {
        setAlertStatus(false)
        setMessage("")
        setStatusPassword("")
        navigate('/login')
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword)
    };

    const passwordSubmit = () => {

        const body = {
            email: email,
            password: formik.values.password,
        }
        axios.post('/password-reset', body)
            .then((res) => {
                setAlertStatus(true)
                setMessage(res.data.message)
                setStatusPassword(res.data.status)
                setEmail('')
            })
            .catch(err => {
                console.log(err);
            })
    }

    const validationSchema = yup.object({
        password: yup.string().required('Password is required').min(8, 'Password must have atleast 8 characters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/, 'Password should contain atleast one uppercase character, one lowercase character, one digit and one special character.')
    })

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: () => {
            passwordSubmit()
        },
        validationSchema: validationSchema
    });

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: `URL('https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-122.jpg?w=2000') center/cover` }}>
            {
                alertStatus && alert
            }
            <Paper elevation={12} sx={{ borderRadius: '20px', padding: '0px 24px', bgcolor: '#FFFFFF', height: `50vh`, width: '24vw' }}>
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    height='46vh'
                    padding='0px'
                >
                    <h2>Reset Password</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                            width='20vw'
                        // height='48vh'
                        >
                            <TextField
                                value={email}
                                label="Email"
                                variant="outlined"
                                disabled
                                fullWidth />

                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                label="New Password"
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

                            <Button type='submit' style={{ padding: '10px' }} variant="contained" fullWidth>
                                Confirm
                            </Button>
                        </Stack >
                    </form>
                </Stack >
            </Paper>
        </div >
    )
}

// const mapStateToProps = (state) => {
//     return {
//         emailVerify: state.email,
//     }
// }

// export default connect(mapStateToProps)(PasswordReset)

export default PasswordReset
