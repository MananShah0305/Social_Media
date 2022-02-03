const io=require('socket.io')(8000,{
    pingTimeout:600000, //The socket becomes inactive after these many milli seconds if no message is sent for this much time. Done to save bandwidth
    cors:{
        origin:'http://localhost:3000'
    },
})

let users=[]

const addUser=(userId,socketId)=>{
    !users.some(user=>user.userId==userId) && users.push({userId,socketId})
}

const removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId!=socketId)
}

const getUser=(userId)=>{
    console.log(users)
    console.log(userId)
    return users.find(user=>user.userId==userId)
}

io.on('connection',(socket)=>{
    console.log('User Connected')

    socket.on('addUsers',userId=>{
        addUser(userId,socket.id)
        io.emit('getUsers',users)
    })

    socket.on('sendMessage',({receiverId,text})=>{
        const user=getUser(receiverId)
        console.log(user.socketId)
        io.to(user.socketId).emit('getMessage',{
            text
        })
    })

    // socket.on('disconnect',()=>{  //disconnect event is fired internally
    //     console.log('User disconnected')
    //     removeUser(socket.id)
    //     io.emit('getUsers',users)
    // })
})