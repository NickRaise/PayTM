import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const Sendmoney = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [amount, setAmount] = useState(0)
    const [resMsg, setResMsg] = useState("")


    const user = Object.fromEntries(searchParams.entries())
    console.log("rerendering component")

    useEffect(() => {
        if (!user.id)
            navigate("/dashboard")

    }, [])

    const beginTransfer = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: user.id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            console.log(res)
            setResMsg(res.data.message)
            setTimeout(() => {
                navigate("/dashboard")
            }, 2000)
        } catch (res) {
            setResMsg(res.response.data.message)
            setTimeout(() => {
                navigate("/dashboard")
            }, 2000)
        }
    }

    return (
        <div className='w-full h-screen bg-slate-200 flex justify-center items-center'>
            <div className='bg-slate-100 p-4 rounded-md shadow-md'>
                <h1 className='text-center m-4 font-bold text-3xl'>Send Money</h1>
                <div className='mt-9'>
                    <div className='flex items-center gap-4'>
                        <div className='w-10 h-10 bg-green-400 rounded-full text-white flex justify-center items-center text-2xl'>{user.name && user.name[0].toUpperCase()}</div>
                        <div className='flex flex-col'>
                            <span className='text-lg'>{user.name}</span>
                            <span className='text-sm text-slate-700'>{"@" + user.username}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Inputbox onChange={e => setAmount(e.target.value)} name="amount" field="number" labelName="Amount (in Rs)" placeholder="Enter amount" />
                </div>
                <Button onClick={beginTransfer} text="Transfer" />
                {resMsg != "" && resMsg == "Transfer successful" ? 
                    <div className='text-green-600 text-center mt-2'>
                        {resMsg}
                    </div> : 
                    <div className='text-red-600 text-center mt-2'>
                        {resMsg}
                    </div>
                }
            </div>
        </div>
    )
}
