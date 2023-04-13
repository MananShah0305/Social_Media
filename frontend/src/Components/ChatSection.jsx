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

import SearchIcon from '@mui/icons-material/Search';


function ChatSection(props) {

    return (
        <div style={{ backgroundColor: '#efefef', height: '100vh' }}>
            <Navbar userInfo='cric.manan'></Navbar>
            <Card style={{ backgroundColor: 'white', margin: '40px', height: '78vh' }}>
                <Stack
                    direction='row'
                >
                    <Stack spacing={2} style={{ padding: '20px', width: '60vw' }}>
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
                            <h3 style={{ color: 'white', backgroundColor: 'rgb(65, 129, 246)', padding: '16px' }}>Chats</h3>
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
                    <Divider orientation="vertical" style={{ width: '2px', backgroundColor: 'grey', height: '100%' }} />
                    <Stack spacing={2} style={{width: '100vw' }}>
                        <Card style={{ height: 'fit-content', maxHeight: '66vh', backgroundColor: 'white' }}>
                            <Stack direction='row'
                                justifyContent='space-between'
                                style={{ color: 'white', backgroundColor: 'rgb(65, 129, 246)', padding: '20px' }}>
                                <h2 style={{ margin: '0px' }}>Chats</h2>
                            </Stack>
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
