import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import Navbar from './Navbar.js';

function Homepage(props) {

    let navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage?.getItem('isLoggedIn')!=true) {
            console.log(sessionStorage?.getItem('isLoggedIn'))
            navigate('/login')
        }
        else {
            console.log(sessionStorage?.getItem('isLoggedIn'))
        }
    }, [])

    return (
        <>
            <Navbar username={props.username}></Navbar>
            <div style={{ backgroundColor: 'white', height: '100vh', fontWeight: 'bold', fontSize: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
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
