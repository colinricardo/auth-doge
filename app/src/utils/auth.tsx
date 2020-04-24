import Router from "next/router";
import userApi from "../api/user";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const handleAuth = async (ctx) => {
  let token = null;

  // Server side.
  if (ctx.req) {
    console.log("We are on the server side.");
    console.log("We are trying to navigate to: ", ctx.req.url);
    // TODO: replace with something more robust to get the token from the header.
    token = ctx.req.headers.cookie
      ? ctx.req.headers.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        )
      : undefined;

    // If we are logged in.
    if (token) {
      // If we're trying to reach index page.
      if (ctx.req.url === "/") {
        // Redirect to the home page.
        // Otherwie just continue as normal.
        ctx.res.writeHead(302, {
          Location: "/home",
        });
        ctx.res.end();
      }
    }
  } else {
    // Client side.
    token = cookies.get("token");
  }

  try {
    // If ping suceeds we just return the token.
    await userApi.ping(token);
    return token;
  } catch (err) {
    // If it fails, we do different things if we're server-side vs. client-side.
    console.log("The ping failed.");

    // Server side.
    if (ctx.res) {
      // If we are checking on the index page, prevent infinite loop.
      if (ctx.req.url === "/") {
      } else {
        ctx.res.writeHead(302, {
          Location: "/",
        });
        ctx.res.end();
      }
    } else {
      // Client side.
      Router.push("/");
    }
  }
};

export default {
  handleAuth,
};
