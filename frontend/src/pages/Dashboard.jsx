import React, { useEffect } from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { User } from '../components/User'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const isSignedin = localStorage.getItem("token")
        if (!isSignedin) {
            return navigate("/signin")
        }
    }, [navigate])

    return (
        <>
            <Appbar />
            <div className='m-6'>
                <Balance amount={10000} />
                <User />
            </div>
        </>
    )
}
