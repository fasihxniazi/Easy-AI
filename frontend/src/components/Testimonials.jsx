import React from "react";

const Testimonials = () => {
  const dummyTestimonialData = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: 'Oliver Rodriquez',
      title: 'Marketing Director, TechCorp',
      content: 'EasyAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
      rating: 5,
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: 'Liam Bryon',
      title: 'Content Creator, GreenCorp',
      content: 'EasyAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
      rating: 5,
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      name: 'Emma Johnson',
      title: 'Content Writer, Sybrid',
      content: 'EasyAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
      rating: 5,
    },
  ]

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden min-h-[60vh] bg-[radial-gradient(60%_120%_at_50%_-10%,#0e1530_0%,#0b1020_70%)] py-24"
    >
      {/* Aurora/Glow accents */}
      <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(40%_60%_at_15%_20%,rgba(124,58,237,0.3),transparent),radial-gradient(40%_60%_at_85%_60%,rgba(34,211,238,0.22),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-14">
          <h2 className="text-slate-100 text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 drop-shadow animate-fadeIn">
            Loved By Creators
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-lg animate-fadeIn delay-200">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {dummyTestimonialData.map((testimonial, index) => (
            <div
              key={index}
              className="group p-8 max-w-xs rounded-2xl bg-[rgba(18,24,48,0.92)] border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer backdrop-blur-md animate-fadeIn"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} width="18" height="17" viewBox="0 0 16 15" fill="none">
                    <path d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                      fill="url(#star-gradient)" />
                    <defs>
                      <linearGradient id="star-gradient" x1="0" y1="0" x2="16" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366F1" />
                        <stop offset="1" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-base my-5 italic">"{testimonial.content}"</p>
              <hr className="mb-5 border-slate-700/40" />
              <div className="flex items-center gap-4">
                <img src={testimonial.image} className="w-12 h-12 object-cover rounded-full border-2 border-indigo-400/40 shadow" alt={testimonial.name} />
                <div className="text-sm text-slate-200">
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-xs text-slate-400">{testimonial.title}</p>
                </div>
              </div>
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

export default Testimonials;