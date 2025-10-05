import Redis from "ioredis";

function connectTpRedis() {
  let connection: Redis;

  return () => {
    if (!connection) {
      connection = new Redis({
        host: "localhost",
        port: 6379,
        maxRetriesPerRequest: null,
      });
    }

    return connection;
  };
}

export const connectionObj = connectTpRedis()();
