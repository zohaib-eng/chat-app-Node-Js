/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useState,useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/ApiRoutes';
import Contacts from '../component/Contacts';

function Chat() {
    // const navigate=useNavigate();
    // const [contacts,setContacts]=useState([])
    // const [currentUser,setCurrentUsers]=useState(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(async()=>{
    //     if(!localStorage.getItem("chat-app-user")){
    //         navigate('/login');
    //     }else{
    //         setCurrentUsers(await JSON.parse(localStorage.getItem("chat-app-user")))
    //     }
    // },[])
    // useEffect(async()=>{
    //     if(currentUser){
    //         const data=await axios.get(`${allUsersRoute}/${currentUser._id}`)
    //         setContacts(data.data)
    //     }else{
    //         navigate("/login");
    //     }
    // },[currentUser])
    return (
        <Container>
            <div className='container'>
                
            </div>
        </Container>
    );
}

const Container=styled.div`
height:100vh;
width:100wh;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.container {
    height:85vh;
    width:85vw;
    background-color:#00000076;
    display:grid;
    grid-template-columns:25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
        grid-template-columns:35% 65%;
    }
}
`;


export default Chat
