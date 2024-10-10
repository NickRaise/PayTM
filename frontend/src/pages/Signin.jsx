import React from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'
import { ButtonWarning } from '../components/ButtonWarning'

export const Signin = () => {
    return (
        <div className='w-full bg-slate-300 h-screen flex justify-center items-center'>
            <div className='text-center bg-white rounded-lg p-5 w-[320px]'>
                <Heading text="Sign In" />
                <SubHeading text="Enter your credentials to access your account" />
                <Inputbox name="email" labelName="Email" placeholder="abc@gmail.com" field="email" />
                <Inputbox name="password" labelName="Password" placeholder="1234567890" field="password" />
                <div className='my-1'>
                    <Button text="Sign Ip" />
                </div>
                <ButtonWarning text="sign un" warningText="Don't have an account?" to="/signup" />
            </div>
        </div>
    )
}
