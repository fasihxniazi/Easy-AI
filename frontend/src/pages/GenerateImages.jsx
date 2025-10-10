import { Image, Sparkles } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GenerateImages = () => {
  const imageStyle = [ 'Realistic Style', 'Ghibli Style', 'Anime Style', 'Cartoon Style', 'Fantasy Style', '3D Style', 'Portrait Style' ]
  const [selectedStyle, setSelectedStyle] = useState('Realistic Style')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`
      const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, {
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
            <Sparkles className="w-7 h-7 text-[#00AD25]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 drop-shadow">
              AI Image Generator
            </h1>
          </div>
        </div>
        <p className="text-slate-300 max-w-xl text-base animate-fadeIn delay-200 mb-6">
          Generate stunning images in your favorite style using AI.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column */}
          <div className="w-full md:w-1/2">
            <form onSubmit={onSubmitHandler} className="bg-[rgba(18,24,48,0.92)] border border-white/10 rounded-xl shadow-md px-5 py-4 w-full animate-fadeIn">
              <div className="flex items-center gap-3 mb-2">
                <Image className="w-6 text-[#00AD25]" />
                <h2 className="text-lg font-semibold text-slate-100">Describe your Image</h2>
              </div>
              <textarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                rows={4}
                className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-white/10 bg-white/5 text-slate-100 placeholder-slate-400"
                placeholder="Describe what you want to see in the image.."
                required
              />
              <p className="mt-4 text-sm font-medium text-slate-200">Category</p>
              <div className="mt-3 flex gap-3 flex-wrap">
                {imageStyle.map((item) => (
                  <span
                    onClick={() => setSelectedStyle(item)}
                    className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition
                      ${selectedStyle === item
                        ? 'bg-gradient-to-r from-green-400 to-green-700 text-white border-none shadow'
                        : 'text-slate-300 border-white/10 bg-white/5 hover:bg-green-500/10'
                      }`}
                    key={item}
                  >{item}</span>
                ))}
              </div>
              <div className="my-6 flex items-center gap-2">
                <label className="relative cursor-pointer">
                  <input type="checkbox" onChange={(e) => setPublish(e.target.checked)} checked={publish} className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
                  <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
                </label>
                <p className="text-sm mx-2 text-slate-200">Make this image Public</p>
              </div>
              <button
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04CF41] text-white px-4 py-2 mt-2 text-sm rounded-lg cursor-pointer font-semibold shadow-lg transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-500/20"
              >
                {loading ? (
                  <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                ) : (
                  <Image className="w-5" />
                )}
                Generate Image
              </button>
            </form>
          </div>
          {/* Right column */}
          <div className="w-full md:w-1/2">
            <div className="bg-[rgba(18,24,48,0.92)] border border-white/10 rounded-xl shadow-md px-5 py-4 w-full flex flex-col animate-fadeIn delay-150">
              <div className="flex items-center gap-3 mb-2">
                <Image className="w-5 h-5 text-[#00AD25]" />
                <h2 className="text-lg font-semibold text-slate-100">Generated Image</h2>
              </div>
              {!content ? (
                <div className="flex-1 flex justify-center items-center">
                  <div className="text-sm flex flex-col items-center gap-5 text-slate-400">
                    <Image className="w-9 h-9" />
                    <p>Enter a topic and click "Generate image" to get started</p>
                  </div>
                </div>
              ) : (
                <div className="mt-3 w-full">
                  <img src={content} alt="Generated" className="w-full rounded-xl" />
                </div>
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

export default GenerateImages
