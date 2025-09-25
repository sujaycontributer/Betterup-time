import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: 'up' | 'down' | 'checking';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'up':
        return {
          icon: CheckCircle,
          text: 'Up',
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      case 'down':
        return {
          icon: XCircle,
          text: 'Down',
          className: 'bg-red-100 text-red-800 border-red-200',
        };
      case 'checking':
        return {
          icon: Clock,
          text: 'Checking',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
      default:
        return {
          icon: Clock,
          text: 'Unknown',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }
  };

  const { icon: Icon, text, className } = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {text}
    </span>
  );
};

export default StatusBadge;