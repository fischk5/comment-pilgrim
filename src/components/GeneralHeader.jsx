import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFeatherPointed } from "react-icons/fa6";

import BrandName from './branding/BrandName'

export default function GeneralHeader({hideNavs}) {
    const navigate = useNavigate()
    const goHome = () => {
        navigate("/")
    }
    return (
    <div className="header-outer header-outer-general">
        <div className="header-outer-backdrop"></div>
        <div className="header-inner">
            <div className="header common-outer-width">
                <div className="header-section header-section-general"><BrandName handleLogoClick={goHome}/></div>
                <div className="header-section">
                    {!hideNavs && <span className="header-section-navigation"> <a href="#process">How it works</a></span>}
                    {!hideNavs && <span className="header-section-navigation"> <a href="#pricing">Pricing</a></span>}
                    {!hideNavs && <span className="header-section-navigation"> <a href="#faq">FAQ</a></span>}
                </div>
                <div className="header-section header-section-authenticators header-section-general">
                    <span style={{cursor: "pointer"}} onClick={() => navigate("/login")}>Login</span>
                    <span className="header-section-authenticator-register" style={{cursor: "pointer"}} onClick={() => navigate("/register")}>Sign Up<FaFeatherPointed/></span>
                </div>
            </div>
        </div>
    </div>
    )
}
