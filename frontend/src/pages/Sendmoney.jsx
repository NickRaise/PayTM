import React from 'react'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'

export const Sendmoney = () => {
    return (
        <div className='w-full h-screen bg-slate-200 flex justify-center items-center'>
            <div className='bg-slate-100 p-4 rounded-md shadow-md'>
                <h1 className='text-center m-4 font-bold text-3xl'>Send Money</h1>
                <div className='mt-9'>
                    <div className='flex items-center gap-4'>
                        <div className='w-10 h-10 bg-green-400 rounded-full text-white flex justify-center items-center text-2xl'>A</div>
                        <div className='text-lg'>Friend's Name</div>
                    </div>
                </div>
                <div>
                    <Inputbox name="amount" field="number" labelName="Amount (in Rs)" placeholder="Enter amount" />
                </div>
                <Button text="Transfer"/>
            </div>
        </div>
    )
}
