import React, { useEffect, useState } from 'react'
import { Inputbox } from './Inputbox'
import { Button } from './Button'
import { SearchedUsers } from './SearchedUsers'
import axios from 'axios'

export const User = () => {
    const [users, setUsers] = useState([])
    const [filterText, setFilterText] = useState("") 

    useEffect(() => {
        filterSearch()
    }, [filterText])

    const filterSearch = async() => {
        const filteredUsers = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filterText, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        console.log(filteredUsers.data.users)
        setUsers(filteredUsers.data.users)
    }

    return (
        <div>
            <Inputbox field="text" placeholder="Search users..." name="users" labelName="Users" onChange={e => {
                setFilterText(e.target.value)
            }} />
            <div className='flex justify-between items-center flex-col gap-2'>
                {users.map(user => <SearchedUsers key={user._id} username={user.username} name={user.first_name + " " + user.last_name} id={user._id}  />)}
                
            </div>
        </div>
    )
}
