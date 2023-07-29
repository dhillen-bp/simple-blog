const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./ideation-392108-firebase-adminsdk-olwsj-0998a04590.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const verifyToken = async (idToken) => {
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    // const uid = decodedToken.uid;
    return decodedToken;
  } catch (error) {
    console.log("Error in: " + error);
  }
};

module.exports = { verifyToken };
