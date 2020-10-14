import React from 'react'

function Dashboard() {
    return (
        <div className="dashboard-wrapper">
        {/* grid test code */}
        <div className="p-grid grid-test">{/*  remove grid-test class in future */}
            <div className="p-col-2">col 2 of 12</div>
            <div className="p-col-4">col 4 of 12 </div>
            <div className="p-col-6">col 6 of 12 </div>
        </div>
        </div>
    )
}

export default Dashboard
