import React, { useEffect } from "react";
import auth0 from "../lib/auth0";
import router from "next/router";
import { db } from "../lib/db";

const app = (props) => {
  useEffect(() => {
    if (!props.isAuth) {
      router.push("/");
    }
  });

  if (!props.isAuth) {
    return null;
  }

  return (
    <div>
      <h1>App</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default app;

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);

  if (session) {
    const todayChekin = await db
      .collection("markers")
      .doc("2020-04-15")
      .collection("checks")
      .doc(session.user.sub)
      .get();

    const todaysData = todayChekin.data();
    let forceCreate = true;

    if (todaysData) {
      forceCreate = false;
    }

    return {
      props: {
        isAuth: true,
        user: session.user,
        forceCreate,
      },
    };
  }
  return {
    props: {
      isAuth: false,
      user: {},
    },
  };
}
