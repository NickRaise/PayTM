import React from 'react'

export const Button = ({text}) => {
    return (
        <button className='w-full bg-slate-900 text-white p-2 py-1 rounded-md hover:bg-slate-950'>
            {text}
        </button>
    )
}
