import React from 'react'

export const Appbar = () => {
    return (
        <div className='bg-slate-100 flex justify-between items-center p-4 py-2 shadow-md'>
            <div>
                <b>OurTRANSFER App</b>
            </div>
            <div className='flex gap-4 items-center'>
                <span>Name</span>
                <div className='bg-green-300 w-10 h-10 rounded-full flex justify-center items-center'>N</div>
            </div>
        </div>
    )
}
