import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'

import { FaLink, FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa6";

import BrandName from './branding/BrandName'
import ModalNewJob from './modals/ModalNewJob';
import { logout } from '../common/Api';

export default function AuthHeader({ fetchLibrary, library }) {
    const navigate = useNavigate()
    const [isShowingMenuDropdown, setIsShowingMenuDropdown] = useState(() => { return false })
    const [isCreatingNewJob, setIsCreatingNewJob] = useState(() => { return false })
    const goToVideoById = (jobId) => {
        fetchLibrary()
        setIsCreatingNewJob(false)
        if (jobId) navigate(`/library/${jobId}`)
    }
    const handleLogoClick = () => {
        return navigate('/library')
    }
    const attemptLogout = (e) => {
        e.stopPropagation()
        logout().then((res) => navigate("/landing-welcome")).catch((err) => { return })
    }
    return (
        <div className="header-outer">
            <div className="header-inner">
                {isCreatingNewJob && <ModalNewJob hideModal={() => setIsCreatingNewJob(false) } goToVideoById={goToVideoById}/> }
                <div className="header common-outer-width">
                    <div className="header-section"><BrandName handleLogoClick={handleLogoClick}/></div>
                    {library &&
                    <div className="header-section">
                        {library.length > 0 &&
                        <div className="header-search" onClick={() => setIsCreatingNewJob(true)}>
                            <FaLink/>
                            <div className="header-search-button">Enter a YouTube video URL</div>
                        </div>
                        }
                        {library.length > 0 &&
                        <div className="header-search-mobile" onClick={() => setIsCreatingNewJob(true)}>
                            <FaPlus/>
                            <div className="header-search-mobile-text">New video</div>
                        </div>
                        }
                    </div>
                    }
                    {!library && <div className="header-section"></div> }
                    <div className="header-section header-section-menu">
                        <div style={{cursor: "pointer", display: "flex", alignItems: "center", gap: "8px"}} onClick={() => setIsShowingMenuDropdown(!isShowingMenuDropdown)}>My Account {isShowingMenuDropdown ? <FaAngleUp/> : <FaAngleDown/>}</div>
                        {isShowingMenuDropdown &&
                        <div className="header-account-menu-outer">
                            <div className="header-account-menu">
                                <span onClick={() => navigate("/account")}>Manage plan</span>
                                <a href="mailto:support@commentpilgrim.com">Contact support</a>
                                <span onClick={() => navigate("/terms-of-service")}>Terms of Service</span>
                                <span onClick={(e) => attemptLogout(e)}>Logout</span>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
