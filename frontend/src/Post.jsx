import React from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar.js';

function Post(props) {
    return (
        <div>
            <Navbar username={props.username}></Navbar>
            Post
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Post)
