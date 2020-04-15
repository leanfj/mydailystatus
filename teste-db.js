const firebase = require("firebase-admin");
const secret = require("./firebase-secret.json");

const { GeoFirestore } = require("geofirestore");

firebase.initializeApp({
  credential: firebase.credential.cert(secret),
});

const db = firebase.firestore();
const dbGeo = new GeoFirestore(db);

dbGeo
  .collection("teste")
  .add({
    teste: 1,
    coordinates: new firebase.firestore.GeoPoint(-22.972048, -43.410636),
  })
  .then(() => console.log("ok"));
