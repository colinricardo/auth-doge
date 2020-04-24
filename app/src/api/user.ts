import axios from "axios";
import { Cookies } from "react-cookie";
import getConfig from "next/config";
const { publicRuntimeConfig = {} } = getConfig() || {};
const cookies = new Cookies();

const API = `${publicRuntimeConfig.API}/user`;

const setTempLoginCode = async (email: string) => {
  const d = { email };

  try {
    const { data } = await axios.post(`${API}/setTempLoginCode`, d);
    const { message } = data;
    return message;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};

const confirmTempLoginCode = async (email: string, tempLoginCode: string) => {
  const d = {
    email,
    tempLoginCode,
  };

  try {
    const { data } = await axios.post(`${API}/confirmTempLoginCode`, d);
    const { token, message } = data;
    cookies.set("token", token);
    alert(`Token was just set to: ${token}`);
    return message;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};

const ping = async (token?: string) => {
  const clientToken = cookies.get("token") || undefined;

  try {
    const { data } = await axios.get(`${API}/ping`, {
      headers: { Authorization: token || clientToken },
    });
    const { message } = data;
    return message;
  } catch (err) {
    throw err;
  }
};

const getProfile = async (token?: string) => {
  const clientToken = cookies.get("token") || undefined;

  try {
    const { data } = await axios.get(`${API}/profile`, {
      headers: { Authorization: token || clientToken },
    });
    const { user } = data;
    return { user };
  } catch (err) {
    throw Error(err.response.data.message);
  }
};

const logout = async (token?: string) => {
  const clientToken = cookies.get("token") || undefined;

  try {
    await axios.get(`${API}/logout`, {
      headers: { Authorization: token || clientToken },
    });

    // Remove the cookie.
    cookies.remove("token");

    // Reload the page.
    window.location.reload();
    return true;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};

export default {
  setTempLoginCode,
  confirmTempLoginCode,
  ping,
  getProfile,
  logout,
};
