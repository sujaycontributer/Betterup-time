export interface Website {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down' | 'checking';
  responseTime: number;
  lastChecked: Date;
  uptime: number;
}