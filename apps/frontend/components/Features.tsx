import React from 'react';
import { Globe, Shield, Zap, Bell, BarChart3, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Globe,
      title: 'Global Monitoring',
      description: 'Monitor from 15+ locations worldwide to ensure your site is accessible from everywhere.'
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Get notified via email, SMS, Slack, or webhook the moment your site goes down.'
    },
    {
      icon: Shield,
      title: 'SSL Monitoring',
      description: 'Never let your SSL certificate expire unexpectedly. Get alerts before expiration.'
    },
    {
      icon: BarChart3,
      title: 'Performance Metrics',
      description: 'Track response times, uptime percentage, and detailed performance analytics.'
    },
    {
      icon: Zap,
      title: 'Fast Checks',
      description: 'Check your websites every 30 seconds from multiple global locations.'
    },
    {
      icon: Clock,
      title: '24/7 Monitoring',
      description: 'Continuous monitoring that never sleeps, keeping watch over your digital assets.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need to monitor your website
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive monitoring tools designed to keep your website running smoothly and your users happy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all hover:transform hover:scale-105"
            >
              <div className="bg-emerald-600/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;