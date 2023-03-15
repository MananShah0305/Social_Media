import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SweetAlert from 'react-bootstrap-sweetalert'
import axios from '../axios.js'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../LoginRedux/loginActions.js'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import Paper from '@mui/material/Paper';

function EmailVerify(props) {

    let navigate = useNavigate();

    const [email, setEmail] = useState('')

    const [alertStatus, setAlertStatus] = useState(false)

    const [message1, setMessage1] = useState('')
    const [message2, setMessage2] = useState('')

    const [statusEmail, setStatusEmail] = useState('')

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
                {message1} <b>{message2}<span>&#128545;</span></b>
            </SweetAlert>
            setAlert(getAlert())
        }
        else if (statusEmail == 'success') {
            const getAlert = () => <SweetAlert
                success
                title="Success!"
                onConfirm={onConfirm}
                customButtons={
                    <>
                        <Button variant="contained" onClick={onConfirm}>OK</Button>
                    </>
                }>
                {message1} <b>{message2}<span>&#128512;</span></b> 
            </SweetAlert>
            setAlert(getAlert())
        }
    }, [statusEmail])

    const onConfirm = () => {
        setAlertStatus(false)
        setMessage1("")
        setMessage2("")
        setStatusEmail("")
        setEmail("")
    }

    const emailChange = (e) => {
        setEmail(e.target.value)
    }

    const emailSubmit = () => {

        const body = {
            email: email,
        }
        axios.post('/email-verify', body)
            .then((res) => {
                setAlertStatus(true)
                setMessage1(res.data.message1)
                setMessage2(res.data.message2)
                setStatusEmail(res.data.status)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: `URL('https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-122.jpg?w=2000') center/cover` }}>
            {
                alertStatus && alert
            }
            <Paper elevation={12} sx={{ borderRadius: '20px', padding: '0px 24px', bgcolor: '#FFFFFF', height: `35vh`, width: '24vw' }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3.5}
                    height='35vh'
                >
                    <h2>Email Verification</h2>
                    <TextField
                        value={email}
                        onChange={emailChange}
                        label="Enter Registered Email"
                        variant="outlined"
                        fullWidth />

                    <Button type='submit' style={{ padding: '10px' }} onClick={emailSubmit} variant="contained" fullWidth> 
                        Verify
                    </Button>
                </Stack >
            </Paper>
        </div >
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         loginUser: () => dispatch(loginUser())
//     }
// }

// export default connect(null, mapDispatchToProps)(Login)
export default EmailVerify


