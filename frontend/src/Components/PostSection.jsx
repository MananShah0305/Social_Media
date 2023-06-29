import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import axios from '../axios.js'
import Stack from '@mui/material/Stack';
import SweetAlert from 'react-bootstrap-sweetalert'

import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup, FormControl } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';
import '../Styles/Homepage.css'

function Post(props) {

    const [userInfo, setUserInfo] = useState(null)
    const [postUploaded, setPostUploaded] = useState(false)
    const [post, setPost] = useState(null)
    const [caption, setCaption] = useState("")
    const [alert, setAlert] = useState(null)
    const [alertStatus, setAlertStatus] = useState(false)

    useEffect(async () => {
        const user = await axios.post(`/user-data/${sessionStorage.getItem('username')}`, { username:sessionStorage.getItem('username') })
        setUserInfo(user.data.userInfo)
    }, [])

    const handlePostUpload = e => {
        var reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setPost(reader.result)
                setPostUploaded(true)
            }
        }
    }

    const handleCaption = e => {
        setCaption(e.target.value)
    }

    const postSuccess = () => {
        const body = {
            postUploaded: post,
            creatorName: userInfo.username,
            creatorProfilePic: userInfo.profilePic,
            caption: caption,
        }
        console.log(body)
        axios.post('/post', body)
            .then(res => {
                const getAlert = () => <SweetAlert
                    success
                    title="Success!"
                    onConfirm={onConfirm}
                    customButtons={
                        <>
                            <Button variant="contained" onClick={onConfirm}>OK</Button>
                        </>
                    }>
                    Post uploaded successfully <span>&#128512;</span>.
                </SweetAlert>
                setAlert(getAlert())
                setAlertStatus(true)
            })
    }

    const onConfirm = () => {
        // window.location.reload()
        setAlertStatus(false)
    }

    const postCancel = () => {
        setPost(null)
        setPostUploaded(false)
        setCaption("")
    }

    return (
        <div>
            {
                alertStatus && alert
            }
            <Navbar username={props.username}></Navbar>
            <Stack spacing={4} direction='column' justifyContent='space-between' alignItems='center' style={{ margin: '40px', height: '78vh', border: '0px' }}>
                <Form.Group controlId="formFile" style={{ width: '100%' }}>
                    <Form.Control type="file" onChange={handlePostUpload} />
                </Form.Group>
                {
                    postUploaded &&
                    (
                        <>
                            <Stack spacing={2} direction='row' justifyContent='space-between' alignItems='center' style={{ width: '100%' }}>
                                <img src={post} alt="post" height='450' width='650' />
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ width: '100%' }}>
                                    <Form.Label style={{ fontWeight: 'bold' }}>Caption</Form.Label>
                                    <Form.Control as="textarea" style={{ maxHeight: '300px', backgroundColor: 'rgb(240,240,240)' }} value={caption} onChange={handleCaption} />
                                </Form.Group>
                            </Stack>

                            <Stack spacing={2} direction='row' justifyContent='space-between' alignItems='center' style={{ width: '100%' }}>
                                <Button variant="contained" color='error' startIcon={<ClearIcon />} style={{ width: '50%' }} onClick={postCancel}>
                                    Cancel Post
                                </Button>
                                <Button variant="contained" startIcon={<FileUploadIcon />} style={{ width: '50%' }} onClick={postSuccess}>
                                    Post Upload
                                </Button>
                            </Stack>
                        </>
                    )
                }
            </Stack>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
    }
}

export default connect(mapStateToProps)(Post)
