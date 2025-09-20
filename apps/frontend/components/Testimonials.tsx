import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO at TechFlow',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'UpWatch saved us from a potential disaster. The instant alerts helped us catch downtime before our customers even noticed.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'DevOps Engineer',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'The global monitoring network is incredible. We can see exactly how our site performs from different regions.',
      rating: 5
    },
    {
      name: 'Emily Thompson',
      role: 'Product Manager',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'Simple setup, powerful features. The SSL monitoring alone has paid for itself multiple times over.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by thousands of developers
          </h2>
          <p className="text-xl text-gray-400">
            See what our customers have to say about UpWatch
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-emerald-500 mb-2">99.99%</div>
            <div className="text-gray-400">Average uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-500 mb-2">50k+</div>
            <div className="text-gray-400">Websites monitored</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-500 mb-2">24/7</div>
            <div className="text-gray-400">Support available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;