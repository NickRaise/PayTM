import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './Button'

export const SearchedUsers = ({ username, name, id }) => {
    const navigate = useNavigate()
    const openSendMoneyTab = () => {
        console.log("Send money to " + name)
        navigate(`/send?id=${id}&username=${username}&name=${name}`)
    }
    return (
        <div className='px-14 flex justify-between items-center w-full'>
            <div className='flex items-center gap-3'>
                <div className='w-10 h-10 flex justify-center items-center bg-yellow-200 rounded-full'>{ username[0].toUpperCase()}</div>
                <span>{name}</span>
                <span className='text-slate-700'>{"@" + username}</span>
            </div>
            <div>
                <Button text="Send Money" onClick={openSendMoneyTab} />
            </div>
        </div>
    )
}
