import { Edit, Sparkles } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} with a length of ${selectedLength.text}`
      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )
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
      {/* Aurora/Glow accents */}
      <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.25),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.18),transparent)] z-0" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-2">
          <div className="flex items-center gap-3 animate-fadeIn">
            <Sparkles className="w-7 h-7 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 drop-shadow">
              Write Article
            </h1>
          </div>
        </div>
        {/* Subtext */}
        <p className="text-slate-300 max-w-xl text-base animate-fadeIn delay-200 mb-6">
          Generate a high-quality article on any topic, in your preferred length.
        </p>
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* left column */}
          <div className="w-full md:w-1/2">
            <form
              onSubmit={onSubmitHandler}
              className="bg-[rgba(18,24,48,0.92)] border border-white/10 rounded-xl shadow-md px-5 py-4 w-full animate-fadeIn"
            >
              <div className="flex items-center gap-3 mb-2">
                <Edit className="w-6 text-indigo-400" />
                <h2 className="text-lg font-semibold text-slate-100">Article Configuration</h2>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-200">Article Topic</p>
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-white/10 bg-white/5 text-slate-100 placeholder-slate-400 focus:ring-2 ring-indigo-600"
                placeholder="The future of artificial intelligence is..."
                required
              />

              <p className="mt-4 text-sm font-medium text-slate-200">Article Length</p>
              <div className="mt-3 flex gap-3 flex-wrap">
                {articleLength.map((item, index) => (
                  <span
                    onClick={() => setSelectedLength(item)}
                    className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition
                      ${
                        selectedLength.text === item.text
                          ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white border-none shadow'
                          : 'text-slate-300 border-white/10 bg-white/5 hover:bg-indigo-500/10'
                      }`}
                    key={index}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
              <button
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white px-4 py-2 mt-8 text-sm rounded-lg cursor-pointer font-semibold shadow-lg transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
              >
                {loading ? (
                  <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                ) : (
                  <Edit className="w-5" />
                )}
                Generate Article
              </button>
            </form>
          </div>
          {/* right column */}
          <div className="w-full md:w-1/2">
            <div className="bg-[rgba(18,24,48,0.92)] border border-white/10 rounded-xl shadow-md px-5 py-4 w-full flex flex-col animate-fadeIn delay-150">
              <div className="flex items-center gap-3 mb-2">
                <Edit className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-slate-100">Generated Article</h2>
              </div>
              {!content ? (
                <div className="flex-1 flex justify-center items-center">
                  <div className="text-sm flex flex-col items-center gap-5 text-slate-400">
                    <Edit className="w-9 h-9" />
                    <p>Enter a topic and click "Generate article" to get started</p>
                  </div>
                </div>
              ) : (
                <div className="mt-3 text-sm text-slate-200 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="reset-tw">
                    <Markdown>{content}</Markdown>
                  </div>
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

export default WriteArticle
