import React,{useState} from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import {Button} from '@material-ui/core';

function Login() {
    const history = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const action = key => (
        
            <Button onClick={() => { closeSnackbar(key) }}>
                <CancelIcon style={{color: "white"}}/>
            </Button>
        
    );
    const guestEmail = "myguest@gmail.com";
    const guestPassword = "MYGUest1234";

    const signIn = (e)=>{
        e.preventDefault();
        enqueueSnackbar('Logging In..', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            TransitionComponent: Slide,
            autoHideDuration: 1000,
            action
        });
        auth.signInWithEmailAndPassword(email,password)
        .then((auth)=>{
            history("/", { replace: true })
        }).catch(error=>alert(error.message));
    }
    const register = (e)=>{
        e.preventDefault();
        enqueueSnackbar('Sign Up Processing..', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            TransitionComponent: Slide,
            autoHideDuration: 1500,
            action
        });
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            //on Successful creation firebase return auth object
            console.log(auth);
            if(auth){
                history("/", { replace: true })
            }
        }).catch(error=>alert(error.message));
    }
    const guestSignIn = (e)=>{
        e.preventDefault();
        enqueueSnackbar('Logging In...', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            TransitionComponent: Slide,
            autoHideDuration: 1500,
            action
        });
        auth.signInWithEmailAndPassword(guestEmail,guestPassword)
        .then((auth)=>{
            history("/", { replace: true })
        }).catch(error=>alert(error.message));
    }
    return (
        <div className="login">
            <Link to="/">
                <img className="loginLogo" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt=""/>
            </Link>
            <div className="loginContainer">
                <h1>{"Sign-in"}</h1>
                <form>
                    <h5>{"E-mail"}</h5>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>

                    <h5>{"Password"}</h5>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>

                    <button className="loginSignInButton" type="submit" onClick={signIn} style={{cursor:"pointer"}}>{"Sign In"}</button>
                </form>
                <button className="loginSignInButton" type="submit" onClick={guestSignIn} style={{cursor:"pointer"}}>{"Guest Log In"}</button>
                <button className="LoginRegisterButton" onClick={register} style={{cursor:"pointer"}}>Create Your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
