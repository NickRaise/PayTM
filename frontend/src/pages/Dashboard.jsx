import React from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { User } from '../components/User'

export const Dashboard = () => {
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
