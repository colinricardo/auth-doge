import React from "react";
import Layout from "../components/Layout";
import { styled } from "baseui";
import { flex } from "../styles/flex";
import { Button } from "baseui/button";
import { H1 } from "baseui/typography";
import authUtils from "../utils/auth";
import userApi from "../api/user";
import { Spacer } from "../styles/responsive";

const Container = styled("div", {
  ...flex.flex,
  ...flex.col,
  ...flex.centerXY,
  minHeight: "100vh",
  width: "100%",
});

const InnerContainer = styled("div", {
  ...flex.flex,
  ...flex.col,
  maxWidth: "320px",
});

const Profile = ({ pageProps }) => {
  return (
    <>
      <Layout>
        <Container>
          <H1>{pageProps.user.email}</H1>
          <InnerContainer>
            <Button
              overrides={{
                BaseButton: {
                  style: {
                    width: "320px",
                  },
                },
              }}
              onClick={async () => {
                try {
                  const message = await userApi.ping();
                  alert(message);
                } catch (err) {
                  alert(err.message);
                }
              }}
            >
              Ping
            </Button>
            <Spacer h="b" />
            <Button
              overrides={{
                BaseButton: {
                  style: {
                    width: "320px",
                  },
                },
              }}
              onClick={async () => {
                try {
                  await userApi.logout();
                } catch (err) {
                  alert(err.message);
                }
              }}
            >
              Logout
            </Button>
          </InnerContainer>
        </Container>
      </Layout>
    </>
  );
};

Profile.getInitialProps = async (ctx) => {
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

export default Profile;
