let users = [{
    'cric.manan': {
        friends: {
            darshil: {
                chat: [{ message: 'hi', type: 'sent' }, { message: 'hi', type: 'sent' }, { message: 'hi', type: 'sent' }]
            },
            jimit: {
                chat: [{ message: 'hi', type: 'sent' }, { message: 'hi', type: 'sent' }, { message: 'hi', type: 'sent' }]
            }
        }
    },
    'darshil': {
        friends: {
            manan: {
                chat: [{ message: 'hi', type: 'sent' }, { message: 'hi', type: 'sent' }, { message: 'hi', type: 'sent' }]
            },
            jimit: {
                chat: [{ message: 'hi', type: 'sent' }, { message: 'hi', type: 'sent' }, { message: 'hi', type: 'sent' }]
            }
        }
    },
}
]

const a = {
    "_id": {
        "$oid": "61cc3cd2a3dbb293095956bf"
    },
    "cric.manan":
    {
        "friends":
        {
            "darshil":
            {
                "chat": [
                    {
                        "message": "hi",
                        "type": "sent",
                        "timestamp": "2011-10-05T14:48:00.000Z"
                    },
                    {
                        "message": "hi",
                        "type": "received",
                        "timestamp": "2021-12-05T14:48:00.000Z"
                    },
                ]
            },
            "jimit":
            {
                "chat": [
                    {
                        "message": "hi",
                        "type": "sent",
                        "timestamp": "2011-10-05T14:48:00.000Z"
                    },
                    {
                        "message": "hi",
                        "type": "received",
                        "timestamp": "2021-12-05T14:48:00.000Z"
                    },
                ]
            }
        }
    }
}
let friend = []
let ab = 'cric.manan'

Object.keys(users[0]).map((use, idx) => {
    friend.push(use)
    // console.log(idx)
})

// console.log(users[0][ab])
"Wed Dec 29 2021 17:31:58 GMT+0530 (India Standard Time)"

let abcd = [{
    name: 'Manan'
}]

console.log(abcd.push({ name: 'Darshil' }))
console.log(abcd)