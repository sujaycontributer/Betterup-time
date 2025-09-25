"use client"

import React, { useState, useEffect } from 'react';
import { RefreshCw, Activity } from 'lucide-react';
import { Website } from '../lib/types';
import DashboardStats from './DashboardStats';
import WebsiteTable from './WebsiteTable';
import { fetchWebsites } from '@/app/services/websiteService';

const Dashboard: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadWebsites = async () => {
    setLoading(true);
    try {
      const data = await fetchWebsites();
      setWebsites(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch websites:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWebsites();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(loadWebsites, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    loadWebsites();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Website Monitor</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Real-time monitoring dashboard
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <span className="text-sm text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardStats websites={websites} />
        <WebsiteTable websites={websites} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;