import React from 'react'
import { Inputbox } from './Inputbox'
import { Button } from './Button'

export const User = () => {
    return (
        <div>
            <Inputbox field="text" placeholder="Search users..." name="users" labelName="Users" />
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 flex justify-center items-center bg-yellow-200 rounded-full'>H</div>
                    <span>Hash</span>
                </div>
                <div>
                    <Button text="Send Money" />
                </div>
            </div>
        </div>
    )
}
