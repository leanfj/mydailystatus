import { db } from "../../lib/db";
import firebase from "firebase-admin";
import Auth0 from "../../lib/Auth0";

const saveStatus = async (request, response) => {
  const session = await Auth0.getSession(request);

  if (session) {
    const dados = request.body;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const currentDate = `${year}-${month}-${day}`;
    await db
      .collection("markers")
      .doc(currentDate)
      .collection("checks")
      .doc(session.user.sub)
      .set({
        status: dados.status,
        user: session.user.sub,
        coordinates: new firebase.firestore.GeoPoint(
          dados.coords.lat,
          dados.coords.long
        ),
      });
  }
  response.send({ ok: true });
};

export default saveStatus;
