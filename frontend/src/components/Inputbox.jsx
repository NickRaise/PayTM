import React from 'react'

export const Inputbox = ({ name, labelName, placeholder, field, onChange }) => {
    return (
        <div className='flex flex-col justify-center items-start m-3'>
            <label htmlFor={name} className='text-sm'><b>{labelName}</b></label>
            <input onChange={onChange} className='px-2 py-1 rounded-md border border-slate-400 w-full' type={field} name={name} placeholder={placeholder} />
        </div >
    )
}
