import React from 'react'

const CardProvider = ({ children }) => {
    return (
        <>
            <div className="card-section">
                {children}
            </div>
        </>
    )
}

export default CardProvider