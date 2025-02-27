import Redis from "ioredis";

const redisClient = new Redis({
  port: 6379,
  host: "127.0.0.1",
  password: "",
  retryStrategy: (times) => Math.min(times * 50, 2000), // Retry with max 2s delay
});

redisClient.on("connect", () => console.log(" Redis connected"));
redisClient.on("error", (err) => console.error(" Redis error:", err));
redisClient.on("end", () => console.warn("Redis disconnected"));

process.on("SIGINT", async () => {
  await redisClient.quit();
  console.log("Redis connection closed");
  process.exit(0);
});

export default redisClient;
