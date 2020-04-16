import { db } from "../../lib/db";
import firebase from "firebase-admin";

const saveStatus = async (request, response) => {
  const dados = request.body;

  await db.collection("teste").add({
    status: dados.status,
    coordinates: new firebase.firestore.GeoPoint(-22.972048, -43.410636),
  });

  response.send({ ok: true });
};

export default saveStatus;
