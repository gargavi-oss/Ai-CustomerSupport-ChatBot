"use client"
import React from 'react'
import Navbar from './Navbar'

const DashboardClient = ({ownerId,email}: {ownerId: string; email: string}) => {
    const handleLogin = () => {
        window.location.href = "/api/auth/login";
      };
      const handleDashboard = ()=>{
        window.location.href="/dashboard";
      }
  return (
    <div className="min-h-screen bg-linear-to-br from-white to-zinc-200 text-zinc-900 overflow-x-hidden">
        <Navbar email={email} handleLogin={handleLogin} handleDashboard={handleDashboard}/>
        
    </div>
  )
}

export default DashboardClient