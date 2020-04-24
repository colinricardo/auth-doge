const envType = process.env.node_env || "local";

const staging = {
  CORS_ORIGIN_WHITELIST: ["http://localhost:3000"],
  JWT_SECRET: "secretdoge",
  MONGODB_URI: `mongodb+srv://colinricardo:Mcw0hrWUWZhh23Ky@production-ylj8n.mongodb.net/db`,
  envType,
};

const production = {
  ...staging,
  CORS_ORIGIN_WHITELIST: ["https://auth-doge.appspot.com"],
};

const local = {
  ...staging,
  PORT: 5000,
};

const configs = {
  staging,
  production,
  local,
};

// @ts-ignore
const config = configs[envType];

export default config;
