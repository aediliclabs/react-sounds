export function SocialProof() {
  const testimonials = [
    {
      avatar: "https://i.pravatar.cc/80?img=1",
      name: "Alex Chen",
      role: "Frontend Developer",
      text: "Implemented this in our product - easily added sounds with just 3 lines of code.",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=2",
      name: "Sarah Kim",
      role: "Lead Engineer",
      text: "Love how lightweight it is! No more bloating our bundle with audio files.",
    },
    {
      avatar: "https://i.pravatar.cc/80?img=3",
      name: "Mike Johnson",
      role: "Product Designer",
      text: "The TypeScript support makes adding sounds incredibly intuitive.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl font-bold mb-6 text-slate-900">Trusted by Developers</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Join thousands of developers enhancing their React applications with sound.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
          <div className="bg-white py-3 px-6 rounded-full flex items-center shadow-sm border border-slate-100 hover:shadow-md hover:border-yellow-100 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold text-slate-700">3K+ weekly downloads</span>
          </div>

          <div className="bg-white py-3 px-6 rounded-full flex items-center shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-800 mr-3"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-bold text-slate-700">150+ GitHub stars</span>
          </div>

          <div className="bg-white py-3 px-6 rounded-full flex items-center shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-bold text-slate-700">99.8% Satisfaction</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300"
            >
              <div className="mb-2">
                <svg className="h-6 w-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="flex-grow mb-6">
                <p className="text-slate-700 text-lg leading-relaxed">"{testimonial.text}"</p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-blue-100"
                />
                <div>
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-blue-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
