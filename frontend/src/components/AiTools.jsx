import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <section
      id="features"
      className="relative overflow-hidden min-h-[80vh] bg-[radial-gradient(60%_120%_at_50%_-10%,#0e1530_0%,#0b1020_70%)] py-24"
    >
      {/* Aurora/Glow accents */}
      <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.3),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.22),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-14">
          <h2 className="text-slate-100 text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 drop-shadow animate-fadeIn">
            Powerful AI Tools
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-lg animate-fadeIn delay-200">
            Everything you need to create, enhance, and optimize your content with cutting-edge AI technology—designed for creators and teams.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {AiToolsData.map((tool, index) => (
            <div
              key={index}
              className="group p-8 max-w-xs rounded-2xl bg-[rgba(18,24,48,0.92)] border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer backdrop-blur-md animate-fadeIn"
              onClick={() => user && navigate(tool.path)}
            >
              <tool.Icon
                className="w-14 h-14 p-3 text-white rounded-xl mb-4 shadow-lg"
                style={{
                  background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
                  boxShadow: '0 4px 24px 0 rgba(99,102,241,0.10)'
                }}
              />
              <h3 className="mt-2 mb-2 text-lg font-semibold text-slate-100">{tool.title}</h3>
              <p className="text-slate-400 text-sm">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: none;}
          }
          .animate-fadeIn {
            animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </section>
  )
}

export default AiTools
