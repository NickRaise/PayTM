import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonWarning = ({ warningText, text, to}) => {
    return (
        <>
            {warningText + " "}
            <Link className='underline text-blue-600' to={to}>{text}</Link>
        </>
    )
}
