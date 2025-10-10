import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate();

  return (
    <footer className="relative overflow-hidden w-full bg-[radial-gradient(60%_120%_at_50%_-10%,#0e1530_0%,#0b1020_70%)] text-slate-300 pt-20 pb-8">
      {/* Aurora/Glow accents */}
      <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.25),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.18),transparent)] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-white/10 pb-8">
          <div className="md:max-w-96">
            <img className="h-10 mb-6 cursor-pointer" src={assets.EasyAI_logo} alt="Logo" />
            <p className="text-sm w-120 text-slate-400">
              Experience the power of AI with <span className="font-semibold text-white">EasyAI</span>.<br />
              Transform your content creation with our suite of premium AI tools.
            </p>
          </div>
          <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-12">
            <div>
              <h2 className="font-semibold mb-5 text-slate-100 tracking-wide">Company</h2>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-cyan-400 transition">Home</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">About us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Contact us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Privacy policy</a></li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-slate-100 mb-5 tracking-wide">Subscribe to our newsletter</h2>
              <div className="text-sm space-y-2">
                <p className="text-slate-400">The latest news, articles, and resources, sent to your inbox weekly.</p>
                <form className="flex items-center gap-2 pt-4">
                  <input
                    className="border border-white/10 bg-white/5 placeholder-slate-400 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-10 rounded px-3 text-slate-100"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer h-10 px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold shadow transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-8 text-center text-xs md:text-sm text-slate-400">
          Copyright 2025 © <span className="font-semibold text-white">EasyAI</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
