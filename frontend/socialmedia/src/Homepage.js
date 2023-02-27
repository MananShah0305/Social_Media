import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import Navbar from './Navbar.js';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Homepage(props) {

    let navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage?.getItem('isLoggedIn') != true) {
            console.log(sessionStorage?.getItem('isLoggedIn'))
            // navigate('/login')
        }
        else {
            console.log(sessionStorage?.getItem('isLoggedIn'))
        }
    }, [])

    return (
        <>
            <Navbar username={props.username}></Navbar>
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
