import React from 'react'
import { useNavigate } from 'react-router-dom'

import BrandName from './branding/BrandName'

export default function GeneralHeader() {
    const navigate = useNavigate()
    const goHome = () => {
        navigate("/")
    }
    return (
    <div className="header-outer">
        <div className="header-inner">
            <div className="header common-outer-width">
                <div className="header-section"><BrandName handleLogoClick={goHome}/></div>
                <div className="header-section">
                </div>
                <div className="header-section">Log In</div>
            </div>
        </div>
    </div>
    )
}
