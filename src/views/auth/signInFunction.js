import React from 'react';
var passwordRef = document.getElementById("Password")

const signInFunction = () =>{

    let user = {
        password :  passwordRef.nodeValue,
    }
    console.log(user);
    // return(user)
    
};



export default signInFunction