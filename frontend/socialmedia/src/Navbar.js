import React, { useState, useEffect } from 'react'
import './Navbar.css'
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import SearchIcon from '@mui/icons-material/Search';
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
import axios from './axios.js'

function Navbar(props) {
    const [state, setState] = useState({ right: false });
    const [userInfo, setuserInfo] = useState([])
    useEffect(() => {
        axios.get('/username')
            .then(res => {
                setuserInfo(res.data.allUserInfo)
            })
            .catch(err => console.log(err))
    }, [])

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

    return (
        <>
            <div class='navbar'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: '0.11' }}>
                    <img src="https://cdn.pixabay.com/photo/2022/01/26/23/18/instagram-6970242__340.jpg" alt="" height='50' width='50' />
                    <p style={{ margin: '0px' }}>Social Media</p>
                </div>
                <h2 style={{ margin: '0px' }}>Welcome {props.username} !</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: '0.22' }}>
                    <Tooltip title="Home" placement="bottom">
                        <IconButton>
                            <HomeOutlinedIcon style={{ fontSize: '30px', color: '#4181f6' }}></HomeOutlinedIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Post" placement="bottom">
                        <IconButton>
                            <InsertPhotoOutlinedIcon style={{ fontSize: '26px', color: '#4181f6' }}></InsertPhotoOutlinedIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Chat" placement="bottom">
                        <IconButton>
                            <MapsUgcOutlinedIcon style={{ fontSize: '26px', color: '#4181f6' }}></MapsUgcOutlinedIcon>
                        </IconButton>
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
                                        <InputGroup style={{ height: '50px '}}>
                                            <FormControl
                                                placeholder="Search for friends..."
                                                aria-label="friends"
                                                aria-describedby="basic-addon1"
                                                style={{ borderTopLeftRadius: '20px',borderBottomLeftRadius: '20px' }}
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
        </>
    )
}

export default Navbar

