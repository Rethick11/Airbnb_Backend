import Client from 'ioredis'
import Redlock from 'redlock'

const redisA = new Client({ host: "127.0.0.1", port: 6379 });


export const redlock = new Redlock(
  
  [redisA],
  {
    driftFactor: 0.01, 
    retryCount: 10,
    retryDelay: 200, 
    retryJitter: 200, 
    automaticExtensionThreshold: 500, 
  }
);