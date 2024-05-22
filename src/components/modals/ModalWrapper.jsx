import React from 'react'

export default function ModalWrapper({ children }) {
    return (
        <div className="modal-out">
            <div className="modal-in">
                <div className="modal">
                    {children}
                </div>
            </div>
        </div>
    )
}
