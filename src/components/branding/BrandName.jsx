import React from 'react'

export default function BrandName({height, handleLogoClick}) {
    const getStyle = () => {
        if (!height) return {}
        return { fontSize: `${height}px`}
    }
    return (
        <div className="brand" onClick={handleLogoClick}>
            <div style={getStyle()}>Comment</div>
            <div style={getStyle()}>Pilgrim</div>
        </div>
    )
}
