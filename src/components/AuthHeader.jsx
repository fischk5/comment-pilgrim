import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'

import { FaLink } from "react-icons/fa6";

import BrandName from './branding/BrandName'
import ProfilePicture from './profiles/ProfilePicture';

import ModalNewJob from './modals/ModalNewJob';

export default function AuthHeader({ fetchLibrary, library }) {
    const navigate = useNavigate()
    const [isCreatingNewJob, setIsCreatingNewJob] = useState(() => { return false })
    const goToVideoById = (jobId) => {
        fetchLibrary()
        setIsCreatingNewJob(false)
        if (jobId) navigate(`/library/${jobId}`)
    }
    const handleLogoClick = () => {
        return navigate('/library')
    }
    return (
        <div className="header-outer">
            <div className="header-inner">
                {isCreatingNewJob && <ModalNewJob hideModal={() => setIsCreatingNewJob(false) } goToVideoById={goToVideoById}/> }
                <div className="header common-outer-width">
                    <div className="header-section"><BrandName handleLogoClick={handleLogoClick}/></div>
                    <div className="header-section">
                        {library.length > 0 &&
                        <div className="header-search" onClick={() => setIsCreatingNewJob(true)}>
                            <FaLink/>
                            <div className="header-search-button">Enter a YouTube video URL</div>
                        </div>}
                    </div>
                    <div className="header-section"><ProfilePicture/></div>
                </div>
            </div>
        </div>
    )
}
