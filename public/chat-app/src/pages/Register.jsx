import React , { useState , useEffect }from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Styled from 'styled-components'
import logo from "../assets/logo.svg";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { registerRouter } from '../utils/ApiRoutes';

function Register() {
    const navigate=useNavigate();
    const [values,setvalues]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
    });
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
    }

    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate("/")
        }
    },[])

    const handleSubmit=async (event)=>{
            event.preventDefault();
            if(handleValidation()){
                const {username,email,password}=values;
                const {data}=await axios.post(registerRouter,{username,email,password});
                if(data.status===false){
                    toast.error(data.message,toastOptions);
                }
                if(data.status===false){
                    localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                    navigate("/");
                }
            }
    };

    const handleValidation=()=>{
        const {confirmpassword,password,email,username}=values;
        if(password!==confirmpassword){
            toast.error("Password & Confirm Password should be the same.",
            toastOptions
            );
            return false;
        }
        else if(username.length<3){
            toast.error("Username should be greater than 3 characters.",
            toastOptions
            );
            return false;
        }
        else if(password.length<3){
            toast.error("Password should be equal or greater than 8 characters.",
            toastOptions
            );
            return false;
        }
        else if(email===""){
            toast.error("Email is required.",
            toastOptions
            );
        }
        return true;
    }

    const handleChange=(event)=>{
        setvalues({
            ...values,[event.target.name]:event.target.value
        })
    };
    return (
        <>
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand">
                    <img src={logo} alt='logo'></img>
                    <h1>snappy</h1>
                </div>
                <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)}></input>
                <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)}></input>
                <input type="Password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}></input>
                <input type="Password" placeholder="Confirm Password" name="confirmpassword" onChange={(e)=>handleChange(e)}></input>

                <button type='submit'>Create User</button>
                <span>Already have an account? <Link to="/login">LOGIN</Link></span>
            </form>
        </FormContainer>
        <ToastContainer/>
        </>
    )
}

const FormContainer = Styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;

  .brand{
    display:flex;
    gap:1rem;
    align-items:center;
    justify-content:center;
    img{
        height: 5rem;
    }
    h1{
        color: white;
        text-transform: uppercase;
    }
  }
  form{
    display:flex;
    flex-direction: column;
    gap: 2rem;
    background-color:#00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color: white;
        width:100%;
        font-size:1rem;
        &:focus{
            border: 0.1rem solid #997af0;
            outline:none;
        }
    }
    button{
        background-color: #997af0;
        color:white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size: 1rem;
        text-transform:uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #4e04ef;
        }
    }
    span{
        color:white;
        text-transfoarm: uppercase;
        a{
            color: #4e0eff;
            text-decoration:none;
            font-weight:bold;
        }
    }
  }
`;

export default Register
