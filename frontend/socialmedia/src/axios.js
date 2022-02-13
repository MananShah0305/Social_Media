import axios from 'axios'

const instance=axios.create({
    baseURL:'http://localhost:5000',
})

export default instance

// const registerInvalidate = () => {
//     if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(register.email))) {
//       setRegisterError({
//         ...registerError,
//         email: 'Invalid Email.'
//       })
//       setRegisterInvalid({
//         ...registerInvalid,
//         email: true
//       })
//     }
//     else {
//       setRegisterInvalid({
//         ...registerInvalid,
//         email: false
//       })
//     }

//     if (register.username.length < 6) {
//       setRegisterError({
//         ...registerError,
//         username: 'Username should have more than 6 characters'
//       })
//       setRegisterInvalid({
//         ...registerInvalid,
//         username: true
//       })
//     }
//     else if (!(/^[a-z0-9_.]+$/.test(register.username)) && register.username.length >= 6) {
//       setRegisterError({
//         ...registerError,
//         username: 'Username should only be composed of letters, numbers, underscore and period.'
//       })
//       setRegisterInvalid({
//         ...registerInvalid,
//         username: true
//       })
//     }
//     else {
//       setRegisterInvalid({
//         ...registerInvalid,
//         username: false
//       })
//     }

//     if (register.password.length < 8) {
//       setRegisterError({
//         ...registerError,
//         password: 'Password should have more than 8 characters'
//       })
//       setRegisterInvalid({
//         ...registerInvalid,
//         password: true
//       })
//     }
//     else if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/.test(register.password)) && register.password.length >= 8) {
//       setRegisterError({
//         ...registerError,
//         password: 'Password should contain atleast one uppercase character, one lowercase character, one digit and one special character.'
//       })
//       setRegisterInvalid({
//         ...registerInvalid,
//         password: true
//       })
//     }
//     else {
//       setRegisterInvalid({
//         ...registerInvalid,
//         password: false
//       })
//     }

//     console.log(register);
//   }

// const registerSubmit = () => {

//     const body = {
//       email: register.email,
//       username: register.username,
//       password: register.password,
//     }

//     registerInvalidate()

//     console.log(registerInvalid);
//     if (Object.values(registerInvalid).every(item => item)) {
//       setAlertStatus(true)
      // if (true) {
      //   axios.post('/signUp', body)
      //     .then((res) => {
      //       setAlertStatus(true)
      //       if (res.data.status == 'error') {
      //         alert = <SweetAlert
      //           error
      //           title="Error!"
      //           onConfirm={onConfirm} >
      //           {res.data.message}<span>&#128545;</span>.
      //         </SweetAlert>
      //       }
      //       else {
      //         alert = <SweetAlert
      //           success
      //           title="Success!"
      //           onConfirm={onConfirm} >
      //           {res.data.message}<span>&#128512;</span>.
      //         </SweetAlert>
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     })
      // }
//     }
//   }