import React, { useState, useEffect } from 'react'
import '../Styles/Navbar.css'

import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { red, blue, green, orange } from '@mui/material/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tooltip from '@mui/material/Tooltip';
import axios from '../axios.js'
import { connect } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from '../LoginRedux/loginActions.js'
import CircularProgress from '@mui/material/CircularProgress';

function Navbar(props) {

    let navigate = useNavigate();
    const [state, setState] = useState({ right: false });
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        // axios.get('/username')
        //     .then(res => {
        //         res.data.allUserInfo.map(user => {
        //             if (props.username == user.username) {
        //                 setUserInfo(user)
        //             }
        //             return;
        //         })
        //     })
        //     .catch(err => console.log(err))
        setUserInfo(props.userInfo)
        console.log(props.userInfo)
    })

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Divider></Divider>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <Avatar sx={{ bgcolor: red[500] }}>D</Avatar>
                    </ListItemIcon>
                    <ListItemText primary='Darshil Shah' />
                    <ListItemIcon button>
                        <GroupAddIcon style={{ color: '#4181f6' }}></GroupAddIcon>
                    </ListItemIcon>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Avatar sx={{ bgcolor: blue[500] }}>J</Avatar>
                    </ListItemIcon>
                    <ListItemText primary='Jimit Kapadia' />
                    <ListItemIcon button>
                        <GroupAddIcon style={{ color: '#4181f6' }}></GroupAddIcon>
                    </ListItemIcon>
                </ListItem>
                <ListItem >
                    <ListItemIcon>
                        <Avatar sx={{ bgcolor: green[500] }}>A</Avatar>
                    </ListItemIcon>
                    <ListItemText primary='Aditya Dalal' />
                    <ListItemIcon button>
                        <GroupAddIcon style={{ color: '#4181f6' }}></GroupAddIcon>
                    </ListItemIcon>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Avatar sx={{ bgcolor: orange[500] }}>U</Avatar>
                    </ListItemIcon>
                    <ListItemText primary='Utkarsh Shah' />
                    <ListItemIcon button>
                        <GroupAddIcon style={{ color: '#4181f6' }}></GroupAddIcon>
                    </ListItemIcon>
                </ListItem>
            </List>
        </Box>
    );

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        margin: '0px',
        padding: '24px',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));

    const handleDrawerClose = () => {
        setState({ right: false })
    };

    const logoutSite = () => {
        // props.logoutUser()
        localStorage.removeItem('userAuthorizeToken')
        navigate('/login')
    }

    return (
        <>{
            userInfo
                ?
                <div className='navbar'>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: '0.25' }}>
                        {
                            userInfo.profilePic
                                ?
                                <img src={userInfo.profilePic} alt="Profile Pic" width='50' height='50' style={{ borderRadius: '40px' }} />
                                :
                                <Avatar sx={{ bgcolor: '#0070ff', color: 'white' }}>{userInfo?.username?.charAt(0)}</Avatar>
                        }
                        <h5 style={{ margin: '0px', marginLeft: '8px' }}>{userInfo.username}</h5>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: '0.1' }}>
                        <img src="data:image/png;base64,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" alt="" height='50' width='100' />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: '0.22' }}>
                        <Tooltip title="Home" placement="bottom">
                            <Link to="/">
                                <IconButton>
                                    <HomeOutlinedIcon style={{ fontSize: '30px', color: '#4181f6' }}></HomeOutlinedIcon>
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="New Post" placement="bottom">
                            <Link to="/post">
                                <IconButton>
                                    <InsertPhotoOutlinedIcon style={{ fontSize: '26px', color: '#4181f6' }}></InsertPhotoOutlinedIcon>
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Chats" placement="bottom">
                            <Link to="/chat-section">
                                <IconButton>
                                    <MapsUgcOutlinedIcon style={{ fontSize: '26px', color: '#4181f6' }}></MapsUgcOutlinedIcon>
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Logout" placement="bottom">
                            <Link to="/login">
                                <IconButton onClick={logoutSite}>
                                    <LogoutIcon style={{ fontSize: '26px', color: '#4181f6' }}></LogoutIcon>
                                </IconButton>
                            </Link>
                        </Tooltip>
                        {['right'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Button onClick={toggleDrawer(anchor, true)} style={{ display: 'flex', backgroundColor: '#4181f6', padding: '10px', width: '160px', color: 'white' }}>
                                    <div style={{ display: 'flex' }}>
                                        <SavedSearchIcon style={{ fontSize: '26px' }} />
                                        <p style={{ margin: '0px' }}>Find Friends</p>
                                    </div>
                                </Button>
                                <Drawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                >
                                    <DrawerHeader style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#bbdcfe' }}>
                                        <IconButton onClick={handleDrawerClose} style={{ backgroundColor: 'rgb(65, 129, 246)', color: 'white' }}>
                                            <ChevronRightIcon />
                                        </IconButton>
                                        <Box style={{ borderRadius: '20px', display: 'flex', alignItems: 'flex-end', flex: '0.94', justifyContent: 'center', backgroundColor: 'white' }}>
                                            {/* <SavedSearchIcon></SavedSearchIcon> */}
                                            {/* <TextField
                                            name='search'
                                            // value={login.password}
                                            // onChange={loginChange}
                                            label="Search for Friends"
                                            variant="outlined" /> */}
                                            <InputGroup style={{ height: '50px ' }}>
                                                <FormControl
                                                    placeholder="Search for friends..."
                                                    aria-label="friends"
                                                    aria-describedby="basic-addon1"
                                                    style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
                                                />
                                                <InputGroup.Text id="basic-addon1" style={{ height: '50px', backgroundColor: 'rgb(65, 129, 246)', cursor: 'pointer', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}><SearchIcon style={{ color: 'white' }}></SearchIcon></InputGroup.Text>
                                            </InputGroup>
                                        </Box>
                                    </DrawerHeader>
                                    {list(anchor)}
                                </Drawer>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                :
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

