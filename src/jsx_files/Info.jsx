import { userContext } from './Main'
import { React, useContext } from 'react'

function Info() {
    const [currentUser, setCurrentUser] = useContext(userContext);
    const { id, name, username, email,  phone} = currentUser;

    return (
        <>
            <h1>info</h1>
            <div><label >id:</label><label >{id}</label></div>
            <div><label >name:</label><label >{name}</label></div>
            <div><label >username:</label><label >{username}</label></div>
            <div><label >email:</label><label >{email}</label></div>
            <div><label >phone:</label><label >{phone}</label></div>

        </>
    )
}
export default Info