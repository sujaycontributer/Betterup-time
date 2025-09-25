import React from 'react';
import { Globe, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Website } from '../lib/types';

interface DashboardStatsProps {
  websites: Website[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ websites }) => {
  const totalWebsites = websites.length;
  const upWebsites = websites.filter(w => w.status === 'up').length;
  const downWebsites = websites.filter(w => w.status === 'down').length;
  const checkingWebsites = websites.filter(w => w.status === 'checking').length;

  const stats = [
    {
      name: 'Total Websites',
      value: totalWebsites,
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Online',
      value: upWebsites,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Offline',
      value: downWebsites,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      name: 'Checking',
      value: checkingWebsites,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.name} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;