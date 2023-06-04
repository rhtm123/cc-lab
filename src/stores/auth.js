import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { postData } from '../utils/auth';

// @ts-ignore
let defaultValue;
const initialValue = browser ? window.localStorage.getItem('user') ?? defaultValue : defaultValue;

const user = writable(initialValue);

let API_URL = import.meta.env.VITE_API_URL;


function getUser(email){
    let url = API_URL + 'auth/get-user-email/';
        postData(url, {"email":email})
          .then(data => {
            user.set(JSON.stringify(data));
            localStorage.setItem("user", JSON.stringify(data));
          }).catch(error => {
            console.log(error)
        })
}

if (initialValue){
    let email = JSON.parse(initialValue).user.email;
    getUser(email);
    setInterval(function() {
        getUser(email);
    }, 120000);
}

// user.subscribe((value) => {
//     if (browser) {
//       window.localStorage.setItem('user', value);
//     }
// });

export default user;