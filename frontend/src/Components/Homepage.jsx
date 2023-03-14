import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import Navbar from './Navbar.jsx';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from '../axios.js'

function Homepage(props) {

    const [user,setUser]=useState({})
    let navigate = useNavigate();

    // useEffect(() => {
    //     if (sessionStorage?.getItem('isLoggedIn') != true) {
    //         console.log(sessionStorage?.getItem('isLoggedIn'))
    //         navigate('/login')
    //     }
    //     else {
    //         console.log(sessionStorage?.getItem('isLoggedIn'))
    //     }
    // }, [])

    useEffect(() => {

        const token=localStorage.getItem('userAuthorizeToken')

        axios.get('/validate-user', {
            headers: {
                'Authorization': token
            }
        })
        .then(res=>{
            setUser(res.data.userDetails)
        })
        .catch(err=>{
            console.log(err);
        })

    }, [])

    return (
        <>
            <Navbar userInfo={user}></Navbar>
            <Container style={{ backgroundColor: 'white', height: '100vh', fontWeight: 'bold', fontSize: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
            </Container>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Homepage)
