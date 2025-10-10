import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-image', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { openUserProfile } = useClerk()

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-full w-64 
        bg-[radial-gradient(60%_120%_at_50%_-10%,#0e1530_0%,#0b1020_70%)]
        border-r border-white/10 shadow-xl 
        flex flex-col transition-all duration-300
        ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'}
      `}
    >
      {/* User profile at top */}
      <div className="flex flex-col items-center pt-8 pb-6 border-b border-white/10">
        <img
          src={user.imageUrl}
          alt="user avatar"
          className="w-16 h-16 rounded-full border-2 border-indigo-400/40 shadow-lg mb-2"
        />
        <h1 className="text-lg font-semibold text-white">{user.fullName}</h1>
        <button
          onClick={openUserProfile}
          className="cursor-pointer text-xs text-cyan-300 mt-1 hover:underline transition"
        >
          View Profile
        </button>
        <div className="mt-2 text-xs text-slate-400">
          <Protect plan="premium" fallback="Free">Premium</Protect> Plan
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-3 px-6 py-3  ">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/ai'}
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-200
              ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-lg'
                  : 'text-slate-200 hover:bg-white/10 hover:text-cyan-300'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
