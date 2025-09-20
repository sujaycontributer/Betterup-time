import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-900 to-slate-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-emerald-400 text-sm font-medium mb-8">
            <CheckCircle className="h-4 w-4 mr-2" />
            99.99% uptime guaranteed
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Monitor your website
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent block">
              like a pro
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get instant alerts when your website goes down. Monitor uptime, performance, and SSL certificates 
            from 15+ locations worldwide. Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center transition-all transform hover:scale-105">
              Start 30-day free trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-slate-700 hover:border-slate-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              View live demo
            </button>
          </div>
          
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
              30-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;