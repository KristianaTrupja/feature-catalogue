// src/pages/api/restrict.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const allowedIps = ['178.208.114.162']; // replace with real IPs

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const visitorIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!visitorIp) {
    return res.status(400).json({ message: 'Could not determine IP' });
  }

  // visitorIp could be a comma-separated list, take the first one
  const ip = Array.isArray(visitorIp)
    ? visitorIp[0]
    : typeof visitorIp === 'string'
    ? visitorIp.split(',')[0].trim()
    : '';

  if (!allowedIps.includes(ip)) {
    return res.status(403).json({ message: 'Access Denied' });
  }

  res.status(200).json({ message: 'Access Granted' });
}
