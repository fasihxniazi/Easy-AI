import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Home, Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(60%_120%_at_50%_-10%,#0e1530_0%,#0b1020_70%)]">
        <SignIn />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(60%_120%_at_50%_-10%,#0e1530_0%,#0b1020_70%)] overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full px-6 sm:px-10 h-14 flex items-center justify-between border-b border-white/10 bg-[rgba(14,21,48,0.85)] backdrop-blur-xl z-30">
        <span className='px-60'>
          <Home onClick={() => navigate('/')} className="w-6 h-6 text-slate-200 cursor-pointer" />
        </span>

        {/*<span className='px-60'><img
          className="cursor-pointer w-28 sm:w-36"
          src={assets.logo}
          alt="logo"
          onClick={() => navigate('/')}
        />
        </span>*/}

        {sidebar ? (
          <X onClick={() => setSidebar(false)} className="w-6 h-6 text-slate-200 sm:hidden" />
        ) : (
          <Menu onClick={() => setSidebar(true)} className="w-6 h-6 text-slate-200 sm:hidden" />
        )}
      </nav>
      {/* Sidebar */}
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      {/* Main content */}
      <main className="relative flex-1 min-h-[calc(100vh-56px)] px-2 sm:px-8 py-8 transition-all duration-300 sm:ml-64">
        <Outlet />
      </main>
      {/* Aurora/Glow accents */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.18),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.12),transparent)]" />
    </div>
  )
}

export default Layout
