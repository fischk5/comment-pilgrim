import React from 'react'

import BrandName from './branding/BrandName'

export default function GeneralHeader() {
    return (
    <div className="header-outer">
        <div className="header-inner">
            <div className="header common-outer-width">
                <div className="header-section"><BrandName/></div>
                <div className="header-section">
                </div>
                <div className="header-section">Log In</div>
            </div>
        </div>
    </div>
    )
}
