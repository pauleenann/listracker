var admin = require("firebase-admin");

var serviceAccount = require(import.meta.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin