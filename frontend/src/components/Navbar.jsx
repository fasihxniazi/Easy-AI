import { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const features = [
  { name: 'Write Article', path: '/ai/write-article' },
  { name: 'Blog Titles', path: '/ai/blog-titles' },
  { name: 'Generate Images', path: '/ai/generate-image' },
  { name: 'Remove Background', path: '/ai/remove-background' },
  { name: 'Remove Object', path: '/ai/remove-object' },
  { name: 'Review Resume', path: '/ai/review-resume' },
  { name: 'Community', path: '/ai/community' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 z-30 w-full bg-[rgba(14,21,48,0.85)] backdrop-blur-xl border-b border-white/10 shadow-[0_2px_24px_0_rgba(124,58,237,0.08)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-10 xl:px-24">
        {/* Logo far left */}
        <div className="flex-1 flex items-center">
          <img
            src={assets.EasyAI_logo}
            alt="logo"
            className="w-28 sm:w-36 cursor-pointer drop-shadow-[0_2px_8px_rgba(99,102,241,0.12)]"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Features dropdown and Auth/User far right */}
        <div className="flex items-center gap-2 sm:gap-6 ml-auto">
          {/* Features Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 cursor-pointer text-slate-200 font-medium px-3 py-2 rounded-xl hover:bg-white/10 transition"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              Features
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
            </button>
            {menuOpen && (
              <div
                className="absolute right-0 mt-2 min-w-[200px] bg-[#151a2b] border border-white/10 rounded-xl shadow-xl py-2 z-50 animate-fade-in"
                onMouseLeave={() => setMenuOpen(false)}
              >
                {features.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => {
                      setMenuOpen(false)
                      navigate(f.path)
                    }}
                    className="w-full cursor-pointer text-left px-4 py-2 text-slate-200 hover:bg-indigo-500/10 hover:text-cyan-300 transition"
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth/User */}
          <div className="ml-2">
            {user ? (
              <UserButton />
            ) : (
              <button
                onClick={openSignIn}
                className="group flex items-center gap-2 rounded-full text-sm font-semibold cursor-pointer bg-gradient-to-r from-indigo-500 to-cyan-400 text-white px-7 py-2.5 shadow-lg transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Dropdown animation */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(8px);}
            to { opacity: 1; transform: none;}
          }
          .animate-fade-in {
            animation: fade-in 0.25s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </nav>
  )
}

export default Navbar
