import React from "react";
import Layout from "../components/Layout";
import { styled } from "baseui";
import { flex } from "../styles/flex";
import { H1, Paragraph1 } from "baseui/typography";
import authUtils from "../utils/auth";
import Head from "next/head";
import userApi from "../api/user";

const Container = styled("div", {
  ...flex.flex,
  ...flex.col,
  ...flex.centerXY,
  minHeight: "100vh",
  width: "100%",
  textAlign: "center",
});

const Home = ({ pageProps }) => {
  return (
    <>
      <Head>
        <title>Home -- AuthDoge</title>
      </Head>
      <Layout>
        <Container>
          <H1>Home</H1>
          <Paragraph1>
            {pageProps.user.flags.hasLoggedIn
              ? "Welcome back!"
              : "Hello for the first time!"}
          </Paragraph1>
        </Container>
      </Layout>
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  const token = await authUtils.handleAuth(ctx);

  try {
    const { user } = await userApi.getProfile(token);

    return {
      pageProps: {
        user,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      pageProps: {},
    };
  }
};

export default Home;
