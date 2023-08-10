import React from 'react'
import BorderSpinner from '../spinner/BorderSpinner'

function LoadingComponent() {
    return (
        <>
            <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <BorderSpinner />
            </div>
        </>
    )
}

export default LoadingComponent