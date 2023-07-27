const { verifyToken } = require("../config/firebaseAdminConfig.js");
const { auth } = require("../config/firebaseConfig.js");

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Must be authenticated!" });
  } else {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.substring(7);
      //   const idToken = req.headers.authorization.replace("Bearer ", token);
      //   console.log(auth.currentUser);
      const idToken = await auth.currentUser.getIdToken();
      //   console.log(idToken);
      if (token !== idToken) {
        return res.status(401).json({ error: "Token invalid!" });
      }

      const user = await verifyToken(idToken); // Menunggu verifikasi token
      req.user = user; // Menyimpan informasi user dalam request jika diperlukan di middleware berikutnya
      next();
    } catch (error) {
      return res.status(401).json({ error: "Authentication failed!" });
    }
  }
};

module.exports = { authMiddleware };
