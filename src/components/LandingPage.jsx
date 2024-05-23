import React, { useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'

export default function LandingPage({authenticated}) {
    const navigate = useNavigate()
    useEffect(() => {
        if (authenticated === true) return navigate('/library')
    // eslint-disable-next-line
    }, [authenticated])
    return (
        <div>
            Welcome to Comment Pilgrim!
            <div>Go to your library</div>
        </div>
    )
}
