import React , { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'

function Homepage(props) {

    let navigate = useNavigate();

    useEffect(() => {
        if (props.isLoggedIn ==false) {
            console.log(props.isLoggedIn)
            navigate('/login')
        }
        else {
            console.log(props.isLoggedIn)
        }
    }, [])

    return (
        <div style={{ backgroundColor: '#77b7ff', width: '100vw', height: '100vh', fontWeight: 'bold', fontSize: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Welcome {props.usernameLogin}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        usernameLogin: state.usernameLogin,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Homepage)
