import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'
import { ButtonWarning } from '../components/ButtonWarning'

export const Signup = () => {
    const navigate = useNavigate()
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        const isSignedin = localStorage.getItem("token")
        if (!isSignedin) 
            return navigate("/dashboard")
    }, [navigate])

    const signupUser = async () => {
        console.log("send")
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                first_name,
                last_name,
                username,
                email,
                password,
            })
            localStorage.setItem("token", res.data.token)
            setErrMsg("")
            return navigate("/dashboard")
        } catch (res) {
            if (res.response.status == 411) {
                setErrMsg(res.response.data.message)
            }
        }
    }

    return (
        <div className='w-full bg-slate-300 h-screen flex justify-center items-center'>
            <div className='text-center bg-white rounded-lg p-5 w-[320px]'>
                <Heading text="Sign Up" />
                <SubHeading text="Enter your information here for account creation" />
                <Inputbox onChange={e => setFirst_name(e.target.value)} name="first_name" labelName="First Name" placeholder="Nikhil" field="text" />
                <Inputbox onChange={e => setLast_name(e.target.value)} name="last_name" labelName="Last Name" placeholder="Kumar" field="text" />
                <Inputbox onChange={e => setUsername(e.target.value)} name="username" labelName="Username" placeholder="Nikhil123" field="text" />
                <Inputbox onChange={e => setEmail(e.target.value)} name="email" labelName="Email" placeholder="abc@gmail.com" field="email" />
                <Inputbox onChange={e => setPassword(e.target.value)} name="password" labelName="Password" placeholder="1234567890" field="password" />
                <div className='my-1'>
                    <Button text="Sign up" onClick={signupUser} />
                    {errMsg !== "" &&
                        <div className='text-sm text-red-500 mt-1'>
                            {errMsg}
                        </div>
                    }
                </div>
                <ButtonWarning text="sign in" warningText="Already have an account?" to="/signin" />
            </div>
        </div>
    )
}

