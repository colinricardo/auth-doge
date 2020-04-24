const { CORS_ORIGIN_WHITELIST, JWT_SECRET, MONGODB_URI, PORT } = process.env;

const config = {
  CORS_ORIGIN_WHITELIST,
  JWT_SECRET,
  MONGODB_URI,
  PORT,
};

export default config;
