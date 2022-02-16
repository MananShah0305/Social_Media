import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import Navbar from './Navbar.js';

function Homepage(props) {

    let navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage?.getItem('isLoggedIn')==false) {
            console.log(props.isLoggedIn)
            navigate('/login')
        }
        else {
            console.log(props.isLoggedIn)
        }
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <div style={{ backgroundColor: '#77b7ff', height: '100vh', fontWeight: 'bold', fontSize: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Welcome {props.username}
            </div>
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
