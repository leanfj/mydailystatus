import React, { useEffect } from "react";
import router from "next/router";
import { db } from "../lib/db";
import auth0 from "../lib/Auth0";
import { haversineDistance } from "../lib/haversineDistance";

const app = (props) => {
  useEffect(() => {
    if (!props.isAuth) {
      router.push("/");
    } else if (props.forceCreate) {
      router.push("/create-status");
    }
  });

  if (!props.isAuth || props.forceCreate) {
    return null;
  }

  return (
    <div>
      <h1>App</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Coordenadas</th>
            <th>Distância</th>
          </tr>
        </thead>
        <tbody>
          {props.checkins.map((checkin) => {
            return (
              <tr key={checkin.id}>
                <td>{checkin.id === props.user.id && "Seu status"}</td>
                <td>{checkin.status}</td>
                <td>{JSON.stringify(checkin.coords)}</td>
                <td>{checkin.distance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default app;

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  if (session) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const currentDate = `${year}-${month}-${day}`;
    const todayChekin = await db
      .collection("markers")
      .doc(currentDate)
      .collection("checks")
      .doc(session.user.sub)
      .get();

    const todaysData = todayChekin.data();
    const myCoordinates = todaysData.coordinates;
    let forceCreate = true;

    if (todaysData) {
      forceCreate = false;

      const checkins = await db
        .collection("markers")
        .doc(currentDate)
        .collection("checks")
        .near({
          center: myCoordinates,
          radius: 1000,
        })
        .get();

      const checkinsList = [];

      checkins.docs.forEach((doc) =>
        checkinsList.push({
          id: doc.id,
          status: doc.data().status,
          coords: {
            lat: doc.data().coordinates.latitude,
            long: doc.data().coordinates.longitude,
          },
          distance: haversineDistance(
            myCoordinates.latitude,
            myCoordinates.longitude,
            doc.data().coordinates.latitude,
            doc.data().coordinates.longitude
          ),
        })
      );
      return {
        props: {
          isAuth: true,
          user: session.user,
          forceCreate: false,
          checkins: checkinsList,
        },
      };
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
