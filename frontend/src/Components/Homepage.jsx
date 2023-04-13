import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import Navbar from './Navbar.jsx';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import axios from '../axios.js'
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { blueGrey, deepOrange, deepPurple } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import ButtonBootstrap from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup, FormControl } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';
import '../Styles/Homepage.css'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SearchIcon from '@mui/icons-material/Search';

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];

function Homepage(props) {

    const [user, setUser] = useState({})
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [like, setLike] = useState(false);
    const [comment, setComment] = useState('');
    const [showAddComment, setShowAddComment] = useState(false);
    const [showShowComments, setShowShowComments] = useState(false);
    const [collapseChat, setCollapseChat] = React.useState(false);

    let navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLike = () => setLike(!like);

    const handleCloseAddComment = () => setShowAddComment(false);
    const handleShowAddComment = () => setShowAddComment(true);

    const handleCloseShowComments = () => setShowShowComments(false);
    const handleShowShowComments = () => setShowShowComments(true);

    const commentChange = (e) => {
        setComment(e.target.value)
    }

    const collapseChatHandler = () => {
        setCollapseChat(!collapseChat)
    }

    useEffect(() => {

        const token = localStorage.getItem('userAuthorizeToken')

        axios.get('/validate-user', {
            headers: {
                'Authorization': token
            }
        })
            .then(res => {
                setUser(res.data.userDetails)
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    return (
        <>
            <Navbar userInfo={user}></Navbar>
            <Container style={{ maxWidth: '100%', padding: '0px' }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    // alignItems="center"
                    // divider={<Divider orientation="vertical" light style={{ width: '4px' }} />}
                    width='100%'
                    maxHeight='88vh'
                >
                    <Stack spacing={4} style={{ backgroundColor: '#e6e6e64f', width: '100vw', padding: '40px', overflowY: 'scroll', alignItems: 'center' }}>
                        <Paper elevation={3} style={{ height: 'fit-content', width: '80%' }}>
                            <Stack direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                spacing={2}
                                style={{ padding: ' 14px 16px' }}>
                                <Stack direction='row'
                                    alignItems='center'
                                    spacing={1}>
                                    <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                                    <b>cric.manan</b>
                                </Stack>
                                <IconButton>
                                    <MoreVertIcon
                                        id="demo-positioned-button"
                                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    />
                                </IconButton>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>Report Post</MenuItem>
                                    <MenuItem onClick={handleClose}>Hide Post</MenuItem>
                                    <MenuItem onClick={handleClose}>Block User</MenuItem>
                                    <MenuItem onClick={handleClose}>Copy post link</MenuItem>
                                </Menu>
                            </Stack>
                            <img src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format" alt="Post" style={{ aspectRatio: '1.5' }} width='100%' />
                            <Stack direction='row'
                                alignItems='center'
                                spacing={0}
                                style={{ margin: '4px 8px 0px 8px' }}>
                                <Tooltip title="Like">
                                    <IconButton onClick={handleLike}>
                                        {
                                            like ?
                                                <FavoriteIcon style={{ fontSize: '27px', color: 'red' }} />
                                                :
                                                <FavoriteBorderIcon style={{ fontSize: '27px' }} />
                                        }
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Comment">
                                    <IconButton onClick={handleShowAddComment}>
                                        <CommentOutlinedIcon style={{ fontSize: '25px' }} />
                                    </IconButton>
                                </Tooltip>
                                <Modal
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    show={showAddComment}
                                    onHide={handleCloseAddComment}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Comment on this post</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Add a comment..."
                                                value={comment}
                                                onChange={commentChange}
                                                aria-label="Comment"
                                                aria-describedby="basic-addon1"
                                                style={{ paddingTop: '1vh' }}
                                            />
                                        </InputGroup>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <ButtonBootstrap onClick={handleCloseAddComment}>Close</ButtonBootstrap>
                                    </Modal.Footer>
                                </Modal>
                                <Tooltip title="Share">
                                    <IconButton>
                                        <ShareOutlinedIcon fontSize='medium' />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <p style={{ margin: '0px 16px ' }}><b>cric.manan </b>
                                Coffee is what helps me get through the day!!!!
                            </p>
                            <Button style={{ margin: '4px 8px', color: '#a0a0a0' }} onClick={handleShowShowComments}>View all comments</Button>
                            <Modal
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                scrollable
                                show={showShowComments}
                                onHide={handleCloseShowComments}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Comments</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Stack spacing={2}>
                                        <Stack direction='row'
                                            alignItems='center'
                                            spacing={2}>
                                            <Avatar sx={{ bgcolor: deepPurple[500] }}>D</Avatar>
                                            <p>Wow, nice capture &#128525;</p>
                                        </Stack>
                                        <Stack direction='row'
                                            alignItems='center'
                                            spacing={2}>
                                            <Avatar sx={{ bgcolor: blueGrey[500] }}>J</Avatar>
                                            <p>Best photographer in the world!! what a capture.&#128293;</p>
                                        </Stack>
                                    </Stack>
                                </Modal.Body>
                                <Modal.Footer>
                                    <ButtonBootstrap onClick={handleCloseShowComments}>Close</ButtonBootstrap>
                                </Modal.Footer>
                            </Modal>
                        </Paper>
                        <Paper elevation={3} style={{ height: 'fit-content', width: '80%' }}>
                            <Stack direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                spacing={2}
                                style={{ padding: ' 14px 16px' }}>
                                <Stack direction='row'
                                    alignItems='center'
                                    spacing={1}>
                                    <Avatar sx={{ bgcolor: deepPurple[500] }}>D</Avatar>
                                    <b>shahdarshil1997</b>
                                </Stack>
                                <IconButton>
                                    <MoreVertIcon
                                        id="demo-positioned-button"
                                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    />
                                </IconButton>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>Report Post</MenuItem>
                                    <MenuItem onClick={handleClose}>Hide Post</MenuItem>
                                    <MenuItem onClick={handleClose}>Block User</MenuItem>
                                    <MenuItem onClick={handleClose}>Copy post link</MenuItem>
                                </Menu>
                            </Stack>
                            <img src="https://thumbs.dreamstime.com/b/cricket-bat-ball-26560801.jpg" alt="Post" style={{ aspectRatio: '1.5' }} width='100%' />
                            <Stack direction='row'
                                alignItems='center'
                                spacing={0}
                                style={{ margin: '4px 8px 0px 8px' }}>
                                <Tooltip title="Like">
                                    <IconButton onClick={handleLike}>
                                        {
                                            like ?
                                                <FavoriteIcon style={{ fontSize: '27px', color: 'red' }} />
                                                :
                                                <FavoriteBorderIcon style={{ fontSize: '27px' }} />
                                        }
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Comment">
                                    <IconButton onClick={handleShowAddComment}>
                                        <CommentOutlinedIcon style={{ fontSize: '25px' }} />
                                    </IconButton>
                                </Tooltip>
                                <Modal
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    show={showAddComment}
                                    onHide={handleCloseAddComment}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Comment on this post</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Add a comment..."
                                                value={comment}
                                                onChange={commentChange}
                                                aria-label="Comment"
                                                aria-describedby="basic-addon1"
                                                style={{ paddingTop: '1vh' }}
                                            />
                                        </InputGroup>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <ButtonBootstrap onClick={handleCloseAddComment}>Close</ButtonBootstrap>
                                    </Modal.Footer>
                                </Modal>
                                <Tooltip title="Share">
                                    <IconButton>
                                        <ShareOutlinedIcon fontSize='medium' />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <p style={{ margin: '0px 16px ' }}><b>shahdarshil1997 </b>   My favourite sport #Cricket</p>
                            <Button style={{ margin: '4px 8px', color: '#a0a0a0' }} onClick={handleShowShowComments}>View all comments</Button>
                            <Modal
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                scrollable
                                show={showShowComments}
                                onHide={handleCloseShowComments}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Comments</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Stack spacing={2}>
                                        <Stack direction='row'
                                            alignItems='center'
                                            spacing={2}>
                                            <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                                            <p>I agree, the best sport to ever have been played &#128525;</p>
                                        </Stack>
                                        <Stack direction='row'
                                            alignItems='center'
                                            spacing={2}>
                                            <Avatar sx={{ bgcolor: blueGrey[500] }}>J</Avatar>
                                            <p>2nd best photographer in the world, after cric.manan &#128293;</p>
                                        </Stack>
                                    </Stack>
                                </Modal.Body>
                                <Modal.Footer>
                                    <ButtonBootstrap onClick={handleCloseShowComments}>Close</ButtonBootstrap>
                                </Modal.Footer>
                            </Modal>
                        </Paper>
                    </Stack>
                    <Stack spacing={2} style={{ backgroundColor: '#e6e6e64f', padding: '30px', width: '100vw',  }}>
                        <h1 className='profile'>Your Profile - cric.manan</h1>
                        <Card style={{  fontSize: '18px', width:'90%', margin:'20px auto' }}>
                            <Stack spacing={2}
                            margin='40px'
                            >
                                <Stack
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Avatar sx={{ width: 100, height: 100 }} alt="Travis Howard" src="https://media.istockphoto.com/id/486121005/photo/sun-rays-inside-coconut-palms.jpg?b=1&s=170667a&w=0&k=20&c=RsE02692qNh7SapxtJ7CzuzsmBpuuOm25NRxUazCgcE=" />
                                    <Stack spacing={1}
                                        alignItems='center'
                                    >
                                        <b>20</b>
                                        <b style={{ margin: '0px' }}>Posts</b>
                                    </Stack>
                                    <Stack spacing={1}
                                        alignItems='center'
                                    >
                                        <b>1264</b>
                                        <b style={{ margin: '0px' }}>Followers</b>
                                    </Stack>
                                    <Stack spacing={1}
                                        alignItems='center'
                                    >
                                        <b>822</b>
                                        <b style={{ margin: '0px' }}>Following</b>
                                    </Stack>
                                </Stack>
                            <p className='bio'>Whatever you do, do it with passion.</p>
                            </Stack>
                            <ImageList sx={{ width: '100%', height: 300 }} cols={4} rowHeight={164} gap='2px'>
                                {itemData.map((item) => (
                                    <ImageListItem key={item.img}>
                                        <img
                                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Card>
                    </Stack>
                </Stack>
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
