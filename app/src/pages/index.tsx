import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { styled } from "baseui";
import { flex } from "../styles/flex";
import { Spacer } from "../styles/responsive";
import { Button } from "baseui/button";
import userApi from "../api/user";
import Router from "next/router";
import { Input } from "baseui/input";
import { PinCode } from "baseui/pin-code";
import authUtils from "../utils/auth";
import { isEmail } from "validator";
import Head from "next/head";

const EMAIL_STEP = 0;
const CODE_STEP = 1;

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
  ...flex.centerColX,
  maxWidth: "320px",
});

const Index = () => {
  const [formStep, setFormStep] = useState(EMAIL_STEP);
  const [email, setEmail] = useState("");
  const [tempLoginCode, setTempLoginCode] = useState(["", "", "", ""]);

  const tryLogin = async (e) => {
    e.preventDefault();

    if (!isEmail(email)) {
      return alert("Please enter a valid email.");
    }

    try {
      const message = await userApi.setTempLoginCode(email);
      alert(message);
      setFormStep(CODE_STEP);
    } catch (err) {
      alert(err.message);
    }
  };

  const tryConfirm = async (e) => {
    e.preventDefault();
    const _tempLoginCode = tempLoginCode.join("");

    if (!_tempLoginCode) {
      return alert("Please enter the code you received.");
    }

    try {
      await userApi.confirmTempLoginCode(email, _tempLoginCode);
      Router.push("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  const renderEmailStep = () => {
    return (
      <form>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            // @ts-ignore
            const { value } = e.target;
            setEmail(value);
          }}
        />
        <Spacer h="c" />
        <Button
          type="submit"
          onClick={tryLogin}
          overrides={{
            BaseButton: {
              style: {
                width: "320px",
              },
            },
          }}
        >
          Get Login Code
        </Button>
      </form>
    );
  };

  const renderCodeStep = () => {
    return (
      <form>
        <PinCode
          values={tempLoginCode}
          onChange={({ values }) => setTempLoginCode(values)}
          overrides={{
            Root: {
              style: {
                justifyContent: "center",
              },
            },
          }}
        />
        <Spacer h="c" />
        <Button
          type="submit"
          onClick={tryConfirm}
          overrides={{
            BaseButton: {
              style: {
                width: "320px",
              },
            },
          }}
        >
          Continue
        </Button>
      </form>
    );
  };

  const renderStep = () => {
    if (formStep === EMAIL_STEP) {
      return renderEmailStep();
    } else if (formStep === CODE_STEP) {
      return renderCodeStep();
    }
  };

  return (
    <>
      <Head>
        <title>AuthDoge</title>
      </Head>
      <Layout>
        <Spacer h="b" />
        <Container>
          <InnerContainer>{renderStep()}</InnerContainer>
        </Container>
      </Layout>
    </>
  );
};

Index.getInitialProps = async (ctx) => {
  await authUtils.handleAuth(ctx);
  return {};
};

export default Index;
