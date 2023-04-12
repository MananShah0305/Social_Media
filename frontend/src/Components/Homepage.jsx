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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import ButtonBootstrap from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup, FormControl } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';
import '../Styles/Homepage.css'
import Fade from '@mui/material/Fade';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SearchIcon from '@mui/icons-material/Search';

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
            <Container style={{ backgroundColor: '#ebebeb80', maxWidth: '100%', padding: '0px' }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    // alignItems="center"
                    // divider={<Divider orientation="vertical" light style={{ width: '4px' }} />}
                    width='100%'
                    maxHeight='88vh'
                >
                    <Stack spacing={4} style={{ backgroundColor: '#e6e6e64f', padding: '30px', width: '100vw', overflowY: 'scroll' }}>
                        <Paper elevation={3} style={{ height: 'fit-content' }}>
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
                            <img src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format" alt="Post" style={{ aspectRatio: '1.6' }} width='100%' />
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
                                        <MapsUgcOutlinedIcon style={{ fontSize: '25px' }} />
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
                        <Paper elevation={3} style={{ height: 'fit-content' }}>
                            <Stack direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                spacing={2}
                                style={{ padding: ' 16px 20px' }}>
                                <Stack direction='row'
                                    alignItems='center'
                                    spacing={2}>
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
                            <img src="https://thumbs.dreamstime.com/b/cricket-bat-ball-26560801.jpg" alt="Post" style={{ aspectRatio: '1.6' }} width='100%' />
                            <Stack direction='row'
                                alignItems='flex-end'
                                spacing={0}
                                style={{ margin: '10px ' }}>
                                <IconButton>
                                    <FavoriteBorderIcon fontSize='medium' />
                                </IconButton>
                                <IconButton>
                                    <MapsUgcOutlinedIcon fontSize='medium' />
                                </IconButton>
                                <IconButton>
                                    <ShareOutlinedIcon fontSize='medium' />
                                </IconButton>
                            </Stack>
                            <p style={{ margin: '0px 16px ' }}><b>shahdarshil1997 </b>   My favourite sport #Cricket</p>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>View Comments</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
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
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Stack>
                    <Stack spacing={2} style={{ backgroundColor: '#e6e6e6', padding: '30px', width: '100vw' }}>
                        <InputGroup style={{ height: '50px ', margin: 'auto', width: '90%' }}>
                            <FormControl
                                placeholder="Search for friends..."
                                aria-label="friends"
                                aria-describedby="basic-addon1"
                                style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
                            />
                            <InputGroup.Text id="basic-addon1" style={{ height: '50px', backgroundColor: 'rgb(65, 129, 246)', cursor: 'pointer', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}><SearchIcon style={{ color: 'white' }}></SearchIcon></InputGroup.Text>
                        </InputGroup>
                        <Card style={{ height: 'fit-content', maxHeight: '66vh', backgroundColor: 'white' }}>
                            <Stack direction='row'
                                justifyContent='space-between'
                                style={{ color: 'white', backgroundColor: 'rgb(65, 129, 246)', padding: '20px' }}>
                                <h2 style={{ margin: '0px' }}>Chats</h2>
                                <IconButton onClick={collapseChatHandler}>
                                    {
                                        collapseChat &&
                                        <Tooltip title='Hide Chat'>
                                            <CloseIcon style={{ color: 'white' }} />
                                        </Tooltip>

                                    }
                                </IconButton>
                            </Stack>
                            {
                                !collapseChat &&
                                <Stack
                                    justifyContent='center'
                                    alignItems='center'
                                    style={{ height: '75%', width: '100%' }}
                                >
                                    <ButtonBootstrap style={{ padding: '30px', backgroundColor: 'green', margin: 'auto' }} onClick={collapseChatHandler}>
                                        <h1 style={{ color: 'white' }}>Show Chat</h1>
                                    </ButtonBootstrap>
                                </Stack>
                            }
                            <Fade in={collapseChat}>
                                <Stack
                                    style={{ overflowY: 'scroll', height: 'fit-content', maxHeight: '60vh' }}>
                                    <Paper elevation={0}>
                                        <Stack
                                            spacing={0}
                                            width='100%'
                                        >
                                            <List>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <Stack direction='row'
                                                            alignItems='center'
                                                            spacing={1}
                                                        >
                                                            <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                                                            <Stack direction='column'
                                                                justifyContent='center'
                                                                spacing={1}>
                                                                <b>cric.manan</b>
                                                                <p style={{ margin: '0px' }}>Hey, what are you doing?</p>
                                                            </Stack>
                                                        </Stack>
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <Stack direction='row'
                                                            alignItems='center'
                                                            spacing={1}
                                                        >
                                                            <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                                                            <Stack direction='column'
                                                                justifyContent='center'
                                                                spacing={1}>
                                                                <b>cric.manan</b>
                                                                <p style={{ margin: '0px' }}>Hey, what are you doing?</p>
                                                            </Stack>
                                                        </Stack>
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <Stack direction='row'
                                                            alignItems='center'
                                                            spacing={1}
                                                        >
                                                            <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                                                            <Stack direction='column'
                                                                justifyContent='center'
                                                                spacing={1}>
                                                                <b>cric.manan</b>
                                                                <p style={{ margin: '0px' }}>Hey, what are you doing?</p>
                                                            </Stack>
                                                        </Stack>
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <Stack direction='row'
                                                            alignItems='center'
                                                            spacing={1}
                                                        >
                                                            <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                                                            <Stack direction='column'
                                                                justifyContent='center'
                                                                spacing={1}>
                                                                <b>cric.manan</b>
                                                                <p style={{ margin: '0px' }}>Hey, what are you doing?</p>
                                                            </Stack>
                                                        </Stack>
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <Stack direction='row'
                                                            alignItems='center'
                                                            spacing={1}
                                                        >
                                                            <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                                                            <Stack direction='column'
                                                                justifyContent='center'
                                                                spacing={1}>
                                                                <b>cric.manan</b>
                                                                <p style={{ margin: '0px' }}>Hey, what are you doing?</p>
                                                            </Stack>
                                                        </Stack>
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <Stack direction='row'
                                                            alignItems='center'
                                                            spacing={1}
                                                        >
                                                            <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                                                            <Stack direction='column'
                                                                justifyContent='center'
                                                                spacing={1}>
                                                                <b>cric.manan</b>
                                                                <p style={{ margin: '0px' }}>Hey, what are you doing?</p>
                                                            </Stack>
                                                        </Stack>
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <Stack direction='row'
                                                            alignItems='center'
                                                            spacing={1}
                                                        >
                                                            <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                                                            <Stack direction='column'
                                                                justifyContent='center'
                                                                spacing={1}>
                                                                <b>cric.manan</b>
                                                                <p style={{ margin: '0px' }}>Hey, what are you doing?</p>
                                                            </Stack>
                                                        </Stack>
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <Stack direction='row'
                                                            alignItems='center'
                                                            spacing={1}
                                                        >
                                                            <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                                                            <Stack direction='column'
                                                                justifyContent='center'
                                                                spacing={1}>
                                                                <b>cric.manan</b>
                                                                <p style={{ margin: '0px' }}>Hey, what are you doing?</p>
                                                            </Stack>
                                                        </Stack>
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                        </Stack>
                                    </Paper>
                                </Stack>
                            </Fade>
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
