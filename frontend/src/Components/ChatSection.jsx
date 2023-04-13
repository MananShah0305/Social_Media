import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import axios from '../axios.js'
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { blueGrey, deepOrange, deepPurple } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import ButtonBootstrap from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup, FormControl } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';
import '../Styles/Homepage.css'
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SendIcon from '@mui/icons-material/Send';


function ChatSection(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ backgroundColor: '#efefef', height: '100vh' }}>
            <Navbar userInfo='cric.manan'></Navbar>
            <Card style={{ backgroundColor: 'white', margin: '40px', height: '78vh' }}>
                <Stack
                    direction='row'
                >
                    <Stack spacing={2} style={{ padding: '20px', width: '50vw' }}>
                        <InputGroup style={{ height: '50px ', margin: '0px auto', width: '90%' }}>
                            <FormControl
                                placeholder="Search for friends..."
                                aria-label="friends"
                                aria-describedby="basic-addon1"
                                style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
                            />
                            <InputGroup.Text id="basic-addon1" style={{ height: '50px', backgroundColor: 'rgb(65, 129, 246)', cursor: 'pointer', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}><SearchIcon style={{ color: 'white' }}></SearchIcon></InputGroup.Text>
                        </InputGroup>
                        <Card style={{ maxHeight: '64vh', backgroundColor: 'white' }}>
                            <h3 style={{ margin: '0px', color: 'white', backgroundColor: 'rgb(65, 129, 246)', padding: '16px' }}>Chats</h3>
                            <Stack
                                style={{ overflowY: 'scroll', height: 'fit-content', maxHeight: '60vh' }}>
                                <Paper elevation={0}>
                                    <Stack
                                        spacing={0}
                                        width='100%'
                                    >
                                        <List style={{ padding: '0px' }}>
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
                        </Card>
                    </Stack>
                    <Divider orientation="vertical" style={{ width: '2px', backgroundColor: 'grey', height: '100vh' }} />
                    <Stack spacing={2} style={{ width: '100%' }}>
                        <Card style={{ backgroundColor: 'white' }}>
                            <Stack direction='row'
                                justifyContent='space-between'
                                style={{ backgroundColor: 'rgba(216, 216, 216,0.5)', padding: '16px' }}>
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
                            <Paper style={{ height: '60vh', overflowY: 'scroll', background: `url('https://cdn.pixabay.com/photo/2019/07/09/07/01/background-4326353__340.jpg') center/cover` }}>

                            </Paper>
                            <Stack
                                direction='row'
                                spacing={2}
                                alignItems='center'
                                style={{ backgroundColor: '#efefef', height: '80px' }}
                            >
                                <InputGroup className="mb-3">
                                    <IconButton>
                                        <SentimentVerySatisfiedIcon fontSize='medium' />
                                    </IconButton>
                                    <Form.Control
                                        aria-label="Example text with button addon"
                                        aria-describedby="basic-addon1"
                                    />
                                    <IconButton>
                                        <SendIcon fontSize='medium' />
                                    </IconButton>
                                </InputGroup>
                            </Stack>
                        </Card>
                    </Stack>
                </Stack>
            </Card>
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
