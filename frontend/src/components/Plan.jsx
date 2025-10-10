import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (
    <section
      id="plans"
      className="relative overflow-hidden min-h-[60vh] bg-[radial-gradient(60%_120%_at_50%_-10%,#0e1530_0%,#0b1020_70%)] py-24"
    >
      {/* Aurora/Glow accents */}
      <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.3),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.22),transparent)]" />

      <div className="mx-auto max-w-3xl px-6 lg:px-10 z-20">
        <div className="text-center mb-14">
          <h2 className="text-slate-100 text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 drop-shadow animate-fadeIn">
            Choose Your Plan
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-lg animate-fadeIn delay-200">
            Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
          </p>
        </div>

        <div className="mt-16 max-sm:mx-4 max-md:mx-8 animate-fadeIn delay-400">
          <PricingTable />
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

export default Plan
