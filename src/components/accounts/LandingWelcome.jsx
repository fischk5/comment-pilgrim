import React, { useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'

import { fetchAuth } from '../../common/Api'

export default function LandingWelcome({ authenticated, setAuthenticated }) {
    const navigate = useNavigate()
    const getAuth = () => {
        fetchAuth()
        .then((res) => {
            if (res.authenticated) {
                setAuthenticated(true)
                navigate("/library")
            } else {
                setAuthenticated(false)
                navigate("/")
            }
        })
        .catch((err) => {
            setAuthenticated(false)
            navigate("/")
        })
    }
    useEffect(() => {
        getAuth()
    // eslint-disable-next-line
    }, [])
    return (
        <div className="app-loader-out">
            <div className="app-load-in">
            <div className="app-load-welcome">
                <h1>Welcome to Comment Pilgrim</h1>
                <div className="loader"></div>
                <div>Loading your experience...</div>
            </div>
            </div>
        </div>
    )
}
