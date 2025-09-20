import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for personal projects',
      features: [
        '5 monitors',
        '5-minute checks',
        'Email notifications',
        '30-day retention',
        'Basic support'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'border border-slate-700 hover:border-slate-600 text-white'
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Great for growing businesses',
      features: [
        '50 monitors',
        '1-minute checks',
        'SMS & Email alerts',
        '1-year retention',
        'Priority support',
        'Status pages',
        'SSL monitoring'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For mission-critical applications',
      features: [
        'Unlimited monitors',
        '30-second checks',
        'All notification channels',
        'Unlimited retention',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantees',
        'Multi-user teams'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'border border-slate-700 hover:border-slate-600 text-white'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 30-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-800/50 backdrop-blur-sm border rounded-lg p-8 transition-all hover:transform hover:scale-105 ${
                plan.popular 
                  ? 'border-emerald-500 ring-1 ring-emerald-500/20' 
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                </div>
                <p className="text-gray-400 mb-8">{plan.description}</p>
                
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center ${plan.buttonStyle}`}>
                  {plan.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;