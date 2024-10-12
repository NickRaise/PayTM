import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { User } from '../components/User'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
    const [name, setName] = useState(null)
    const [amount, setAmount] = useState(null)

    const navigate = useNavigate()
    useEffect(() => {
        const isSignedin = localStorage.getItem("token")
        console.log(isSignedin)
        if (!isSignedin) {
            navigate("/signin")
        }
        const getUserData = async () => {
            const res = await axios.get("http://localhost:3000/api/v1/user/me", {
                headers: {
                    authorization: "Bearer " + isSignedin
                }
            })
            console.log(res.data)
            const { userInfo } = res.data
            setName(userInfo.first_name + " " + userInfo.last_name)
            setAmount(userInfo.balance)
        }
        getUserData()
    }, [])

    return (
        <>
            <Appbar name={name} />
            <div className='m-6'>
                <Balance amount={amount} />
                <User />
            </div>
        </>
    )
}
