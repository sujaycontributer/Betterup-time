import { Website } from "@/lib/types";
// Mock data for demonstration
const mockWebsites: Website[] = [
  {
    id: '1',
    name: 'Google',
    url: 'https://google.com',
    status: 'up',
    responseTime: 145,
    lastChecked: new Date(Date.now() - 2 * 60 * 1000),
    uptime: 99.9,
  },
  {
    id: '2',
    name: 'GitHub',
    url: 'https://github.com',
    status: 'up',
    responseTime: 267,
    lastChecked: new Date(Date.now() - 1 * 60 * 1000),
    uptime: 99.8,
  },
  {
    id: '3',
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    status: 'down',
    responseTime: 0,
    lastChecked: new Date(Date.now() - 5 * 60 * 1000),
    uptime: 97.2,
  },
  {
    id: '4',
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    status: 'up',
    responseTime: 334,
    lastChecked: new Date(Date.now() - 3 * 60 * 1000),
    uptime: 99.5,
  },
  {
    id: '5',
    name: 'npm',
    url: 'https://npmjs.com',
    status: 'checking',
    responseTime: 0,
    lastChecked: new Date(Date.now() - 30 * 1000),
    uptime: 98.7,
  },
  {
    id: '6',
    name: 'React',
    url: 'https://react.dev',
    status: 'up',
    responseTime: 198,
    lastChecked: new Date(Date.now() - 4 * 60 * 1000),
    uptime: 99.6,
  },
];

export const fetchWebsites = async (): Promise<Website[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWebsites);
    }, 1500);
  });
};

export const checkWebsiteStatus = async (url: string): Promise<{ status: 'up' | 'down'; responseTime: number }> => {
  // In a real application, this would make an actual HTTP request
  // For demo purposes, we'll simulate random results
  return new Promise((resolve) => {
    setTimeout(() => {
      const isUp = Math.random() > 0.2; // 80% chance of being up
      resolve({
        status: isUp ? 'up' : 'down',
        responseTime: isUp ? Math.floor(Math.random() * 500) + 100 : 0,
      });
    }, Math.random() * 2000 + 500);
  });
};