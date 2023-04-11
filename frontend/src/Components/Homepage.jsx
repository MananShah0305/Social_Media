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
import { deepOrange, deepPurple } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TurnRightOutlinedIcon from '@mui/icons-material/TurnRightOutlined';

function Homepage(props) {

    const [user, setUser] = useState({})
    const [anchorEl, setAnchorEl] = React.useState(null);

    let navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
            <Container style={{ backgroundColor: '#ebebeb80', maxWidth: '100%', padding: '0px', height: '88vh' }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    // alignItems="center"
                    divider={<Divider orientation="vertical" />}
                    width='100%'
                >
                    <Stack spacing={2} style={{ maxHeight: '88vh', backgroundColor: '#e6e6e64f', padding: '40px', width: '100vw', overflow: 'scroll' }}>
                        <Paper elevation={3} style={{ minHeight: '82vh' }}>
                            <Stack direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                spacing={2}
                                style={{ padding: ' 16px 20px' }}>
                                <Stack direction='row'
                                    alignItems='center'
                                    spacing={2}>
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
                                alignItems='flex-end'
                                spacing={0}
                                style={{ margin: '10px ' }}>
                                <IconButton>
                                    <FavoriteBorderIcon fontSize='large' />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleOutlineIcon fontSize='large' />
                                </IconButton>
                                <IconButton>
                                    <TurnRightOutlinedIcon fontSize='large' />
                                </IconButton>
                            </Stack>
                            <p style={{ margin: '0px 16px ' }}><b>cric.manan </b>   Coffee is what helps me get through the day!!!!</p>
                        </Paper>
                        <Paper elevation={3}>
                            Manan
                        </Paper>
                        <Paper elevation={3}>
                            Manan
                        </Paper>
                        <Paper elevation={3}>
                            Manan
                        </Paper>
                    </Stack>
                    <Stack spacing={2} style={{ maxHeight: '88vh', backgroundColor: 'blue', padding: '40px', width: '100vw' }}>
                        <Paper elevation={3}>
                            Manan
                        </Paper>
                        <Paper elevation={3}>
                            Manan
                        </Paper>
                        <Paper elevation={3}>
                            Manan
                        </Paper>
                        <Paper elevation={3}>
                            Manan
                        </Paper>
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
