import { Eraser, Sparkles } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveBackground = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', input)
      const { data } = await axios.post('/api/ai/remove-image-background', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <section className="relative min-h-[80vh] bg-transparent py-6 px-0 overflow-hidden">
      <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.25),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.18),transparent)] z-0" />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-2">
          <div className="flex items-center gap-3 animate-fadeIn">
            <Sparkles className="w-7 h-7 text-[#FF4938]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 drop-shadow">
              Background Removal
            </h1>
          </div>
        </div>
        <p className="text-slate-300 max-w-xl text-base animate-fadeIn delay-200 mb-6">
          Instantly remove backgrounds from your images with AI.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column */}
          <div className="w-full md:w-1/2">
            <form onSubmit={onSubmitHandler} className="bg-[rgba(18,24,48,0.92)] border border-white/10 rounded-xl shadow-md px-5 py-4 w-full animate-fadeIn">
              <div className="flex items-center gap-3 mb-2">
                <Eraser className="w-6 text-[#FF4938]" />
                <h2 className="text-lg font-semibold text-slate-100">Upload Image</h2>
              </div>
              <input
                onChange={(e) => setInput(e.target.files[0])}
                type="file"
                accept="image/*"
                className="w-full p-2 px-3 mt-4 outline-none text-sm rounded-md border border-white/10 bg-white/5 text-slate-100 placeholder-slate-400"
                required
              />
              <p className="text-xs text-slate-400 font-light mt-1">Supports JPG, PNG, and other image formats</p>
              <button
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-8 text-sm rounded-lg cursor-pointer font-semibold shadow-lg transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-500/20"
              >
                {loading ? (
                  <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                ) : (
                  <Eraser className="w-5" />
                )}
                Remove Background
              </button>
            </form>
          </div>
          {/* Right column */}
          <div className="w-full md:w-1/2">
            <div className="bg-[rgba(18,24,48,0.92)] border border-white/10 rounded-xl shadow-md px-5 py-4 w-full flex flex-col animate-fadeIn delay-150">
              <div className="flex items-center gap-3 mb-2">
                <Eraser className="w-5 h-5 text-[#FF4938]" />
                <h2 className="text-lg font-semibold text-slate-100">Processed Image</h2>
              </div>
              {!content ? (
                <div className="flex-1 flex justify-center items-center">
                  <div className="text-sm flex flex-col items-center gap-5 text-slate-400">
                    <Eraser className="w-9 h-9" />
                    <p>Upload an image and click "Remove Background" to get started</p>
                  </div>
                </div>
              ) : (
                <img src={content} alt="Processed" className="mt-3 w-full rounded-xl" />
              )}
            </div>
          </div>
        </div>
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
          .delay-150 {
            animation-delay: .15s;
          }
        `}
      </style>
    </section>
  )
}

export default RemoveBackground
