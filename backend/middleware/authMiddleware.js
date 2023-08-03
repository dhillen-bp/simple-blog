const { verifyToken } = require("../config/firebaseAdminConfig.js");

const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Must be authenticated!" });
  } else {
    try {
      token = token.replace("Bearer ", "");
      // Verifikasi token dengan menggunakan kode verifikasi yang sesuai, misalnya dengan menggunakan firebaseAdminConfig.js
      const user = await verifyToken(token);
      // console.log("token :", token);
      // console.log("Decoded user:", user);

      // Jika token valid, Anda dapat menyimpan informasi pengguna di req.user atau property lain
      req.user = user;

      next();
    } catch (error) {
      console.log("midleware error: ", error);
      return res.status(401).json({ error: "Authentication failed!" });
    }
  }
};

module.exports = { authMiddleware };
