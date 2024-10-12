import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'
import { ButtonWarning } from '../components/ButtonWarning'

export const Signin = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        const isSignedin = localStorage.getItem("token")
        if (isSignedin) 
            navigate("/dashboard")
    }, [])

    const signinUser = async () => {
        console.log("Send Signin")
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            })
            console.log(res)
            localStorage.setItem("token", res.data.token)
            setErrMsg("")
            navigate("/dashboard")
        } catch (res) {
            console.log(res)
            if (res.response.status == 411)
                setErrMsg(res.response.data.message)
        }
    }

    return (
        <div className='w-full bg-slate-300 h-screen flex justify-center items-center'>
            <div className='text-center bg-white rounded-lg p-5 w-[320px]'>
                <Heading text="Sign In" />
                <SubHeading text="Enter your credentials to access your account" />
                <Inputbox onChange={e => setUsername(e.target.value)} name="username" labelName="Username" placeholder="Nikhil123" field="text" />
                <Inputbox onChange={e => setPassword(e.target.value)} name="password" labelName="Password" placeholder="1234567890" field="password" />
                <div className='my-1'>
                    <Button text="Sign In" onClick={signinUser} />
                    {errMsg !== "" &&
                        <div className='text-sm text-red-500 mt-1'>
                            {errMsg}
                        </div>
                    }
                </div>
                <ButtonWarning text="sign un" warningText="Don't have an account?" to="/signup" />
            </div>
        </div>
    )
}
