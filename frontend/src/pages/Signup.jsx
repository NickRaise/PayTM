import React from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'
import { ButtonWarning } from '../components/ButtonWarning'

export const Signup = () => {
    return (
        <div className='w-full bg-slate-300 h-screen flex justify-center items-center'>
            <div className='text-center bg-white rounded-lg p-5 w-[320px]'>
                <Heading text="Sign Up" />
                <SubHeading text="Enter your information here for creating the account creation" />
                <Inputbox name="first_name" labelName="First Name" placeholder="Nikhil" field="text" />
                <Inputbox name="last_name" labelName="Last Name" placeholder="Kumar" field="text" />
                <Inputbox name="email" labelName="Email" placeholder="abc@gmail.com" field="email" />
                <Inputbox name="password" labelName="Password" placeholder="1234567890" field="password" />
                <div className='my-1'>
                    <Button text="Sign up" />
                </div>
                <ButtonWarning text="sign in" warningText="Already have an account?" to="/signin" />
            </div>
        </div>
    )
}

