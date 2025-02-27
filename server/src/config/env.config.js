import "dotenv/config";

const _config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SEC: process.env.JWT_SEC,
};

const config = Object.freeze(_config);

export default config;
