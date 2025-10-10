import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, ChevronUp, Image as ImageIcon, FileText } from 'lucide-react'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`transition-all duration-300 cursor-pointer bg-[rgba(18,24,48,0.92)] border border-white/8 rounded-xl shadow-md hover:shadow-xl hover:border-cyan-400/30 hover:bg-white/5 backdrop-blur-md animate-fadeIn px-4 py-3 group w-full`}
      style={{
        minHeight: 64,
        boxShadow: expanded
          ? '0 6px 24px 0 rgba(99,102,241,0.13)'
          : '0 1.5px 8px 0 rgba(99,102,241,0.08)'
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="rounded-lg bg-gradient-to-br from-indigo-500/70 to-cyan-400/70 p-1.5">
            {item.type === 'image' ? (
              <ImageIcon className="w-4 h-4 text-white" />
            ) : (
              <FileText className="w-4 h-4 text-white" />
            )}
          </span>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-slate-100 truncate max-w-[220px] sm:max-w-xs">{item.prompt}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} &middot; {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full font-medium text-xs transition
              ${item.type === 'image'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white'
                : 'bg-white/10 border border-white/10 text-cyan-200'}
            `}
          >
            {item.type}
          </span>
          <span className="ml-2">
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-cyan-300 transition" />
            )}
          </span>
        </div>
      </div>
      <div
        className={`transition-all duration-300 overflow-hidden ${expanded ? 'max-h-[600px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {item.type === 'image' ? (
          <div className="flex justify-center">
            <img
              src={item.content}
              alt="creation"
              className="mt-2 w-full max-w-md rounded-lg border border-white/10 shadow"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/placeholder.png"; // some local fallback image
              }}
            />
          </div>
        ) : (
          <div className="mt-2 text-base text-slate-200 bg-white/5 rounded-lg p-4 border border-white/10">
            <Markdown>{item.content}</Markdown>
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
        `}
      </style>
    </div>
  )
}

export default CreationItem
