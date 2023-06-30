import React, { useState, useEffect, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar.jsx';
import axios from '../axios.js'
import Stack from '@mui/material/Stack';
import SweetAlert from 'react-bootstrap-sweetalert'
import Cropper from 'react-easy-crop'
import CropIcon from '@mui/icons-material/Crop';
import getCroppedImg from '../cropImage'
import ButtonBootstrap from 'react-bootstrap/Button';
import { Modal, Form, InputGroup, FormControl } from 'react-bootstrap'

import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import '../Styles/Homepage.css'

function Post(props) {

    const [userInfo, setUserInfo] = useState(null)
    const [postUploaded, setPostUploaded] = useState(false)
    const [post, setPost] = useState(null)
    const [caption, setCaption] = useState("")
    const [alert, setAlert] = useState(null)
    const [alertStatus, setAlertStatus] = useState(false)
    const [postModalShow, setPostModalShow] = useState(false)

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [cropImage, setCropImage] = useState(false)
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState(1)

    const onCropChange = (crop) => {
        setCrop(crop)
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const onZoomChange = (zoom) => {
        setZoom(zoom)
    }

    const showCroppedImage = useCallback(async () => {
        setCropImage(false)
        try {
            const cImage = await getCroppedImg(
                post,
                croppedAreaPixels,
            )
            console.log('doneeee', { cImage })
            setPost(cImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels])

    useEffect(async () => {
        const user = await axios.post(`/user-data/${sessionStorage.getItem('username')}`, { username: sessionStorage.getItem('username') })
        setUserInfo(user.data.userInfo)
    }, [])

    const handlePostUpload = e => {
        var reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setPost(reader.result)
                // setPostUploaded(true)
                setPostModalShow(true)
            }
        }
    }

    const handleCaption = e => {
        setCaption(e.target.value)
    }

    const postSuccess = () => {
        setCropImage(false)
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
        window.location.reload()
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
            <Stack spacing={4} direction='column' justifyContent={postUploaded ? `space-between` : `flex-start`} alignItems='center' style={{ margin: '40px', height: '78vh', border: '0px' }}>
                {
                    !postUploaded &&
                    <Stack spacing={2} direction='row' justifyContent='center' alignItems='center' style={{}}>
                        <img src="https://media.tenor.com/nNWb0Icm0bUAAAAM/camera-emoji.gif" alt="img" height='70' width='70' />
                        <h1 className='profile'>Create a post</h1>
                        <img src="https://media.tenor.com/nNWb0Icm0bUAAAAM/camera-emoji.gif" alt="img" height='70' width='70' />
                    </Stack>
                }
                <Form.Group controlId="formFile" style={{ width: '100%' }}>
                    <Form.Control type="file" onChange={handlePostUpload} />
                </Form.Group>
                <Modal
                    show={postModalShow}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter" style={{ color: '#4181f6' }}>
                            Crop Post
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ height: '400px' }}>
                        {
                            !cropImage ?
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Tooltip title="Click to crop the post" placement="bottom">
                                            <img style={{ cursor: 'pointer' }} onClick={() => setCropImage(true)} height='360' width='360' src={post} />
                                        </Tooltip>
                                        <Tooltip title="Crop Image" placement="right">
                                            <CropIcon style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setCropImage(true)} />
                                        </Tooltip>
                                    </div>
                                </div>
                                :
                                <Cropper
                                    image={post}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={aspect}
                                    cropShape="rectangle"
                                    showGrid={false}
                                    onCropChange={onCropChange}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={onZoomChange}
                                />
                        }
                    </Modal.Body>
                    <Modal.Footer style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                        {
                            cropImage && (
                                <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '20px', flex: '0.5', margin: '0px' }}>
                                    <ButtonBootstrap
                                        onClick={showCroppedImage}
                                        variant="success"
                                        style={{ width: '80px', color: 'white', marginRight: '10px' }}
                                    >Crop
                                    </ButtonBootstrap>
                                </div>
                            )
                        }
                        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px', flex: '0.5', margin: '0px' }}>
                            <ButtonBootstrap onClick={() => { setPostModalShow(false); setPostUploaded(true) }} variant="success" style={{ width: '80px', color: 'white', marginRight: '10px' }}>OK</ButtonBootstrap>
                        </div>
                    </Modal.Footer>
                </Modal>
                {
                    postUploaded &&
                    (
                        <>
                            <Stack spacing={3} direction='row' justifyContent='space-between' alignItems='center' style={{ width: '100%' }}>
                                <img src={post} alt="post" height='450' width='650' />
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ width: '100%' }}>
                                    <Form.Label style={{ fontWeight: 'bold' }}>Caption</Form.Label>
                                    <Form.Control as="textarea" style={{ maxHeight: '300px', backgroundColor: 'rgb(240,240,240)' }} value={caption} onChange={handleCaption} />
                                </Form.Group>
                            </Stack>

                            <Stack spacing={2} direction='row' justifyContent='space-between' alignItems='center' style={{ width: '100%' }}>
                                <Button variant="contained" color='error' startIcon={<ClearIcon />} style={{ width: '32%' }} onClick={postCancel}>
                                    Cancel Post
                                </Button>
                                <Button variant="contained" color='secondary' startIcon={<CropIcon />} style={{ width: '32%' }} onClick={()=>setPostModalShow(true)}>
                                    Crop Post
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

export default Post

// const mapStateToProps = (state) => {
//     return {
//         username: state.username,
//     }
// }

// export default connect(mapStateToProps)(Post)
