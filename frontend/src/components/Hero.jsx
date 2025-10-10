import { useNavigate } from 'react-router-dom'
import aiGenImg1 from '../assets/ai_gen.jfif'
import genPic from '../assets/gen_pic.jfif'

const Hero = () => {
  const navigate = useNavigate()

  // Base button style with subtle glass effect
  const btnBase =
    "group w-44 h-12 rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-3 transform transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 backdrop-blur-sm"

  return (
  <section
    aria-label="Hero"
    className="relative overflow-hidden min-h-screen bg-[radial-gradient(60%_120%_at_50%_-10%,#0e1530_0%,#0b1020_70%)] text-slate-100 flex items-center py-20 lg:py-0"
  >
    {/* aurora / glow accents */}
    <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.4),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.35),transparent)]" />

    <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full">
      <div className="grid gap-8 lg:gap-16 lg:grid-cols-2 items-center">
        {/* LEFT - copy + CTAs */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/10 text-sm text-slate-200 tracking-wide backdrop-blur-md shadow-md animate-fadeIn">
             New · AI Suite
          </span>

          <h1 className="mt-6 mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight animate-fadeIn delay-200">
            Create without limits with{' '}
            <span className="bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              AI tools
            </span>
          </h1>

          <p className="mb-8 lg:mb-12 text-base lg:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fadeIn delay-400">
            Bring your ideas to life with tools that let you create, edit, and share — all in one place.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-5 animate-fadeIn delay-600">
            <button
              onClick={() => navigate('/ai')}
              className={`${btnBase} cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white focus:ring-indigo-500/20 group`}
            >
              <span>Start creating</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={() => navigate('/ai/community')}
              className={`${btnBase} border cursor-pointer border-white/20 bg-white/5 text-indigo-100 hover:bg-white/10 group`}
            >
              <span>Community</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT - floating images */}
<div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
  <div className="relative w-[260px] sm:w-[300px] lg:w-[350px] xl:w-[400px] flex flex-col">
    
    {/* Main image */}
    <img
      src={aiGenImg1}
      alt="AI generated artwork preview"
      className="w-full h-[240px] sm:h-[280px] lg:h-[320px] xl:h-[360px] 
                 object-cover rounded-3xl border border-white/10 
                 shadow-[0_30px_100px_rgba(0,0,0,0.6)] rotate-[2deg] 
                 transition-transform duration-700 
                 hover:scale-105 hover:rotate-0 
                 animate-float will-change-transform cursor-pointer"
    />

    {/* Overlapping image */}
    <img
      src={genPic}
      alt="AI generated photo"
      className="absolute -right-10 sm:-right-12 lg:-right-14 -bottom-8 sm:-bottom-10 lg:-bottom-12 
                 w-28 sm:w-36 lg:w-44 xl:w-48 h-[160px] sm:h-[200px] lg:h-[220px] xl:h-[240px] 
                 object-cover rounded-2xl border border-white/10 
                 shadow-[0_12px_48px_rgba(0,0,0,0.6)] -rotate-[8deg] 
                 transition-transform duration-700 
                 hover:scale-105 hover:-rotate-3 
                 animate-float-reverse will-change-transform cursor-pointer"
    />

    {/* Glow accent */}
    <div className="pointer-events-none absolute -z-10 -bottom-12 -left-10 
                    h-36 sm:h-44 lg:h-52 w-36 sm:w-44 lg:w-52 
                    rounded-full bg-gradient-to-tr from-fuchsia-500/30 to-cyan-400/30 
                    blur-3xl animate-pulse" />
    </div>
  </div>

      </div>
    </div>
  </section>
)
}

export default Hero