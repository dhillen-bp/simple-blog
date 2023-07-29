const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} = require("firebase/auth");
const { db, auth } = require("../../config/firebaseConfig");

exports.register = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  // const password = req.body.password;

  const result = {
    message: "Register Success",
    data: {
      uid: 1,
      name: name,
      email: email,
    },
  };
  res.status(201).json(result);
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    if (!user.emailVerified) {
      return res.status(403).json({
        error:
          "Email has not been verified. Please check your inbox and verify your email address.",
      });
    }

    const token = await user.getIdToken(/* forceRefresh */ true);

    res.status(200).json({
      msg: "User Logged In Successfully",
      data: {
        uid: user.uid,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to login user" });
  }
};
