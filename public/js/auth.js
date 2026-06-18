import { auth } from "./firebaseConfig.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const registerBtn =
document.getElementById("registerBtn");

if(registerBtn){

registerBtn.addEventListener("click",()=>{

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

createUserWithEmailAndPassword(
auth,
email,
password
)

.then(()=>{

alert("Registration Successful");

window.location.href="login.html";

})

.catch((error)=>{

alert(error.message);

});

});

}

const loginBtn =
document.getElementById("loginBtn");

if(loginBtn){

loginBtn.addEventListener("click",()=>{

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

signInWithEmailAndPassword(
auth,
email,
password
)

.then(()=>{

alert("Login Successful");

window.location.href="dashboard.html";

})

.catch((error)=>{

alert(error.message);

});

});

}