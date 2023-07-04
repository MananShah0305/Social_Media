import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import axios from '../axios.js'
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { blueGrey, deepOrange, deepPurple } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EmojiPicker, { EmojiStyle, SkinTones, Theme, Categories, EmojiClickData, Emoji, SuggestionMode, SkinTonePickerLocation } from "emoji-picker-react";

import IconButton from '@mui/material/IconButton';
import ButtonBootstrap from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup, FormControl } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';
import '../Styles/Homepage.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SendIcon from '@mui/icons-material/Send';

function ChatSection(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElEmojiPicker, setAnchorElEmojiPicker] = useState(null);
    const [activeChats, setActiveChats] = useState([])
    // const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [message, setMessage] = useState("")
    // const [messageSent, setMessageSent] = useState(false)

    useEffect(async () => {
        const chatInfo = await axios.post(`/chats/${sessionStorage.getItem('username')}-dashy1997`, { name: props.username, friendName: 'dashy1997' })
        try {
            setActiveChats(chatInfo.data.chatInfo)
        }
        catch (err) {
            console.log(err)
        }
    }, [])


    const open = Boolean(anchorEl);

    const openEmojiPicker = Boolean(anchorElEmojiPicker);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickEmojiPicker = (event) => {
        setAnchorElEmojiPicker(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseEmojiPicker = () => {
        setAnchorElEmojiPicker(null);
    };

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleEmojiClick = (emojiObject) => {
        // const getEmoji = () => <Emoji
        //     unified={selectedEmoji}
        //     emojiStyle={EmojiStyle.GOOGLE}
        //     size={22}
        // />
        // console.log(emojiObject)
        setMessage(message + emojiObject.emoji)
    }

    const sendMessage = async () => {
        const message = await axios.patch(`/chats/${sessionStorage.getItem('username')}-dashy1997`, { name: props.username, friendName: 'dashy1997', message: message })
        setMessage(null)
    }

    return (
        <div style={{ backgroundColor: '#efefef', height: '100vh' }}>
            <Navbar userInfo='cric.manan'></Navbar>
            <Card style={{ backgroundColor: 'white', margin: '40px', height: '78vh' }}>
                <Stack
                    direction='row'
                >
                    <Card style={{ maxHeight: '80vh', backgroundColor: 'white', width: '50vw' }}>
                        <Stack spacing={2} direction='row' justifyContent='space-between' alignItems='center' style={{ backgroundColor: 'rgb(65, 129, 246)', padding: '20px' }}>
                            <h3 style={{ margin: '0px', color: 'white' }}>Chats</h3>
                            <InputGroup style={{ width: '60%' }}>
                                <FormControl
                                    placeholder="Search for friends..."
                                    aria-label="friends"
                                    aria-describedby="basic-addon1"
                                    style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
                                />
                                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'rgb(65, 129, 246)', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                                    <IconButton style={{ padding: '0px' }}>
                                        <SearchIcon style={{ color: 'white' }}></SearchIcon>
                                    </IconButton>
                                </InputGroup.Text>
                            </InputGroup>
                        </Stack>
                        <List style={{ padding: '5px 0px', overflowY: 'scroll', height: '68vh' }}>
                            {
                                activeChats?.friends?.map(ac => {
                                    ac.showChat && (
                                        <ListItem style={{ padding: '5px' }}>
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
                                                        <p style={{ margin: '0px', fontSize: '13px' }}>Hey, what are you doing?</p>
                                                    </Stack>
                                                </Stack>
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>

                    </Card>
                    <Divider orientation="vertical" style={{ width: '2px', backgroundColor: 'grey', height: '100vh' }} />
                    <Stack spacing={2} style={{ width: '100vw' }}>
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
                                    <MenuItem>Block</MenuItem>
                                </Menu>
                            </Stack>
                            <Stack spacing={2} style={{ height: '59vh', overflowY: 'scroll', padding: '40px', background: `url('https://t4.ftcdn.net/jpg/02/95/46/09/360_F_295460913_KBu2PfHEGfuFPPUWGEztWntnqmw0UAQe.jpg') center/cover` }}>
                                <Paper elevation={3} style={{ padding: '10px 20px', borderRadius: '20px', width: 'fit-content', maxWidth: '28vw', backgroundColor: '#f3f3f3' }}>Hi</Paper>
                                <Paper elevation={3} style={{ padding: '10px 20px ', borderRadius: '20px', width: 'fit-content', maxWidth: '28vw', backgroundColor: '#4181f6', color: 'white' }}>Hi</Paper>
                            </Stack>
                            <Stack
                                direction='row'
                                spacing={0}
                                alignItems='center'
                                style={{ backgroundColor: '#efefef', height: '70px' }}
                            >
                                <IconButton className='mx-1'>
                                    <SentimentVerySatisfiedIcon
                                        fontSize='medium'
                                        id="demo-positioned-button"
                                        aria-controls={openEmojiPicker ? 'demo-positioned-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openEmojiPicker ? 'true' : undefined}
                                        onClick={handleClickEmojiPicker}
                                    />
                                </IconButton>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorElEmojiPicker}
                                    open={openEmojiPicker}
                                    onClose={handleCloseEmojiPicker}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    {/* <MenuItem> */}
                                    <EmojiPicker
                                        onEmojiClick={handleEmojiClick}
                                        // autoFocusSearch={false}
                                        // theme={Theme.AUTO}
                                        // searchDisabled
                                        skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
                                        // height={400}
                                        // width="50%"
                                        emojiVersion="0.6"
                                        lazyLoadEmojis={true}
                                        // previewConfig={{
                                        //   defaultCaption: "Pick one!",
                                        //   defaultEmoji: "1f92a" // 🤪
                                        // }}
                                        // suggestedEmojisMode={SuggestionMode.RECENT}
                                        // skinTonesDisabled
                                        // searchPlaceHolder="Filter"
                                        // defaultSkinTone={SkinTones.MEDIUM}
                                        emojiStyle={EmojiStyle.GOOGLE}
                                    // categories={[
                                    //   {
                                    //     name: "Fun and Games",
                                    //     category: Categories.ACTIVITIES
                                    //   },
                                    //   {
                                    //     name: "Smiles & Emotions",
                                    //     category: Categories.SMILEYS_PEOPLE
                                    //   },
                                    //   {
                                    //     name: "Flags",
                                    //     category: Categories.FLAGS
                                    //   },
                                    //   {
                                    //     name: "Yum Yum",
                                    //     category: Categories.FOOD_DRINK
                                    //   }
                                    // ]}
                                    />
                                    {/* </MenuItem> */}
                                </Menu>
                                <InputGroup >
                                    <Form.Control
                                        aria-label="Example text with button addon"
                                        aria-describedby="basic-addon1"
                                        placeholder='Type your message....'
                                        style={{ borderRadius: '30px', paddingLeft: '16px', height: '40px' }}
                                        value={message}
                                        onChange={handleMessage}
                                    />
                                </InputGroup>
                                <IconButton className='mx-1'>
                                    <SendIcon fontSize='medium' onClick={sendMessage} />
                                </IconButton>
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
    }
}

export default connect(mapStateToProps)(ChatSection)
