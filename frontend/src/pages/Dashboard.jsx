import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <section className="relative min-h-[80vh] bg-transparent py-6 px-0 overflow-y-hidden overflow-x-hidden">
      {/* Aurora/Glow accents */}
      <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.25),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.18),transparent)] z-0" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-6">
        {/* Header row: Dashboard + stats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 drop-shadow animate-fadeIn">
            Dashboard
          </h1>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {/* Total Creations */}
            <div className="flex items-center gap-12 px-5 py-4 bg-[rgba(18,24,48,0.92)] border border-white/10 rounded-xl shadow-md min-w-[140px] sm:min-w-[160px] md:min-w-[180px] animate-dashboardBox">
              <div>
                <p className="text-xs text-slate-400">Total Creations</p>
                <h2 className="text-lg sm:text-xl font-semibold text-white">{creations.length}</h2>
              </div>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] flex justify-center items-center shadow">
                <Sparkles className="w-5 text-white" />
              </div>
            </div>
            {/* Active Plan */}
            <div className="flex items-center gap-12 px-5 py-4 bg-[rgba(18,24,48,0.92)] border border-white/10 rounded-xl shadow-md min-w-[140px] sm:min-w-[160px] md:min-w-[180px] animate-dashboardBox delay-150">
              <div>
                <p className="text-xs text-slate-400">Active Plan</p>
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  <Protect plan="premium" fallback="Free">
                    Premium
                  </Protect>
                </h2>
              </div>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] flex justify-center items-center shadow">
                <Sparkles className="w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
        {/* Subtext */}
        <p className="text-slate-300 max-w-xl text-base animate-fadeIn delay-200 mb-12">
          Your latest creations and activity at a glance.
        </p>

        {/* Recent Creations */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-11 w-11 border-4 border-purple-500 border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="my-4 text-slate-200 font-semibold text-base sm:text-lg">Recent Creations</p>
            {creations.length === 0 ? (
              <div className="text-slate-400 text-center py-12 bg-white/0 rounded-xl border-0">
                No creations yet. Start using EasyAI to generate content!
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {creations.map((item) => <CreationItem key={item.id} item={item} />)}
              </div>
            )}
          </div>
        )}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: none;}
          }
          .animate-fadeIn {
            animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes dashboardBox {
            from { opacity: 0; transform: scale(0.96) translateY(20px);}
            to { opacity: 1; transform: none;}
          }
          .animate-dashboardBox {
            animation: dashboardBox 0.7s cubic-bezier(.4,0,.2,1) both;
          }
          .delay-150 {
            animation-delay: .15s;
          }
        `}
      </style>
    </section>
  )
}

export default Dashboard