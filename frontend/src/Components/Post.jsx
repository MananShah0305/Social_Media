import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import axios from '../axios.js'
import Stack from '@mui/material/Stack';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup, FormControl } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';
import '../Styles/Homepage.css'

function Post(props) {

    const [postUpload, setPostUpload] = useState(false)

    return (
        <div>
            <Navbar username={props.username}></Navbar>

            <Stack spacing={4} direction='column' justifyContent='space-between' alignItems='center' style={{ margin: '40px', height: '78vh', border: '0px' }}>
                <Form.Group controlId="formFile" style={{ width: '100%' }}>
                    <Form.Control type="file" />
                </Form.Group>

                <Stack spacing={2} direction='row' justifyContent='space-between' alignItems='center' style={{ width: '100%' }}>
                    <img src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2023/03_29_revuelto/gate_models_s_02_m.jpg" alt="car" height='450' width='650' />
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ width: '100%' }}>
                        <Form.Label style={{ fontWeight: 'bold' }}>Caption</Form.Label>
                        <Form.Control as="textarea" style={{ maxHeight: '300px', backgroundColor: 'rgb(240,240,240)' }} />
                    </Form.Group>
                </Stack>

                <Stack spacing={2} direction='row' justifyContent='space-between' alignItems='center' style={{ width: '100%' }}>
                    <Button variant="contained" color='error' startIcon={<ClearIcon />} style={{ width: '50%' }}>
                        Cancel Post
                    </Button>
                    <Button variant="contained" startIcon={<FileUploadIcon />} style={{ width: '50%' }}>
                        Post Upload
                    </Button>
                </Stack>
            </Stack>

        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Post)
