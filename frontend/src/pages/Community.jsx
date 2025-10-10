import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react'
import { Heart, Users, Sparkles } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const {user} = useUser();
  const [loading, setLoading] = useState(true);
  const {getToken} = useAuth();

  const fetchCreations = async () => {
    try {
      const {data} = await axios.get('/api/user/get-published-creations', {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })
      console.log("API response:", data);
      if(data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(user) {
      fetchCreations();
    }
  }, [user])

  const imageLikeToggle = async (id) => {
    try {
      const {data} = await axios.post('/api/user/toggle-like-creation', {id}, {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })
      if(data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return !loading ? (
    <section className="relative min-h-[80vh] bg-transparent py-6 px-0 overflow-hidden">
      {/* Aurora/Glow accents */}
      <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.25),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.18),transparent)] z-0" />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-2">
          <div className="flex items-center gap-3 animate-fadeIn">
            <Sparkles className="w-7 h-7 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 drop-shadow">
              Community Creations
            </h1>
          </div>
        </div>
        
        {/* Subtext */}
        <p className="text-slate-300 max-w-xl text-base animate-fadeIn delay-200 mb-6">
          Discover and interact with amazing AI-generated images from our community.
        </p>

        {/* Main content */}
        <div className="bg-[rgba(18,24,48,0.92)] border border-white/10 rounded-xl shadow-md px-5 py-4 w-full animate-fadeIn delay-150">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-purple-400" />
            <h2 className="text-lg font-semibold text-slate-100">Community Gallery</h2>
          </div>
          
          {creations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creations.map((creation, index) => (
                <div key={index} className="relative group bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-purple-400/30 transition-all duration-300">
                  <img 
                    src={creation.content} 
                    alt="community creation" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs text-slate-200 mb-2 line-clamp-2">{creation.prompt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart 
                          onClick={() => imageLikeToggle(creation.id)} 
                          className={`w-5 h-5 hover:scale-110 cursor-pointer transition-transform ${
                            creation.likes.includes(user.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-white hover:text-red-400'
                          }`}
                        />
                        <span className="text-sm text-slate-300">{creation.likes.length}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Always visible like counter */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Heart className={`w-4 h-4 ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    <span className="text-xs text-white">{creation.likes.length}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex justify-center items-center py-12">
              <div className="text-sm flex flex-col items-center gap-5 text-slate-400">
                <Users className="w-9 h-9" />
                <p>No community creations available yet</p>
              </div>
            </div>
          )}
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
          .delay-200 {
            animation-delay: .2s;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </section>
  ) : (
    <section className="relative min-h-[80vh] bg-transparent py-6 px-0 overflow-hidden">
      <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.25),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.18),transparent)] z-0" />
      
      <div className="relative z-10 flex justify-center items-center h-full">
        <span className="w-10 h-10 my-1 rounded-full border-3 border-purple-400 border-t-transparent animate-spin"></span>
      </div>
    </section>
  )
}

export default Community;