const firebase = require("firebase-admin");
const secret = require("../firebase-secret.json");

const { GeoFirestore } = require("geofirestore");

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(secret),
  });
}

const dbFirestore = firebase.firestore();
const db = new GeoFirestore(dbFirestore);

module.exports = {
  db,
};
