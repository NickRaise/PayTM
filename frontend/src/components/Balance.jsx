import React from 'react'

export const Balance = ({ amount }) => {
    return (
        <div className='w-full p-2'>
            <b>Your Balance : {"Rs " + amount} </b>
        </div>
    )
}
