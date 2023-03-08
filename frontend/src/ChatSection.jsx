import React from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar.js';

function ChatSection(props) {
    return (
        <div>
            <Navbar username={props.username}></Navbar>
            Chatsection
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(ChatSection)
