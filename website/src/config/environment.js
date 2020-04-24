// @ts-ignore
const envType = process.env.node_env || `local`;

const staging = {
  API: "",
  envType,
};

const production = {
  ...staging,
  API: "https://auth-doge-api.appspot.com/api/v1",
};

const local = {
  ...staging,
  API: "http://localhost:5000/api/v1",
};

const configs = {
  staging,
  production,
  local,
};

const config = configs[envType];

module.exports = { ...config };
