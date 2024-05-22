import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import AuthHeader from './AuthHeader'

export default function VideoPage({ library }) {
    const navigate = useNavigate()
    const { jobId } = useParams();
    const updateJobInformation = () => {
        // Check if its in the library

        // Fetch it if it isn't
        return
    }
    useEffect(() => {
        updateJobInformation()
    }, [jobId])
    return (
        <div>
            <AuthHeader />
            <div className="common-outer-width">
                <div>Breadcrumbs</div>
                Job {jobId}
            </div>
        </div>
    )
}
