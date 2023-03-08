import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SweetAlert from 'react-bootstrap-sweetalert'
import axios from '../axios.js'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../LoginRedux/loginActions.js'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import Paper from '@mui/material/Paper';

function Login(props) {

    let navigate = useNavigate();

    const [code, setCode] = useState(false)

    const [codeValue, setCodeValue] = useState('')

    const [email, setEmail] = useState('')

    const [alertStatus, setAlertStatus] = useState(false)

    const [message, setMessage] = useState('')

    const [statusEmail, setstatusEmail] = useState('')

    const [alert, setAlert] = useState(null)

    useEffect(() => {
        if (statusEmail == 'error') {
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
        else if (statusEmail == 'success') {
            getCode()
        }

    }, [statusEmail])

    const onConfirm = () => {
        setAlertStatus(false)
        setMessage("")
        setstatusEmail("")
    }

    const getCode=()=>{
        setCode(true)
    }

    const emailChange = (e) => {
        setEmail(e.target.value)
    }

    const codeChange = (e) => {
        setCodeValue(e.target.value)
    }

    const emailSubmit = () => {

        const body = {
            email: email,
        }
        axios.post('/email-verification', body)
            .then((res) => {
                setAlertStatus(true)
                setMessage(res.data.message)
                setstatusEmail(res.data.status)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div  style={{ height: '100vh', background: `URL('https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-122.jpg?w=2000') center/cover` }}>
            {
                alertStatus && alert
            }
            <Container maxWidth="sm" style={{ height: '62vh', width: '26vw', position: 'relative', top: '19vh' }}>
                <Paper elevation={12} sx={{ borderRadius: '20px', bgcolor: '#FFFFFF', height: '62vh', width: '100%' }}>

                    <TextField
                        value={email}
                        onChange={emailChange}
                        label="Enter Registered Email"
                        variant="outlined"
                        fullWidth />

                    {
                        code &&
                        <TextField
                            name='code'
                            value={codeValue}
                            onChange={codeChange}
                            label="Enter verification code"
                            variant="outlined"
                            fullWidth />
                    }

                    <Button type='submit' style={{ padding: '10px' }} onClick={emailSubmit} variant="contained" endIcon={<LoginIcon />} fullWidth>
                        {code?`Change Password`:`Get code`}
                    </Button>
                </Paper>
            </Container >
        </div >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: () => dispatch(loginUser())
    }
}

export default connect(null, mapDispatchToProps)(Login)


