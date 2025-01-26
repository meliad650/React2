//import { userContext } from './Main'
import { React, useContext } from 'react'

function Info() {
    const userName=JSON.parse(localStorage.getItem("loggedInUser"));
    // const [currentUser, setCurrentUser] = useContext(userContext);
    // const { id, name, username, email,  phone} = userName;

    return (
        <>
            <h1>info</h1>
            <div><label >id:</label><label >{userName.id}</label></div>
            <div><label >name:</label><label >{userName.name}</label></div>
            <div><label >username:</label><label >{userName.username}</label></div>
            <div><label >email:</label><label >{userName.email}</label></div>
            <div><label >phone:</label><label >{userName.phone}</label></div>

        </>
    )
}
export default Info